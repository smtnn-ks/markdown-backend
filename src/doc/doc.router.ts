import { Router } from 'express'
import docController from './doc.controller'

const docRouter = Router()

docRouter.get('/', docController.getAll)
docRouter.get('/:id', docController.get)
docRouter.post('/:id', docController.create)
docRouter.put('/:id', docController.update)
docRouter.delete('/:id', docController.delete)

export default docRouter
