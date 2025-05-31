import express, { Application, NextFunction, Request, Response } from 'express'
import compression from 'compression'
import { ValidationError } from 'joi'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import path from 'path'
import cookieParser from 'cookie-parser'
import { referralSettingsService, transferSettingsService } from './setup'
import mongoose, { Error } from 'mongoose'
import { IController } from '@/core/utils'
import { doubleCsrfProtection, invalidCsrfTokenError } from '@/helpers/csrf'
import {
  ApiError,
  InternalError,
  InvalidCsrfTokenError,
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
        credentials: true,
      })
    )
    this.express.use(morgan('dev'))
    this.express.use(express.json())
    this.express.use(express.urlencoded({ extended: false }))
    this.express.use(compression())
    this.express.use(cookieParser())
    // if (!this.isTest) this.express.use(doubleCsrfProtection)
    this.express.get('/api/token', (req, res, next) => {
      res.json({ token: req.csrfToken && req.csrfToken() })
    })
  }

  private initialiseControllers(controllers: IController[]): void {
    controllers.forEach((controller: IController) => {
      this.express.use('/api', controller.router)
    })
  }

  private initialiseStatic(): void {
    this.express.use('/images', express.static(path.join(__dirname, 'images')))

    this.express.use('/css', (req, res, next) => {
      if (req.cookies.request_code == '200') {
        express.static(
          path.join(__dirname, '..', 'src', 'frontend', 'admin', 'css')
        )(req, res, next)
      } else if (req.cookies.request_code == '100') {
        express.static(
          path.join(__dirname, '..', 'src', 'frontend', 'user', 'css')
        )(req, res, next)
      } else {
        express.static(
          path.join(__dirname, '..', 'src', 'frontend', 'home', 'css')
        )(req, res, next)
      }
    })

    this.express.use('/assets', (req, res, next) => {
      if (req.cookies.request_code == '200') {
        express.static(
          path.join(__dirname, '..', 'src', 'frontend', 'admin', 'assets')
        )(req, res, next)
      } else if (req.cookies.request_code == '100') {
        express.static(
          path.join(__dirname, '..', 'src', 'frontend', 'user', 'assets')
        )(req, res, next)
      } else {
        express.static(
          path.join(__dirname, '..', 'src', 'frontend', 'home', 'assets')
        )(req, res, next)
      }
    })

    this.express.use('/Edge', (req, res, next) => {
      if (req.cookies.request_code == '200') {
        express.static(
          path.join(__dirname, '..', 'src', 'frontend', 'admin', 'Edge')
        )(req, res, next)
      } else if (req.cookies.request_code == '100') {
        express.static(
          path.join(__dirname, '..', 'src', 'frontend', 'user', 'Edge')
        )(req, res, next)
      } else {
        express.static(
          path.join(__dirname, '..', 'src', 'frontend', 'home', 'Edge')
        )(req, res, next)
      }
    })

    this.express.use('/img', (req, res, next) => {
      if (req.cookies.request_code == '200') {
        express.static(
          path.join(__dirname, '..', 'src', 'frontend', 'admin', 'img')
        )(req, res, next)
      } else if (req.cookies.request_code == '100') {
        express.static(
          path.join(__dirname, '..', 'src', 'frontend', 'user', 'img')
        )(req, res, next)
      } else {
        express.static(
          path.join(__dirname, '..', 'src', 'frontend', 'home', 'img')
        )(req, res, next)
      }
    })

    this.express.use('/images', (req, res, next) => {
      if (req.cookies.request_code == '200') {
        express.static(
          path.join(__dirname, '..', 'src', 'frontend', 'admin', 'images')
        )(req, res, next)
      } else if (req.cookies.request_code == '100') {
        express.static(
          path.join(__dirname, '..', 'src', 'frontend', 'user', 'images')
        )(req, res, next)
      } else {
        express.static(
          path.join(__dirname, '..', 'src', 'frontend', 'home', 'images')
        )(req, res, next)
      }
    })

    this.express.use('/icon', (req, res, next) => {
      if (req.cookies.request_code == '200') {
        express.static(
          path.join(__dirname, '..', 'src', 'frontend', 'admin', 'icon')
        )(req, res, next)
      } else if (req.cookies.request_code == '100') {
        express.static(
          path.join(__dirname, '..', 'src', 'frontend', 'user', 'icon')
        )(req, res, next)
      } else {
        express.static(
          path.join(__dirname, '..', 'src', 'frontend', 'home', 'icon')
        )(req, res, next)
      }
    })

    this.express.use('/icons', (req, res, next) => {
      if (req.cookies.request_code == '200') {
        express.static(
          path.join(__dirname, '..', 'src', 'frontend', 'admin', 'icons')
        )(req, res, next)
      } else if (req.cookies.request_code == '100') {
        express.static(
          path.join(__dirname, '..', 'src', 'frontend', 'user', 'icons')
        )(req, res, next)
      } else {
        express.static(
          path.join(__dirname, '..', 'src', 'frontend', 'home', 'icons')
        )(req, res, next)
      }
    })

    this.express.use('/js', (req, res, next) => {
      if (req.cookies.request_code == '200') {
        express.static(
          path.join(__dirname, '..', 'src', 'frontend', 'admin', 'js')
        )(req, res, next)
      } else if (req.cookies.request_code == '100') {
        express.static(
          path.join(__dirname, '..', 'src', 'frontend', 'user', 'js')
        )(req, res, next)
      } else {
        express.static(
          path.join(__dirname, '..', 'src', 'frontend', 'home', 'js')
        )(req, res, next)
      }
    })

    this.express.use('/svg', (req, res, next) => {
      if (req.cookies.request_code == '200') {
        express.static(
          path.join(__dirname, '..', 'src', 'frontend', 'admin', 'svg')
        )(req, res, next)
      } else if (req.cookies.request_code == '100') {
        express.static(
          path.join(__dirname, '..', 'src', 'frontend', 'user', 'svg')
        )(req, res, next)
      } else {
        express.static(
          path.join(__dirname, '..', 'src', 'frontend', 'home', 'svg')
        )(req, res, next)
      }
    })

    this.express.use('/Trident', (req, res, next) => {
      if (req.cookies.request_code == '200') {
        express.static(
          path.join(__dirname, '..', 'src', 'frontend', 'admin', 'Trident')
        )(req, res, next)
      } else if (req.cookies.request_code == '100') {
        express.static(
          path.join(__dirname, '..', 'src', 'frontend', 'user', 'Trident')
        )(req, res, next)
      } else {
        express.static(
          path.join(__dirname, '..', 'src', 'frontend', 'home', 'Trident')
        )(req, res, next)
      }
    })

    this.express.use('/vendor', (req, res, next) => {
      if (req.cookies.request_code == '200') {
        express.static(
          path.join(__dirname, '..', 'src', 'frontend', 'admin', 'vendor')
        )(req, res, next)
      } else if (req.cookies.request_code == '100') {
        express.static(
          path.join(__dirname, '..', 'src', 'frontend', 'user', 'vendor')
        )(req, res, next)
      } else {
        express.static(
          path.join(__dirname, '..', 'src', 'frontend', 'home', 'vendor')
        )(req, res, next)
      }
    })

    this.express.use('/s', (req, res, next) => {
      if (req.cookies.request_code == '200') {
        express.static(
          path.join(__dirname, '..', 'src', 'frontend', 'admin', 's')
        )(req, res, next)
      } else if (req.cookies.request_code == '100') {
        express.static(
          path.join(__dirname, '..', 'src', 'frontend', 'user', 's')
        )(req, res, next)
      } else {
        express.static(
          path.join(__dirname, '..', 'src', 'frontend', 'home', 's')
        )(req, res, next)
      }
    })

    this.express.get(/.*/, (req, res) => {
      if (req.cookies.request_code == '200') {
        res.sendFile(path.join(__dirname, 'frontend', 'admin', 'index.html'))
      } else if (req.cookies.request_code == '100') {
        res.sendFile(path.join(__dirname, 'frontend', 'user', 'index.html'))
      } else {
        res.sendFile(path.join(__dirname, 'frontend', 'home', 'index.html'))
      }
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
        } else if (err === invalidCsrfTokenError) {
          ApiError.handle(new InvalidCsrfTokenError(), res)
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
