import passport from 'passport'
import docController from '../doc/doc.controller'
import {
  isFile,
  isOptionalTitle,
  isStringId,
  isTitle,
  isTwoStringIds,
} from '../middleware/validation.middleware'
import { upload } from '../external'
import picController from '../pic/pic.controller'
import { Router } from 'express'

const crudRouter = Router()

crudRouter.get(
  '/',
  passport.authenticate('access', { session: false }),
  docController.getAll,
)
crudRouter.get(
  '/:id',
  passport.authenticate('access', { session: false }),
  isStringId,
  docController.get,
)
crudRouter.post(
  '/',
  passport.authenticate('access', { session: false }),
  upload.single('file'),
  isTitle,
  docController.create,
)
crudRouter.put(
  '/:id',
  passport.authenticate('access', { session: false }),
  upload.single('file'),
  isStringId,
  isOptionalTitle,
  docController.update,
)
crudRouter.delete(
  '/:id',
  passport.authenticate('access', { session: false }),
  isStringId,
  docController.delete,
)

crudRouter.get(
  '/:id/pics',
  passport.authenticate('access', { session: false }),
  isStringId,
  picController.getAll,
)
crudRouter.post(
  '/:id/pics',
  passport.authenticate('access', { session: false }),
  upload.single('file'),
  isStringId,
  isFile,
  picController.create,
)
crudRouter.delete(
  '/:id1/pics/:id2',
  passport.authenticate('access', { session: false }),
  isTwoStringIds,
  picController.delete,
)

export default crudRouter
