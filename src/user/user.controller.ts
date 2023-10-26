import { Request, Response } from 'express'
import userService from './user.service'
import { UserCreateDto, UserUpdateDto } from './dto'

class UserController {
  async getAll(_req: Request, res: Response) {
    const users = await userService.getAll()
    res.json(users)
  }

  async get(req: Request, res: Response) {
    const { id } = req.params
    if (!id) res.status(400).json({ message: 'ID не указан' })
    const user = await userService.get(+id)
    res.status(201).json(user)
  }

  async create(req: Request, res: Response) {
    const data = req.body as UserCreateDto
    const user = await userService.create(data)
    res.status(201).json(user)
  }

  async update(req: Request, res: Response) {
    const { id } = req.params
    if (!id) res.status(400).json({ message: 'ID не указан' })
    const data = req.body as UserUpdateDto
    const user = await userService.update(+id, data)
    res.status(201).json(user)
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params
    if (!id) res.status(400).json({ message: 'ID не указан' })
    const user = await userService.delete(+id)
    res.status(201).json(user)
  }
}

export default new UserController()
