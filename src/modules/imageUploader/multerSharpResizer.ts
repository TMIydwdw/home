import * as fs from 'fs-extra'
import sharp from 'sharp'
import { v2 } from 'cloudinary'
import ImageUploader from './imageUploader'
import { Request } from 'express'
import { UploadedFile } from 'express-fileupload'
import path from 'path'

v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
})

interface MulterSharpResizerOptions {
  filename: string | { [key: string]: string }
  sizes: { path: string; width: number | null; height: number | null }[]
  paths: string[]
  url: string
  // options: { fit: string; background: { r: number; g: number; b: number } }
  options: any
}

interface ImageFile {
  name: string
  field?: string
  path: string
}

interface ImagePath {
  path: string
  folder: string
  name: string
  fullPath: string
}

interface CloudinaryOptions {
  use_filename: boolean
  unique_filename: boolean
  overwrite: boolean
  folder: string
}

export default class MulterSharpResizer {
  private files: ImageFile[] = []
  private ext?: string
  private name?: string
  private path?: string
  private data: ImageFile[] = []
  private tmpName?: string
  private tmpField?: string
  private _imagePaths: ImagePath[] = []

  constructor(
    private req: Request,
    private options: MulterSharpResizerOptions
  ) {
    this.options = options || {}

    const finalFilename = {}
    const finalPaths: string[] = []

    Object.keys(this.options.filename).forEach((val, i) => {
      //@ts-ignore
      if (this.req.files[val]) {
        //@ts-ignore
        finalFilename[val] = this.options.filename[val]
        finalPaths.push(this.options.paths[i])
      }
    })

    this.options.filename = finalFilename
    this.options.paths = finalPaths
  }

  isUploadedFile(obj: any): obj is UploadedFile {
    return (
      obj &&
      typeof obj.name === 'string' &&
      typeof obj.mv === 'function' &&
      typeof obj.data === 'string' &&
      typeof obj.tempFilePath === 'string'
    )
  }

  async resize() {
    if (this.req.files) {
      if (!Array.isArray(this.req.files)) {
        let i = 0
        for (const p in this.req.files) {
          const filesArray = this.req.files[p] as unknown as UploadedFile[]

          await Promise.all(
            filesArray.map(async (f: UploadedFile, j: number) => {
              await this.resizeImage(
                f,
                j,
                p,
                typeof this.options.filename === 'object'
                  ? this.options.filename[p]
                  : this.options.filename,
                i++
              )
            })
          )
        }
        return
      }
    }

    if (this.req.file) {
      return await this.resizeImage(this.req.file as unknown as UploadedFile, 0) // provide a value for 'i'
    }

    if (this.req.files) {
      await Promise.all(
        (this.req.files as unknown as UploadedFile[]).map(
          async (f: UploadedFile, i: number) => {
            await this.resizeImage(f, i)
          }
        )
      )
    }
  }

  getData() {
    if (this.req.files) {
      if (!Array.isArray(this.req.files)) {
        return this.removeProps(this.getDataWithFields(), 'field')
      } else {
        for (let i = 0; i < this.req.files.length - 1; i++) {
          const files = this.files.splice(0, this.options.sizes.length)
          this.data.push(...files)
        }
      }
    }

    this.data.push(...this.files)

    return this.data.map((f) =>
      this.renameKeys(
        this.options.sizes.map((s) => s.path),
        f
      )
    )
  }

  renameKeys(keys: string[], obj: any) {
    return Object.keys(obj).reduce((acc, key, index) => {
      this.tmpName = obj[key].name
      this.tmpField = obj[key].field
      delete obj[key].name
      delete obj[key].field
      return {
        ...acc,
        name: this.tmpName,
        field: this.tmpField,
        ...{ [keys[index]]: obj[key] },
      }
    }, {})
  }

  async resizeImage(
    f: UploadedFile,
    i: number,
    p = '',
    filenameParam = this.options.filename,
    index = 0
  ) {
    await Promise.all(
      this.options.sizes.map((s, j) => {
        this.ext = f.mimetype.split('/')[1]
        if (typeof filenameParam === 'string') {
          this.name = `${filenameParam.split(/\.([^.]+)$/)[0]}${
            i !== undefined ? `-${i}` : ''
          }.${this.ext}`
        }
        this.path = path.join(this.options.paths[index], s.path)
        fs.mkdirsSync(this.path)

        this.files.push({
          name: this.name || 'unknown',
          ...(p && { field: p }),
          path: path.join(this.options.url, s.path, this.name || 'unknown'),
        })

        if (!this.name) this.name = 'unknown'

        this._imagePaths.push({
          path: s.path,
          folder: this.path,
          name: this.name,
          fullPath: path.join(this.path, this.name),
        })

        const finalIndex = this.options.sizes.length * index + j

        // @ts-ignore
        return sharp(f.buffer)
          .resize(s.width, s.height, this.options.options)
          .toFile(path.join(this.path, this.name))
          .then(async () => {
            const details = {
              path: this._imagePaths[finalIndex].path,
              folder: this._imagePaths[finalIndex].folder,
              name: this._imagePaths[finalIndex].name,
              fullPath: path.join(
                this._imagePaths[finalIndex].folder,
                this._imagePaths[finalIndex].name
              ),
            }
            await this.uploadToCloud(details)
            this.deleteTempFile(details)
          })
          .catch((err) => {
            console.log(err)
          })
      })
    )
  }

  async uploadToCloud({ folder, name, path: paths, fullPath }: ImagePath) {
    if (!ImageUploader.externalHosting) return
    try {
      const folders = folder
        .split(/[/|\\]+/)
        .splice(-2)
        .join('/')

      const options: CloudinaryOptions = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        folder: process.env.CLOUDINARY_PROJECT + '/' + folders,
      }
      const result = await v2.uploader.upload(fullPath, options)
      console.log(result.public_id)
    } catch (err) {
      console.log(err)
    }
  }

  async deleteTempFile({ fullPath }: { fullPath: string }) {
    if (!ImageUploader.folderAsTemp) return
    fs.access(fullPath, (err) => {
      if (err) {
        return
      }
      fs.unlink(fullPath, (err) => {
        if (err) {
          console.log(err)
          throw err
        }
        console.log('Deleted')
      })
    })
  }

  getDataWithFields() {
    for (const p in this.req.files) {
      // @ts-ignore
      if (Array.isArray(this.req.files[p])) {
        // @ts-ignore
        for (let i = 0; i < this.req.files[p].length; i++) {
          // @ts-ignore
          this.data.push({ ...this.files.splice(0, this.options.sizes.length) })
        }
      } else {
        // @ts-ignore
        this.data.push({ ...this.files.splice(0, this.options.sizes.length) })
      }
    }

    return this.groupByFields(
      this.data.map((f) =>
        this.renameKeys({ ...this.options.sizes.map((s, i) => s.path) }, f)
      ),
      'field'
    )
  }

  groupByFields(array: any[], prop: string) {
    return array.reduce(function (r, a) {
      r[a[prop]] = r[a[prop]] || []
      r[a[prop]].push(a)
      return r
    }, Object.create(null))
  }

  removeProps(obj: any, propToDelete: string) {
    for (const property in obj) {
      if (typeof obj[property] == 'object') {
        delete obj.property
        let newData = this.removeProps(obj[property], propToDelete)
        obj[property] = newData
      } else {
        if (property === propToDelete) {
          delete obj[property]
        }
      }
    }
    return obj
  }
}
