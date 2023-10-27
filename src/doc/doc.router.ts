import { Router } from 'express'
import docController from './doc.controller'
import {
  isNumberId,
  isStringId,
  isDocDto,
} from '../middleware/validation.middleware'

const docRouter = Router()

docRouter.get('/', docController.getAll)
docRouter.get('/:id', isStringId, docController.get)
docRouter.post('/:id', isNumberId, isDocDto, docController.create)
docRouter.put('/:id', isStringId, isDocDto, docController.update)
docRouter.delete('/:id', isStringId, docController.delete)

export default docRouter
