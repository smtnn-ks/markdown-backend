import { tags } from 'typia'

export type EmailDto = {
  email: string & tags.Format<'email'>
}
