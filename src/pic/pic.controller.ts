import { Request, Response } from 'express'
import picService from './pic.service'

class PicController {
  async getAll(_req: Request, res: Response) {
    const pics = await picService.getAll()
    res.json(pics)
  }

  async get(req: Request, res: Response) {
    const { id } = req.params
    if (!id) res.status(400).json({ message: 'ID не указан' })
    const pic = await picService.get(id)
    res.json(pic)
  }

  async create(req: Request, res: Response) {
    const docId = req.params.id
    if (!docId) res.status(400).json({ message: 'ID не указан' })
    const pic = await picService.create(docId)
    res.status(201).json(pic)
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params
    if (!id) res.status(400).json({ message: 'ID не указан' })
    const pic = await picService.delete(id)
    res.status(201).json(pic)
  }
}

export default new PicController()
