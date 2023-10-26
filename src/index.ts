import express from 'express'
import 'dotenv/config'
import { prisma } from './external'
import userRouter from './user/user.router'
import docRouter from './doc/doc.router'
import picRouter from './pic/pic.router'

const PORT = process.env.PORT || 6969

const app = express()

async function main() {
  app.use(express.json())

  app.use('/user', userRouter)
  app.use('/doc', docRouter)
  app.use('/pic', picRouter)

  app.listen(PORT, () => console.log(`Running on port ${PORT}...`))
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
