import { Prisma } from '@prisma/client'
import { prisma } from '../external'
import { nanoid } from 'nanoid'

class PicService {
  async getAll() {
    return await prisma.pic.findMany()
  }

  async get(id: string) {
    return await prisma.pic.findUnique({ where: { id } })
  }

  async create(docId: string) {
    const data: Prisma.PicCreateInput = {
      id: nanoid(),
      path: 'path',
      doc: { connect: { id: docId } },
    }
    return await prisma.pic.create({ data })
  }

  // NOTE: Картинки не нужно обнавлять. Пользователь может удалить ненужную
  // картинку и загрузить новую

  async delete(id: string) {
    return await prisma.pic.delete({ where: { id } })
  }
}

export default new PicService()
