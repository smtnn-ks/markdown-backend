import 'dotenv/config'
import express from 'express'
import docRouter from './doc/doc.router'
import { prisma } from './external'
import picRouter from './pic/pic.router'
import userRouter from './user/user.router'
import passport from 'passport'
import {
  accessStrategy,
  refreshStrategy,
  restoreStrategy,
} from './user/strategies'
import { handleError } from './middleware/error-handler.middleware'

const PORT = process.env.PORT || 6969

const app = express()

async function main() {
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.use('/user', userRouter)
  app.use('/doc', docRouter)
  app.use('/pic', picRouter)

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
