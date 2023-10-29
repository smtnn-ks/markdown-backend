import { Router } from 'express'
import docController from './doc.controller'
import { upload } from '../external'
import { isStringId, isTitle } from '../middleware/validation.middleware'
import passport from 'passport'

const docRouter = Router()

docRouter.get(
  '/',
  passport.authenticate('access', { session: false }),
  docController.getAll,
)
docRouter.get(
  '/:id',
  passport.authenticate('access', { session: false }),
  isStringId,
  docController.get,
)
docRouter.post(
  '/',
  passport.authenticate('access', { session: false }),
  upload.single('file'),
  isTitle,
  docController.create,
)
docRouter.put(
  '/:id',
  passport.authenticate('access', { session: false }),
  upload.single('file'),
  isStringId,
  docController.update,
)
docRouter.delete(
  '/:id',
  passport.authenticate('access', { session: false }),
  isStringId,
  docController.delete,
)
docRouter.get('/url/:id', isStringId, docController.presignedUrl)

export default docRouter
