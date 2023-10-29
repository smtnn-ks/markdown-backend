import { prisma, client } from '../external'
import { nanoid } from 'nanoid'
import { HttpError } from '../middleware/error-handler.middleware'

// NOTE: Удаление несуществующей записи из S3 не пробрасывает ошибку.

class DocService {
  async getAll(userId: number) {
    return await prisma.doc.findMany({ where: { userId } })
  }

  async get(id: string, userId: number) {
    const doc = await prisma.doc.findUnique({
      where: { id },
      select: { id: true, title: true, userId: true },
    })
    if (doc?.userId !== userId)
      throw new HttpError(401, 'Данный документ вам не принадлежит')
    return doc
  }

  async create(userId: number, title: string, file?: Express.Multer.File) {
    const id = nanoid()
    await client.putObject('docs', id, file ? file.buffer : '')
    return await prisma.doc.create({
      data: { id, title, user: { connect: { id: userId } } },
    })
  }

  async update(
    id: string,
    userId: number,
    title?: string,
    file?: Express.Multer.File,
  ) {
    let doc = await prisma.doc.findUnique({
      where: { id },
      select: { title: true, userId: true },
    })
    if (doc) {
      if (doc.userId !== userId)
        throw new HttpError(401, 'Данный документ вам не принадлежит')
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

  // NOTE: Можно использовать sql для того, чтобы проверять userId за один
  // запрос, используя транзакцию.
  async delete(id: string, userId: number) {
    const doc = await prisma.doc.findUnique({
      where: { id },
      select: { userId: true },
    })
    if (doc?.userId !== userId)
      throw new HttpError(401, 'Данный документ вам не принадлежит')
    await client.removeObject('docs', id)
    return await prisma.doc.delete({ where: { id } })
  }

  // NOTE: А нужен ли presignedUrl?
  async presignedUrl(id: string) {
    return await client.presignedUrl('GET', 'docs', id)
  }
}

export default new DocService()
