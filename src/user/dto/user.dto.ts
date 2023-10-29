import { tags } from 'typia'

export type UserDto = {
  email: string & tags.Format<'email'>
  password: string & tags.MinLength<8> & tags.MaxLength<30>
}
