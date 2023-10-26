import { Request, Response } from 'express'
import docService from './doc.service'

class DocController {
  async getAll(_req: Request, res: Response) {
    const docs = await docService.getAll()
    res.json(docs)
  }

  async get(req: Request, res: Response) {
    const { id } = req.params
    if (!id) res.status(400).json({ message: 'ID не указан' })
    const doc = await docService.get(id)
    res.json(doc)
  }

  async create(req: Request, res: Response) {
    const userId = req.params?.id
    if (!userId) res.status(400).json({ message: 'ID не указан' })
    const { title } = req.body
    if (!title)
      res.status(400).json({ message: 'Пропущено обязательное поле title' })
    const doc = await docService.create(+userId, title)
    res.status(201).json(doc)
  }

  async update(req: Request, res: Response) {
    const id = req.params?.id
    if (!id) res.status(400).json({ message: 'ID не указан' })
    const { title } = req.body
    if (!title)
      res.status(400).json({ message: 'Пропущено обязательное поле title' })
    const doc = await docService.update(id, title)
    res.status(201).json(doc)
  }

  async delete(req: Request, res: Response) {
    const id = req.params?.id
    if (!id) res.status(400).json({ message: 'ID не указан' })
    const doc = await docService.delete(id)
    res.status(201).json(doc)
  }
}

export default new DocController()
