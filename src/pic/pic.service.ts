import { client, prisma } from '../external'
import { nanoid } from 'nanoid'
import sharp from 'sharp'
import { HttpError } from '../middleware/error-handler.middleware'

class PicService {
  async getAll(userId: number, docId: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        docs: {
          where: {
            id: docId,
          },
          select: {
            id: true,
            pics: true,
          },
        },
      },
    })
    if (!user || user.docs.length === 0)
      throw new HttpError(403, 'У вас нет доступа к этой картинке')
    const pics = user?.docs[0].pics
    return pics
  }

  async create(userId: number, docId: string, file: Express.Multer.File) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { docs: { where: { id: docId } } },
    })
    if (!user || user.docs.length === 0)
      throw new HttpError(403, 'У вас нет доступа к этому картинке')
    const id = nanoid()
    const buffer = await sharp(file.buffer).webp({ quality: 80 }).toBuffer()
    await client.putObject('pics', id, buffer)
    return await prisma.pic.create({ data: { id, docId } })
  }

  // NOTE: Картинки не нужно обнавлять. Пользователь может удалить ненужную
  // картинку и загрузить новую

  async delete(userId: number, docId: string, picId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        docs: {
          where: { id: docId },
          select: { pics: { where: { id: picId } } },
        },
      },
    })
    if (!user || user.docs.length === 0 || user.docs[0].pics.length === 0)
      throw new HttpError(403, 'У вас нет доступа к этому картинке')
    await client.removeObject('pics', picId)
    return await prisma.pic.delete({ where: { id: picId } })
  }

  async presignedUrl(id: string) {
    const pic = await prisma.pic.findUnique({ where: { id } })
    if (!pic) throw new HttpError(403, 'Такой картинки нет')
    return await client.presignedUrl('GET', 'pics', id)
  }
}

export default new PicService()
