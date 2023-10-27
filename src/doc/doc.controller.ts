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
    try {
      const doc = await docService.create(+userId, title)
      res.status(201).json(doc)
    } catch (e) {
      catchPrismaIdError(e, userId, 'пользователя', res)
    }
  }

  async update(req: Request, res: Response) {
    const id = req.params.id
    const title = req.body.title
    try {
      const doc = await docService.update(id, title)
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
}

export default new DocController()
