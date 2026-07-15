import path from 'path'
import { randomUUID } from 'crypto'
import multer from 'multer'
import MulterSharpResizer from './multerSharpResizer'
import * as fs from 'fs-extra'
import { v2 } from 'cloudinary'
import { ImageUploaderSizes } from './imageUploader.enum'
import { BadRequestError } from '@/core/apiError'

export default class ImageUploader {
  static uploadTo = path.join('src', 'images')
  static uploadFolder = path.join(process.cwd(), 'src', 'images')
  // Configure only
  static externalHosting = process.env.EXTERNAL_IMAGE_HOST === 'true'
  static imageHost = process.env.IMAGE_HOST
  static folderAsTemp = process.env.IMAGE_FOLDER_AS_TEMP === 'true'
  static maxSize = 11485760
  static sizes = [
    { path: ImageUploaderSizes.ORIGINAL, width: null, height: null },
    { path: ImageUploaderSizes.ITEM_VIEW, width: 1742, height: 980 },
    { path: ImageUploaderSizes.ITEM_HERO, width: 940, height: 640 },
    { path: ImageUploaderSizes.ITEM_COVER, width: 470, height: 600 },
    { path: ImageUploaderSizes.ITEM_CARD, width: 450, height: 450 },
    { path: ImageUploaderSizes.ITEM_PROFILE, width: 150, height: 150 },
    { path: ImageUploaderSizes.COVER_MAIN, width: 1920, height: 320 },
    { path: ImageUploaderSizes.COVER_PROFILE, width: 600, height: 100 },
    { path: ImageUploaderSizes.COVER_CARD, width: 340, height: 100 },
    { path: ImageUploaderSizes.COVER_MENU, width: 240, height: 42 },
    { path: ImageUploaderSizes.PROFILE_MAIN, width: 164, height: 164 },
    { path: ImageUploaderSizes.PROFILE_CARD, width: 100, height: 100 },
    { path: ImageUploaderSizes.PROFILE_NAV, width: 50, height: 50 },
    { path: ImageUploaderSizes.PROFILE_ICON, width: 24, height: 24 },
  ]
  static imageFit = 'cover'
  static backgroundColor = { r: 255, g: 255, b: 255 }

  private _multerFilter(req: any, file: any, cb: any) {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/gif' ||
      file.mimetype === 'image/jpeg'
    ) {
      return cb(null, true)
    } else cb(new BadRequestError('Invalid Image format'), false)
  }

  private _upload() {
    return multer({
      storage: multer.memoryStorage(),
      fileFilter: this._multerFilter,
      limits: {
        fileSize: ImageUploader.maxSize,
      },
    })
  }

  public setNames(nameAndMaxCountArr: { name: string; maxCount: number }[]) {
    return (req: any, res: any, next: any) => {
      this._upload().fields(nameAndMaxCountArr)(req, res, (err: any) => {
        if (err instanceof multer.MulterError) {
          console.log(err)
          return next(new BadRequestError(err.message))
        } else if (err) {
          console.log(err)
          const error = err.status
            ? new BadRequestError(err.message)
            : new Error(err)
          return next(error)
        }
        next()
      })
    }
  }

  public resize(imageNameArr: string[], sizesArr: any) {
    return async (req: any, res: any, next: any) => {
      try {
        const filename: any = {}
        const folderArr = imageNameArr.slice()

        imageNameArr.forEach((imageName: any, i: any) => {
          filename[imageName] = `${folderArr[i]}-${randomUUID()}`
        })

        const sizes = ImageUploader.sizes.filter((obj: any) => {
          if (!sizesArr) return true
          if (sizesArr.includes(obj.path)) return true
        })

        const uploadPath: any[] = []

        folderArr.forEach((folder: any) => {
          uploadPath.push(path.join(ImageUploader.uploadFolder, folder))
        })

        const fileUrl = `${req.protocol}://${req.get('host')}/${
          ImageUploader.uploadTo
        }/${folderArr[0]}`

        const sharpOptions = {
          fit: ImageUploader.imageFit,
          background: ImageUploader.backgroundColor,
        }

        const resizeObject = new MulterSharpResizer(req, {
          filename,
          sizes,
          paths: uploadPath,
          url: fileUrl,
          options: sharpOptions,
        })

        await resizeObject.resize()
        const getDataUploaded = resizeObject.getData()

        imageNameArr.forEach((imageName: any) => {
          req.body[imageName] = getDataUploaded[imageName]
        })
      } catch (err: any) {
        console.log(err)
        return next(new Error(err))
      }
      next()
    }
  }

  public async delete(folder: string, filename: string, sizesArr: string[]) {
    console.log('deleted')
    sizesArr.forEach((size) => {
      const filePath = path.join(
        ImageUploader.uploadFolder,
        folder,
        size,
        filename
      )

      if (ImageUploader.externalHosting) {
        const deleteId =
          process.env.CLOUDINARY_PROJECT +
          '/' +
          folder +
          '/' +
          size +
          '/' +
          filename.split('.').slice(0, -1).join('.')

        v2.uploader.destroy(deleteId).then((res: any) => {
          console.log(res)
        })
      } else {
        fs.access(filePath, (err) => {
          if (err) {
            console.log(err)
            return
          }

          fs.unlink(filePath, (err) => {
            if (err) {
              console.log(err)
              throw err
            }
          })
        })
      }
    })
  }
}
