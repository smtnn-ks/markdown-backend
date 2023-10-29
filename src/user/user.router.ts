import { Router } from 'express'
import passport from 'passport'
import {
  isEmail,
  isPassword,
  isStringId,
  isUserDto,
} from '../middleware/validation.middleware'
import userController from './user.controller'

const userRouter = Router()

userRouter.post('/signup', isUserDto, userController.signUp)
userRouter.post('/signin', isUserDto, userController.signIn)
userRouter.post(
  '/logout',
  passport.authenticate('access', { session: false }),
  userController.logout,
)
userRouter.post(
  '/refresh',
  passport.authenticate('refresh', { session: false }),
  userController.refresh,
)
userRouter.post('/activate/:id', isStringId, userController.activate)
userRouter.post('/send-restore/', isEmail, userController.sendRestore)
userRouter.post(
  '/restore',
  passport.authenticate('restore', { session: false }),
  isPassword,
  userController.restore,
)

export default userRouter
