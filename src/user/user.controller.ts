import { Request, Response } from 'express'
import userService from './user.service'

class UserController {
  async signUp(req: Request, res: Response, next: (_: unknown) => void) {
    const { email, password } = req.body
    try {
      const user = await userService.singUp({ email, password })
      res.status(201).json(user)
    } catch (e) {
      next(e)
    }
  }

  async signIn(req: Request, res: Response, next: (_: unknown) => void) {
    const { email, password } = req.body
    try {
      const tokens = await userService.signIn({ email, password })
      res.status(201).json(tokens)
    } catch (e) {
      next(e)
    }
  }

  async logout(req: Request, res: Response, next: (_: unknown) => void) {
    try {
      // @ts-ignore
      const id = req.user.sub
      const user = await userService.logout(+id)
      res.status(201).json(user)
    } catch (e) {
      next(e)
    }
  }

  async refresh(req: Request, res: Response, next: (_: unknown) => void) {
    try {
      // @ts-ignore
      const id = req.user.sub
      const tokens = await userService.refresh(+id)
      res.status(201).json(tokens)
    } catch (e) {
      next(e)
    }
  }

  async activate(req: Request, res: Response, next: (_: unknown) => void) {
    try {
      const activationLink = req.params.id
      const user = await userService.activate(activationLink)
      res.status(201).json(user)
    } catch (e) {
      next(e)
    }
  }

  async sendRestore(req: Request, res: Response, next: (_: unknown) => void) {
    try {
      const email = req.body.email
      const token = await userService.sendRestore(email)
      res.status(201).json(token)
    } catch (e) {
      next(e)
    }
  }

  async restore(req: Request, res: Response, next: (_: unknown) => void) {
    try {
      // @ts-ignore
      const id = req.user.sub
      const password = req.body.password
      const user = await userService.restore(id, password)
      res.status(201).json(user)
    } catch (e) {
      next(e)
    }
  }
}

export default new UserController()
