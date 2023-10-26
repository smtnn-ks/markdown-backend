import { Prisma } from '@prisma/client'
import { prisma } from '../external'
import { nanoid } from 'nanoid'

class DocService {
  async getAll() {
    return await prisma.doc.findMany()
  }

  async get(id: string) {
    return await prisma.doc.findUnique({ where: { id } })
  }

  async create(userId: number, title: string) {
    const data: Prisma.DocCreateInput = {
      id: nanoid(),
      title,
      path: 'path',
      user: { connect: { id: userId } },
    }
    return await prisma.doc.create({ data })
  }

  async update(id: string, title: string) {
    return await prisma.doc.update({ where: { id }, data: { title } })
  }

  async delete(id: string) {
    return await prisma.doc.delete({ where: { id } })
  }
}

export default new DocService()
