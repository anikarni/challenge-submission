import { expect } from 'chai'
import { spy, stub } from 'sinon'
import { Request, Response } from 'express'
import accountController from '../src/accountController'
import accountDao from '../src/accountDao'

describe('Account controller', () => {
  let getAccountsStub, createAccountStub, deleteAccountStub
  let response: Partial<Response>
  const accounts = [{ account: 1 }, { account: 2 }]

  beforeEach(() => {
    response = { render: spy(), redirect: spy() }
    getAccountsStub = stub(accountDao, 'getAccounts').resolves(accounts)
    createAccountStub = stub(accountDao, 'insertAccount').resolves()
    deleteAccountStub = stub(accountDao, 'deleteAccount').resolves()
  })

  afterEach(() => {
    getAccountsStub.restore()
    createAccountStub.restore()
    deleteAccountStub.restore()
  })

  it('renders list of accounts', () => {
    return accountController
      .listAccounts(undefined, <Response>response)
      .then(() => {
        expect(response.render).to.have.been.calledWith('accounts', {
          title: 'List of Accounts',
          accounts,
        })
      })
  })

  it('creates a new account', () => {
    const request: Partial<Request> = { body: { email: '234' } }
    return accountController
      .createAccount(<Request>request, <Response>response)
      .then(() => {
        expect(createAccountStub).to.have.been.calledWith('234')
      })
  })

  it('reloads page if new account', () => {
    const request: Partial<Request> = { body: {} }
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
})
