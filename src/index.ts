import 'dotenv/config'
import express from 'express'
import passport from 'passport'
import crudRouter from './routers/crud.router'
import { prisma } from './external'
import { handleError } from './middleware/error-handler.middleware'
import presignedRouter from './routers/presigned.router'
import {
  accessStrategy,
  refreshStrategy,
  restoreStrategy,
} from './user/strategies'
import userRouter from './user/user.router'

const PORT = process.env.PORT || 6969

const app = express()

async function main() {
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.use('/user', userRouter)
  app.use('/docs', crudRouter)
  app.use('/url', presignedRouter)

  app.use(handleError)

  passport.use('access', accessStrategy)
  passport.use('refresh', refreshStrategy)
  passport.use('restore', restoreStrategy)

  app.listen(PORT, () => console.log(`Running on port ${PORT}...`))
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
