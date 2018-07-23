import { expect } from 'chai'
import { stub, match } from 'sinon'
import accountDao from '../src/accountDao'

describe('Account Dao', () => {
  let dbStub

  beforeEach(() => {
    dbStub = {
      find: stub(),
      insertOne: stub().resolves(),
      deleteOne: stub().resolves(),
      updateOne: stub().resolves(),
    }
    accountDao.initialize({ collection: () => dbStub })
  })

  it('retrieves accounts from db', () => {
    const accounts = [
      { id: '2', email: 'd@b.com' },
      { id: '3', email: 'd@b.com' },
    ]
    dbStub.find.returns({ toArray: stub().resolves(accounts) })
    return expect(accountDao.getAccounts()).to.eventually.eql(accounts)
  })

  it('persists account in db', () => {
    const account = { id: '123', email: 'a@bc.com' }
    return accountDao.insertAccount(account).then(() => {
      expect(dbStub.insertOne).to.have.been.calledWith(account)
    })
  })

  it('deletes one account from db', () => {
    return accountDao.deleteAccount('1').then(() => {
      expect(dbStub.deleteOne).to.have.been.calledWith({ id: '1' })
    })
  })

  it('updates one account from db', () => {
    const account = { id: '123', email: 'a@bc.com' }
    return accountDao.updateAccount(account).then(() => {
      expect(dbStub.updateOne).to.have.been.calledWith(
        { id: '123' },
        { $set: { email: 'a@bc.com' } },
      )
    })
  })
})
