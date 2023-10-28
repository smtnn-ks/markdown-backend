import { client, prisma } from '../external'
import { nanoid } from 'nanoid'
import sharp from 'sharp'

class PicService {
  async getAll() {
    return await prisma.pic.findMany()
  }

  async get(id: string) {
    return await prisma.pic.findUnique({ where: { id } })
  }

  async create(docId: string, file: Express.Multer.File) {
    const id = nanoid()
    const buffer = await sharp(file.buffer).webp({ quality: 80 }).toBuffer()
    await client.putObject('pics', id, buffer)
    return await prisma.pic.create({ data: { id, docId } })
  }

  // NOTE: Картинки не нужно обнавлять. Пользователь может удалить ненужную
  // картинку и загрузить новую

  async delete(id: string) {
    await client.removeObject('pics', id)
    return await prisma.pic.delete({ where: { id } })
  }

  async presignedUrl(id: string) {
    return await client.presignedUrl('GET', 'pics', id)
  }
}

export default new PicService()
