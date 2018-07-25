import { expect } from 'chai'
import { spy, stub, match } from 'sinon'
import { Request, Response } from 'express'
import accountController from '../src/accountController'
import accountDao from '../src/accountDao'

describe('Account controller', () => {
  let getAccountsStub, createAccountStub, deleteAccountStub, updateAccountStub
  let response: Partial<Response>
  const accounts = [{ account: 1, email: 'existing@bc.com' }, { account: 2 }]

  beforeEach(() => {
    response = { render: spy(), redirect: spy() }
    getAccountsStub = stub(accountDao, 'getAccounts').resolves(accounts)
    createAccountStub = stub(accountDao, 'insertAccount').resolves()
    deleteAccountStub = stub(accountDao, 'deleteAccount').resolves()
    updateAccountStub = stub(accountDao, 'updateAccount').resolves()
  })

  afterEach(() => {
    getAccountsStub.restore()
    createAccountStub.restore()
    deleteAccountStub.restore()
    updateAccountStub.restore()
  })

  it('renders list of accounts', () => {
    return accountController
      .listAccounts(undefined, <Response>response)
      .then(() => {
        expect(response.render).to.have.been.calledWith('accounts', {
          title: 'Accounts',
          accounts,
          error: '',
        })
      })
  })

  it('creates a new account', () => {
    const request: Partial<Request> = { body: { email: 'a@bc.com' } }
    return accountController
      .createAccount(<Request>request, <Response>response)
      .then(() => {
        expect(createAccountStub).to.have.been.calledWith({
          id: match(/[\w\d-]+/),
          email: 'a@bc.com',
        })
      })
  })

  it('validates email is unique', () => {
    const request: Partial<Request> = { body: { email: 'existing@bc.com' } }
    return accountController
      .createAccount(<Request>request, <Response>response)
      .then(() => {
        expect(response.render).to.have.been.calledWith('accounts', {
          title: 'Accounts',
          accounts,
          error: 'Account with given email already exists!',
        })
      })
  })

  it('reloads page if new account', () => {
    const request: Partial<Request> = { body: { email: 'a@bc.com' } }
    return accountController
      .createAccount(<Request>request, <Response>response)
      .then(() => {
        expect(response.redirect).to.have.been.calledWith('/')
      })
  })

  it('deletes account', () => {
    const request: Partial<Request> = { params: { id: 2 } }
    return accountController
      .deleteAccount(<Request>request, <Response>response)
      .then(() => {
        expect(deleteAccountStub).to.have.been.calledWith(2)
      })
  })

  it('reloads page after account is deleted', () => {
    const request: Partial<Request> = { params: { id: 2 } }
    return accountController
      .deleteAccount(<Request>request, <Response>response)
      .then(() => {
        expect(response.redirect).to.have.been.calledWith('/')
      })
  })

  it('updates an account', () => {
    const request: Partial<Request> = {
      params: { id: 2 },
      body: { email: 'ab@d.com' },
    }
    return accountController
      .updateAccount(<Request>request, <Response>response)
      .then(() => {
        expect(updateAccountStub).to.have.been.calledWith({
          id: 2,
          email: 'ab@d.com',
        })
      })
  })

  it('reloads page after account is deleted', () => {
    const request: Partial<Request> = { params: {}, body: { email: 'a@b.com' } }
    return accountController
      .updateAccount(<Request>request, <Response>response)
      .then(() => {
        expect(response.redirect).to.have.been.calledWith('/')
      })
  })

  it('renders error', () => {
    const request: Partial<Request> = { params: {}, body: { email: 'ab.com' } }
    return accountController
      .updateAccount(<Request>request, <Response>response)
      .then(() => {
        expect(response.render).to.have.been.calledWith('accounts', {
          title: 'Accounts',
          accounts,
          error: 'Invalid email',
        })
      })
  })
})
