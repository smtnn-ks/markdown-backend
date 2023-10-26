import { Router } from 'express'
import userController from './user.controller'

const userRouter = Router()

userRouter.get('/', userController.getAll)
userRouter.get('/:id', userController.get)
userRouter.post('/', userController.create)
userRouter.put('/:id', userController.update)
userRouter.delete('/:id', userController.delete)

export default userRouter
