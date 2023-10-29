import { Router } from 'express'
import picController from './pic.controller'
import {
  isStringId,
  isTwoStringIds,
  isFile,
} from '../middleware/validation.middleware'
import passport from 'passport'
import { upload } from '../external'

const picRouter = Router()

picRouter.get(
  '/:id',
  passport.authenticate('access', { session: false }),
  isStringId,
  picController.getAll,
)
picRouter.post(
  '/:id',
  passport.authenticate('access', { session: false }),
  upload.single('file'),
  isStringId,
  isFile,
  picController.create,
)
picRouter.delete(
  '/:id1/:id2',
  passport.authenticate('access', { session: false }),
  isTwoStringIds,
  picController.delete,
)
picRouter.get('/url/:id', isStringId, picController.presignedUrl)

export default picRouter
