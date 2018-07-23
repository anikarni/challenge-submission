import * as EmailValidator from 'email-validator'

export default class Account {
  constructor(readonly id: string, readonly email: string) {
    if (!EmailValidator.validate(this.email)) throw new Error('Invalid email')
  }
}
