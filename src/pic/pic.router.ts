import { Router } from 'express'
import picController from './pic.controller'
import { isStringId } from '../middleware/validation.middleware'

const picRouter = Router()

picRouter.get('/', picController.getAll)
picRouter.get('/:id', isStringId, picController.get)
picRouter.post('/:id', isStringId, picController.create)
picRouter.delete('/:id', isStringId, picController.delete)

export default picRouter
