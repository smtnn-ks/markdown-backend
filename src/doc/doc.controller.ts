import { Request, Response } from 'express'
import docService from './doc.service'
import { catchPrismaIdError } from '../utils'

class DocController {
  async getAll(_req: Request, res: Response) {
    const docs = await docService.getAll()
    res.json(docs)
  }

  async get(req: Request, res: Response) {
    const id = req.params.id
    const doc = await docService.get(id)
    res.json(doc)
  }

  async create(req: Request, res: Response) {
    const userId = req.params.id
    const title = req.body.title
    const file = req.file
    try {
      const doc = await docService.create(+userId, title, file)
      res.status(201).json(doc)
    } catch (e) {
      catchPrismaIdError(e, userId, 'пользователя', res)
    }
  }

  async update(req: Request, res: Response) {
    const id = req.params.id
    const title = req.body.title
    const file = req.file
    try {
      const doc = await docService.update(id, title, file)
      res.status(201).json(doc)
    } catch (e) {
      catchPrismaIdError(e, id, 'документ', res)
    }
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id
    try {
      const doc = await docService.delete(id)
      res.status(201).json(doc)
    } catch (e) {
      catchPrismaIdError(e, id, 'документ', res)
    }
  }

  // NOTE: А нужен ли здесь presignedUrl?

  async presignedUrl(req: Request, res: Response) {
    try {
      const id = req.params.id
      const url = await docService.presignedUrl(id)
      res.json({ url })
    } catch (e) {
      console.error(e)
      res.status(500).json({ message: (e as Error).message })
    }
  }
}

export default new DocController()
