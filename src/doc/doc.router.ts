import { Router } from 'express'
import docController from './doc.controller'
import { upload } from '../external'
import {
  isNumberId,
  isStringId,
  isDocCreateDto,
} from '../middleware/validation.middleware'

const docRouter = Router()

docRouter.get('/', docController.getAll)
docRouter.get('/:id', isStringId, docController.get)
docRouter.post(
  '/:id',
  upload.single('file'),
  isNumberId,
  isDocCreateDto,
  docController.create,
)
docRouter.put('/:id', upload.single('file'), isStringId, docController.update)
docRouter.delete('/:id', isStringId, docController.delete)
docRouter.get('/url/:id', isStringId, docController.presignedUrl)

export default docRouter
