import { Prisma } from '@prisma/client'
import { Response } from 'express'

export function catchPrismaIdError(
  e: any,
  id: number | string,
  what: 'пользователя' | 'документ' | 'изобрежние',
  res: Response,
) {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    if (e.code === 'P2025' || e.code === 'P2016') {
      return res
        .status(400)
        .json({ message: `не удалось найти ${what} с ID ${id}` })
    }
  }
  console.error(e)
  return res.status(500).json({ error: e?.message })
}
