import { Request, Response } from 'express'
import { validate, tags } from 'typia'
import { EmailDto, PasswordDto, UserDto, UserUpdateDto } from '../user/dto'

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

export function isTwoStringIds(req: Request, res: Response, next: () => void) {
  const { id1, id2 } = req.params
  if (!id1 && !id2) return res.status(400).json({ message: 'ID не указан' })
  // длина nanoid составляет 21 символ
  if (id1.length !== 21 && id2.length !== 21)
    return res.status(400).json({ message: 'неправильный формат ID' })
  next()
}

export function isUserDto(req: Request, res: Response, next: () => void) {
  const validationResult = validate<UserDto>(req.body)
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

export function isEmail(req: Request, res: Response, next: () => void) {
  const validationResult = validate<EmailDto>(req.body)
  if (!validationResult.success)
    return res.status(400).json(validationResult.errors)
  next()
}

export function isPassword(req: Request, res: Response, next: () => void) {
  const validationResult = validate<PasswordDto>(req.body)
  if (!validationResult.success)
    return res.status(400).json(validationResult.errors)
  next()
}

export function isTitle(req: Request, res: Response, next: () => void) {
  const { title } = req.body
  if (!title)
    return res
      .status(400)
      .json({ message: 'Отсутствует обязательное поле "title"' })
  const validationResult = validate<string & tags.MaxLength<50>>(title)
  if (!validationResult.success) {
    return res.status(400).json(validationResult.errors)
  }
  next()
}

export function isOptionalTitle(req: Request, res: Response, next: () => void) {
  const { title } = req.body
  if (title) {
    const validationResult = validate<string & tags.MaxLength<50>>(title)
    if (!validationResult.success) {
      return res.status(400).json(validationResult.errors)
    }
  }
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
