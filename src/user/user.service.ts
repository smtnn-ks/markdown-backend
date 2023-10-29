import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { nanoid } from 'nanoid'
import { prisma } from '../external'
import { HttpError } from '../middleware/error-handler.middleware'
import { UserDto } from './dto'

class UserService {
  SALT_ROUNDS = Number(process.env.SALT_ROUNDS as string)
  JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY as string
  JWT_REFRESH_KEY = process.env.JWT_REFRESH_KEY as string
  JWT_RESTORE_KEY = process.env.JWT_RESTORE_KEY as string

  async singUp(dto: UserDto) {
    const { email, password } = dto
    const candidate = await prisma.user.findUnique({ where: { email } })
    if (candidate) throw new HttpError(403, 'Email уже зарегистрирован')

    const hashPassword = await bcrypt.hash(password, this.SALT_ROUNDS)
    const activationLink = nanoid()
    return await prisma.user.create({
      data: {
        email,
        password: hashPassword,
        refreshToken: '',
        activationLink,
      },
    })
  }

  async signIn(dto: UserDto) {
    const { email, password } = dto

    const candidate = await prisma.user.findUnique({
      where: { email },
      select: { id: true, password: true, docs: { select: { id: true } } },
    })
    if (!candidate) throw new HttpError(403, 'Email не зарегистрирован')

    const verify = await bcrypt.compare(password, candidate.password)
    if (!verify) throw new HttpError(403, 'Неверный пароль')

    const payload = { sub: candidate.id }

    const accessToken = jwt.sign(payload, this.JWT_ACCESS_KEY, {
      expiresIn: '1d',
    })
    const refreshToken = jwt.sign(payload, this.JWT_REFRESH_KEY, {
      expiresIn: '14d',
    })

    const hashRefreshToken = await bcrypt.hash(refreshToken, this.SALT_ROUNDS)
    await prisma.user.update({
      where: { id: candidate.id },
      data: { refreshToken: hashRefreshToken },
    })

    return { accessToken, refreshToken }
  }

  async logout(id: number) {
    return await prisma.user.update({
      where: { id },
      data: { refreshToken: '' },
    })
  }

  async refresh(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        docs: { select: { id: true } },
      },
    })
    if (!user) throw new HttpError(403, 'Не удалось найти такого пользователя')

    const payload = { sub: user.id }

    const accessToken = jwt.sign(payload, this.JWT_ACCESS_KEY)
    const refreshToken = jwt.sign({ sub: user.id }, this.JWT_REFRESH_KEY)

    const hashRefreshToken = await bcrypt.hash(refreshToken, this.SALT_ROUNDS)
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: hashRefreshToken },
    })

    return { accessToken, refreshToken }
  }

  async activate(activationLink: string) {
    return await prisma.user.update({
      where: { activationLink },
      data: { isActivated: true },
    })
  }

  async sendRestore(email: string) {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user)
      throw new HttpError(400, 'Не удалось найти пользователя с таким email')
    const restoreToken = jwt.sign({ sub: user.id }, this.JWT_RESTORE_KEY, {
      expiresIn: '10m',
    })
    return { restoreToken }
  }

  async restore(id: number, password: string) {
    const hashPassword = await bcrypt.hash(password, this.SALT_ROUNDS)
    return await prisma.user.update({
      where: { id },
      data: { password: hashPassword },
    })
  }
}

export default new UserService()
