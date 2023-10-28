import { prisma, client } from '../external'
import { nanoid } from 'nanoid'

// TODO: Вот что я думаю по поводу рефакторинга:
// 1. Поле path есть id + '.md', так что можно от него избавится.

// NOTE: Удаление несуществующей записи из S3 не пробрасывает ошибку.

class DocService {
  async getAll() {
    return await prisma.doc.findMany()
  }

  async get(id: string) {
    return await prisma.doc.findUnique({ where: { id } })
  }

  async create(userId: number, title: string, file?: Express.Multer.File) {
    const id = nanoid()
    await client.putObject('docs', id, file ? file.buffer : '')
    return await prisma.doc.create({ data: { id, title, userId } })
  }

  async update(id: string, title?: string, file?: Express.Multer.File) {
    let doc = await prisma.doc.findUnique({ where: { id } })
    if (doc) {
      if (file) {
        await client.removeObject('docs', id)
        await client.putObject('docs', id, file.buffer)
      }
      if (title && title != doc.title) {
        doc = await prisma.doc.update({ where: { id }, data: { title } })
      }
    }
    return doc
  }

  async delete(id: string) {
    const doc = await prisma.doc.delete({ where: { id } })
    await client.removeObject('docs', id)
    return doc
  }

  // NOTE: А нужен ли presignedUrl?
  async presignedUrl(id: string) {
    return await client.presignedUrl('GET', 'docs', id)
  }
}

export default new DocService()
