import { Router } from 'express'
import { isStringId } from '../middleware/validation.middleware'
import picController from '../pic/pic.controller'
import docController from '../doc/doc.controller'

const presignedRouter = Router()

presignedRouter.get('/docs/:id', isStringId, docController.presignedUrl)
presignedRouter.get('/pics/:id', isStringId, picController.presignedUrl)

export default presignedRouter
