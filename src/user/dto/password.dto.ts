import { tags } from 'typia'

export type PasswordDto = {
  password: string & tags.MinLength<8> & tags.MaxLength<30>
}
