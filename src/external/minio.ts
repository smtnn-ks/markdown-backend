import * as minio from 'minio'

const S3_ENDPOINT = process.env.S3_ENDPOINT as string
const S3_PORT = process.env.S3_PORT as string
const S3_ACCESS_KEY = process.env.S3_ACCESS_KEY as string
const S3_SECRET_KEY = process.env.S3_SECRET_KEY as string

export const client = new minio.Client({
  endPoint: S3_ENDPOINT,
  port: +S3_PORT,
  useSSL: false,
  accessKey: S3_ACCESS_KEY,
  secretKey: S3_SECRET_KEY,
})
