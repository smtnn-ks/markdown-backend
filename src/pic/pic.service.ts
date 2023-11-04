import { client, prisma } from '../external'
import { nanoid } from 'nanoid'
import sharp from 'sharp'
import { HttpError } from '../middleware/error-handler.middleware'
import imageType from 'image-type'

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
      throw new HttpError(403, 'У вас нет доступа к этому документу')
    const pics = user?.docs[0].pics
    return pics
  }

  async create(userId: number, docId: string, file: Express.Multer.File) {
    if (file.size > 5 * Math.pow(10, 6))
      throw new HttpError(400, 'Размер файла на должен превышать 5MB')
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { docs: { where: { id: docId } } },
    })
    if (!user || user.docs.length === 0)
      throw new HttpError(403, 'У вас нет доступа к этому документу')
    const id = nanoid()
    const fileType = imageType(file.buffer)
    if (!(fileType && fileType?.mime.startsWith('image')))
      throw new HttpError(400, 'Данный формат файла не поддерживается')
    const buffer = await sharp(file.buffer).webp({ quality: 80 }).toBuffer()
    client.putObject('pics', id, buffer)
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
    client.removeObject('pics', picId)
    return await prisma.pic.delete({ where: { id: picId } })
  }

  async presignedUrl(id: string) {
    const pic = await prisma.pic.findUnique({ where: { id } })
    if (!pic) throw new HttpError(403, 'Такой картинки нет')
    return await client.presignedUrl('GET', 'pics', id)
  }
}

export default new PicService()
