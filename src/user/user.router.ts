import { Router } from 'express'
import userController from './user.controller'
import {
  isNumberId,
  isUserCreateDto,
  isUserUpdateDto,
} from '../middleware/validation.middleware'

const userRouter = Router()

userRouter.get('/', userController.getAll)
userRouter.get('/:id', isNumberId, userController.get)
userRouter.post('/', isUserCreateDto, userController.create)
userRouter.put('/:id', isNumberId, isUserUpdateDto, userController.update)
userRouter.delete('/:id', isNumberId, userController.delete)

export default userRouter
