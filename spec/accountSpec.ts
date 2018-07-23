import { expect } from 'chai'
import Account from '../src/account'

describe('Account', () => {
  it('valitates email', () => {
    expect(() => new Account('2', '23.com')).to.throw('Invalid email')
    expect(() => new Account('2', 'example@bd.com')).to.not.throw
  })
})
