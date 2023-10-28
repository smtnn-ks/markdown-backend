import { Router } from 'express'
import picController from './pic.controller'
import { isStringId, isFile } from '../middleware/validation.middleware'
import { upload } from '../external'

const picRouter = Router()

picRouter.get('/', picController.getAll)
picRouter.get('/:id', isStringId, picController.get)
picRouter.post(
  '/:id',
  upload.single('file'),
  isFile,
  isStringId,
  picController.create,
)
picRouter.delete('/:id', isStringId, picController.delete)
picRouter.get('/url/:id', isStringId, picController.presignedUrl)

export default picRouter
