import { expect } from 'chai'
import { spy, stub } from 'sinon'
import { Response } from 'express'
import accountController from '../src/accountController'
import accountDao from '../src/accountDao'

describe('Account controller', () => {
  let accountDaoStub
  const accounts = [{ account: 1 }, { account: 2 }]

  beforeEach(() => {
    accountDaoStub = stub(accountDao, 'getAccounts').resolves(accounts)
  })

  afterEach(() => {
    accountDaoStub.restore()
  })

  it('renders list of accounts', () => {
    const response: Partial<Response> = { render: spy() }
    return accountController.listAccounts(undefined, <Response> response)
      .then(() => {
        expect(response.render).to.have.been.calledWith('accounts', {
          title: 'List of Accounts',
          accounts
        })
      })
  })
})
