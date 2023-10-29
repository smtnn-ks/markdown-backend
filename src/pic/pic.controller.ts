import { Request, Response } from 'express'
import picService from './pic.service'

class PicController {
  async getAll(req: Request, res: Response, next: (_: unknown) => void) {
    // @ts-ignore
    const userId = req.user.sub
    const docId = req.params.id
    try {
      const pics = await picService.getAll(userId, docId)
      res.json(pics)
    } catch (e) {
      next(e)
    }
  }

  async create(req: Request, res: Response, next: (_: unknown) => void) {
    // @ts-ignore
    const userId = req.user.sub
    const docId = req.params.id
    const file = req.file
    try {
      const pic = await picService.create(
        userId,
        docId,
        file as Express.Multer.File,
      )
      res.status(201).json(pic)
    } catch (e) {
      next(e)
    }
  }

  async delete(req: Request, res: Response, next: (_: unknown) => void) {
    // @ts-ignore
    const userId = req.user.sub
    const docId = req.params.id1
    const picId = req.params.id2
    try {
      const pic = await picService.delete(userId, docId, picId)
      res.status(201).json(pic)
    } catch (e) {
      next(e)
    }
  }

  async presignedUrl(req: Request, res: Response, next: (_: unknown) => void) {
    const id = req.params.id
    try {
      const url = await picService.presignedUrl(id)
      res.json({ url })
    } catch (e) {
      next(e)
    }
  }
}

export default new PicController()
