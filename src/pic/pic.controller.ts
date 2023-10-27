import { Request, Response } from 'express'
import picService from './pic.service'
import { catchPrismaIdError } from '../utils'

class PicController {
  async getAll(_req: Request, res: Response) {
    const pics = await picService.getAll()
    res.json(pics)
  }

  async get(req: Request, res: Response) {
    const id = req.params.id
    const pic = await picService.get(id)
    res.json(pic)
  }

  async create(req: Request, res: Response) {
    const docId = req.params.id
    try {
      const pic = await picService.create(docId)
      res.status(201).json(pic)
    } catch (e) {
      catchPrismaIdError(e, docId, 'документ', res)
    }
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id
    try {
      const pic = await picService.delete(id)
      res.status(201).json(pic)
    } catch (e) {
      catchPrismaIdError(e, id, 'изобрежние', res)
    }
  }
}

export default new PicController()
