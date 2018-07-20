import { expect } from 'chai'
import { spy, stub } from 'sinon'
import accountController from '../src/accountController'
import accountDao from '../src/accountDao'

describe('Account controller', () => {
  it('renders list of accounts', () => {
    const response = { render: spy() }
    const accounts = [{ account: 1 }, { account: 2 }]
    const accountDaoStub = stub(accountDao, 'getAccounts').returns(accounts)
    accountController.listAccounts(undefined, response)
    expect(response.render).to.have.been.calledWith('accounts', {
      title: 'List of Accounts',
      accounts
    })
    accountDaoStub.restore()
  })
})
