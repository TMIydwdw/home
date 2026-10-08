import express, { Application, NextFunction, Request, Response } from 'express'
import compression from 'compression'
import { ValidationError } from 'joi'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import path from 'path'
import fs from 'fs'
import { referralSettingsService, transferSettingsService } from './setup'
import mongoose, { Error } from 'mongoose'
import { IController } from '@/core/utils'
import {
  ApiError,
  InternalError,
  MongooseCastError,
  NotFoundError,
  SchemaValidationError,
} from '@/core/apiError'

class App {
  public express: Application

  constructor(
    public controllers: IController[],
    public port: number,
    private isTest: boolean,
    private database?: {
      mogodbUri: string
    }
  ) {
    this.express = express()

    this.beforeStart().then(() => {
      this.initialiseMiddleware()
      this.initialiseControllers(controllers)
      this.initialiseStatic()
      this.initialiseErrorHandling()
    })
  }

  private initialiseMiddleware(): void {
    this.express.use(
      helmet({
        crossOriginResourcePolicy: { policy: 'cross-origin' },
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", '*'],
            imgSrc: ["'self'", 'blob:', '*'],
            connectSrc: ["'self'", '*'],
            frameSrc: ["'self'", '*'],
          },
        },
      })
    )

    this.express.use((req, res, next) => {
      res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none')
      next()
    })

    this.express.use(
      cors({
        origin: [
          'http://localhost:5173',
          'http://localhost:5174',
          'http://localhost:5175',
        ],
      })
    )
    this.express.use(morgan('dev'))
    this.express.use(express.json())
    this.express.use(express.urlencoded({ extended: false }))
    this.express.use(compression())
  }

  private initialiseControllers(controllers: IController[]): void {
    controllers.forEach((controller: IController) => {
      this.express.use('/api', controller.router)
    })
  }

  private initialiseStatic(): void {
    // Uploaded content (referenced from DB via /images/...)
    this.express.use('/images', express.static(path.join(__dirname, 'images')))

    const homeDir = path.join(__dirname, 'frontend', 'home')
    const userDir = path.join(__dirname, 'frontend', 'user')
    const adminDir = path.join(__dirname, 'frontend', 'admin')

    // Startup diagnostics: the built SPAs must exist where the backend
    // serves them from (`dist/frontend/*` in prod, `src/frontend/*` under
    // ts-node). A missing bundle here means the frontend was not built
    // (or `npm run copy-files` did not copy it) and the app would render
    // blank. Fail loud in the logs instead of serving a broken page.
    for (const [name, dir] of [
      ['home', homeDir],
      ['user', userDir],
      ['admin', adminDir],
    ] as Array<[string, string]>) {
      try {
        const files = fs.readdirSync(dir)
        console.log(
          `Serving ${name} SPA from ${dir} (${files.length} top-level entries)`
        )
        if (!files.includes('index.html')) {
          console.error(`Missing index.html for ${name} SPA in ${dir}!`)
        }
      } catch (error) {
        console.error(`Cannot serve ${name} SPA: directory missing: ${dir}`)
      }
    }

    // Path-based SPA serving (no cookies, backend owns the session via JWT):
    //   /       -> home
    //   /user   -> user dashboard
    //   /admin  -> admin dashboard
    // Each frontend is built with its own Vite `base` (/user/, /admin/),
    // so its assets resolve under its own path prefix.
    // Exact base paths are registered before the static mounts so they
    // serve index.html directly (otherwise express.static 301-redirects
    // `/user` -> `/user/` because it maps to a directory).
    this.express.get('/user', (req, res) => {
      res.sendFile(path.join(userDir, 'index.html'))
    })

    this.express.get('/admin', (req, res) => {
      res.sendFile(path.join(adminDir, 'index.html'))
    })

    this.express.use('/user', express.static(userDir))
    this.express.use('/admin', express.static(adminDir))
    this.express.use('/', express.static(homeDir))

    // Only page navigations get the SPA shell. Missing static assets must
    // 404 loudly instead of returning index.html with 200 (browsers reject
    // HTML served as CSS/JS and the app renders as a blank page).
    // NOTE: `req.accepts('html')` alone is not enough - browsers request
    // `<script>` tags with `Accept: */*`, which matches anything. So known
    // asset extensions always fall through to the 404 handler. This is safe:
    // no SPA route in these apps ends with one of these extensions (route
    // tokens are hex, never dotted).
    const isMissingAsset = (req: Request): boolean =>
      /\.(css|js|mjs|map|png|jpe?g|gif|svg|ico|webp|avif|woff2?|ttf|eot|otf|mp4|webm|json|txt|xml)$/i.test(
        req.path
      )

    this.express.get('/user/*', (req, res, next) => {
      if (isMissingAsset(req) || !req.accepts('html')) return next()
      res.sendFile(path.join(userDir, 'index.html'))
    })

    this.express.get('/admin/*', (req, res, next) => {
      if (isMissingAsset(req) || !req.accepts('html')) return next()
      res.sendFile(path.join(adminDir, 'index.html'))
    })

    this.express.get('*', (req, res, next) => {
      if (req.path.startsWith('/api')) return next()
      if (isMissingAsset(req) || !req.accepts('html')) return next()
      res.sendFile(path.join(homeDir, 'index.html'))
    })
  }

  private initialiseErrorHandling(): void {
    // 404 Error
    this.express.use((req, res, next) =>
      next(
        new NotFoundError(
          'Sorry, the resourse you requested could not be found.'
        )
      )
    )

    // Catch thrown Errors
    this.express.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof ApiError) {
          ApiError.handle(err, res)
        } else if (err instanceof ValidationError) {
          ApiError.handle(new SchemaValidationError(err), res)
        } else if (err instanceof Error.CastError) {
          ApiError.handle(new MongooseCastError(), res)
        } else {
          ApiError.notifyDeveloper(err)
          ApiError.handle(new InternalError(), res)
        }
      }
    )
  }

  private async initialiseDatabaseConnection(): Promise<void> {
    if (!this.database) return
    try {
      if (this.database.mogodbUri)
        await mongoose.connect(`${this.database.mogodbUri}`)
      console.log('DB CONNECTED')
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  private async beforeStart(): Promise<void> {
    await this.initialiseDatabaseConnection()

    if (!this.isTest) {
      transferSettingsService.fetch({}).catch(async (err: any) => {
        if (err.error instanceof NotFoundError)
          await transferSettingsService.create(false, 0)
        else throw err
      })

      referralSettingsService.fetch({}).catch(async (err: any) => {
        if (err.error instanceof NotFoundError)
          await referralSettingsService.create(10, 5, 15, 10, 10)
        else throw err
      })
    }
  }

  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`App listenig on port ${this.port}`)
    })
  }
}

export default App
