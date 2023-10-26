import { Router } from 'express'
import picController from './pic.controller'

const picRouter = Router()

picRouter.get('/', picController.getAll)
picRouter.get('/:id', picController.get)
picRouter.post('/:id', picController.create)
picRouter.delete('/:id', picController.delete)

export default picRouter
