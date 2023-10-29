import { Request, Response } from 'express'
import docService from './doc.service'

class DocController {
  async getAll(req: Request, res: Response) {
    // @ts-ignore
    const userId = req.user.sub
    const docs = await docService.getAll(userId)
    res.json(docs)
  }

  async get(req: Request, res: Response) {
    const id = req.params.id
    // @ts-ignore
    const userId = req.user.sub
    const doc = await docService.get(id, userId)
    res.json(doc)
  }

  async create(req: Request, res: Response, next: (_: unknown) => void) {
    // @ts-ignore
    const userId = req.user.sub
    const title = req.body.title
    const file = req.file
    try {
      const doc = await docService.create(userId, title, file)
      res.status(201).json(doc)
    } catch (e) {
      next(e)
    }
  }

  async update(req: Request, res: Response, next: (_: unknown) => void) {
    const id = req.params.id
    // @ts-ignore
    const userId = req.user.sub
    const title = req.body.title
    const file = req.file
    try {
      const doc = await docService.update(id, userId, title, file)
      res.status(201).json(doc)
    } catch (e) {
      next(e)
    }
  }

  async delete(req: Request, res: Response, next: (_: unknown) => void) {
    const id = req.params.id
    // @ts-ignore
    const userId = req.user.sub
    try {
      const doc = await docService.delete(id, userId)
      res.status(201).json(doc)
    } catch (e) {
      next(e)
    }
  }

  // NOTE: А нужен ли здесь presignedUrl?

  async presignedUrl(req: Request, res: Response, next: (_: unknown) => void) {
    try {
      const id = req.params.id
      const url = await docService.presignedUrl(id)
      res.json({ url })
    } catch (e) {
      next(e)
    }
  }
}

export default new DocController()
