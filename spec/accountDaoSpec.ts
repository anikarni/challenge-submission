import { expect } from 'chai'
import { stub } from 'sinon'
import accountDao from '../src/accountDao'

describe('Account Dao', () => {
  let dbStub

  beforeEach(() => {
    dbStub = { find: stub(), insertOne: stub().resolves() }
    accountDao.initialize({ collection: () => dbStub })
  })

  it('retrieves accounts from db', () => {
    const accounts = [{ id: 2 }, { id: 3 }]
    dbStub.find.returns({ toArray: stub().resolves(accounts) })
    return expect(accountDao.getAccounts()).to.eventually.equal(accounts)
  })

  it('persists account in db', () => {
    const account = { id: 3 }
    return accountDao.insertAccount(account)
      .then(() => {
        expect(dbStub.insertOne).to.have.been.calledWith(account)
      })
  })
})
