import { generatePassword } from '../ducks/utils'

export const user = {
  email: 'test@test.ru',
  password: generatePassword()
}
