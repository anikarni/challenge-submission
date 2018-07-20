import { expect } from 'chai'
import { spy, stub } from 'sinon'
import { Request, Response } from 'express'
import accountController from '../src/accountController'
import accountDao from '../src/accountDao'

describe('Account controller', () => {
  let getAccountsStub, createAccountStub
  const accounts = [{ account: 1 }, { account: 2 }]
  const response: Partial<Response> = { render: spy(), redirect: spy() }

  beforeEach(() => {
    getAccountsStub = stub(accountDao, 'getAccounts').resolves(accounts)
    createAccountStub = stub(accountDao, 'insertAccount').resolves()
  })

  afterEach(() => {
    getAccountsStub.restore()
    createAccountStub.restore()
  })

  it('renders list of accounts', () => {
    return accountController.listAccounts(undefined, <Response> response)
      .then(() => {
        expect(response.render).to.have.been
          .calledWith('accounts', { title: 'List of Accounts', accounts })
      })
  })

  it('creates a new account', () => {
    const account = { id: '123', email: '234' }
    const request: Partial<Request> = { body: account }
    return accountController.createAccount(<Request> request, <Response> response)
      .then(() => {
        expect(createAccountStub).to.have.been.calledWith(account)
      })
  })

  it('reloads page if new account', () => {
    const request: Partial<Request> = { body: {} }
    return accountController.createAccount(<Request> request, <Response> response)
      .then(() => {
        expect(response.redirect).to.have.been.calledWith('/')
      })
  })
})
