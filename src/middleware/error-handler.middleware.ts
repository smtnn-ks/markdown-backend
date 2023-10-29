import { Prisma } from '@prisma/client'
import { Request, Response } from 'express'

export class HttpError extends Error {
  statusCode: number
  constructor(statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode
  }
}

export function handleError(
  err: Error,
  _req: Request,
  res: Response,
  _next: () => void,
) {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2025' || err.code === 'P2016') {
      return res
        .status(400)
        .json({ message: `не удалось найти сущность с таким ID` })
    }
  }

  if (err instanceof HttpError)
    return res.status(err.statusCode).json({ message: err.message })

  console.error(err)
  return res.status(500).json({ message: err.message })
}
