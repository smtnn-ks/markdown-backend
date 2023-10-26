import { Prisma } from '@prisma/client'
import { prisma } from '../external'
import { UserCreateDto, UserUpdateDto } from './dto'

class UserService {
  async getAll() {
    return await prisma.user.findMany()
  }

  async get(id: number) {
    return await prisma.user.findUnique({ where: { id } })
  }

  async create(dto: UserCreateDto) {
    const data: Prisma.UserCreateInput = {
      ...dto,
      refreshToken: 'refreshToken',
      activationLink: 'activationLink',
    }
    return await prisma.user.create({ data })
  }

  async update(id: number, dto: UserUpdateDto) {
    return await prisma.user.update({ where: { id }, data: dto })
  }

  async delete(id: number) {
    return await prisma.user.delete({ where: { id } })
  }
}

export default new UserService()
