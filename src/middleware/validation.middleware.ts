import { Request, Response } from 'express'
import { validate } from 'typia'
import { UserCreateDto, UserUpdateDto } from '../user/dto'

export function isNumberId(req: Request, res: Response, next: () => void) {
  const { id } = req.params
  if (!id) return res.status(400).json({ message: 'ID не указан' })
  if (!+id) return res.status(400).json({ message: 'ID должен быть числом' })
  next()
}

export function isStringId(req: Request, res: Response, next: () => void) {
  const { id } = req.params
  if (!id) return res.status(400).json({ message: 'ID не указан' })
  // длина nanoid составляет 21 символ
  if (id.length !== 21)
    return res.status(400).json({ message: 'неправильный формат ID' })
  next()
}

export function isUserCreateDto(req: Request, res: Response, next: () => void) {
  const validationResult = validate<UserCreateDto>(req.body)
  if (!validationResult.success)
    return res.status(400).json(validationResult.errors)
  next()
}

export function isUserUpdateDto(req: Request, res: Response, next: () => void) {
  const validationResult = validate<UserUpdateDto>(req.body)
  if (!validationResult.success)
    return res.status(400).json(validationResult.errors)
  next()
}

export function isDocCreateDto(req: Request, res: Response, next: () => void) {
  const { title } = req.body
  if (!title)
    return res
      .status(400)
      .json({ message: 'Отсутствует обязательное поле "title"' })
  next()
}

export function isFile(req: Request, res: Response, next: () => void) {
  const file = req.file
  if (!file)
    return res
      .status(400)
      .json({ message: 'Отсутствует обязательный файл в поле "file"' })
  next()
}
