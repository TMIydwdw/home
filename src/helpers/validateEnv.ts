import { cleanEnv, str, port, bool, num } from 'envalid'

export default (): void => {
  cleanEnv(process.env, {
    NODE_ENV: str({
      choices: ['development', 'production', 'test'],
    }),
    DEVELOPER_EMAIL: str(),
    ADMIN_EMAIL: str(),
    MONGO_PATH: str(),
    PORT: port({ default: 3000 }),
    JWT_SECRET: str(),
    IMAGE_FOLDER_AS_TEMP: bool(),
    EXTERNAL_IMAGE_HOST: bool(),
    IMAGE_HOST: str(),
    CLOUDINARY_PROJECT: str(),
    CLOUDINARY_URL: str(),
    CLOUDINARY_NAME: str(),
    CLOUDINARY_KEY: str(),
    CLOUDINARY_SECRET: str(),
    SMTP_HOST: str(),
    SMTP_PORT: num(),
    SMTP_TLS: bool(),
    SMTP_SECURE: bool(),
    SMTP_USERNAME: str(),
    SMTP_PASSWORD: str(),
    CRYPTO_KEY: str(),
    CRYPTO_IV: str(),
    CRYPTO_METHOD: str(),
  })
}
