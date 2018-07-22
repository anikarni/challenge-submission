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
    const accounts = [{ id: 2 }, { id: 3 }]
    dbStub.find.returns({ toArray: stub().resolves(accounts) })
    return expect(accountDao.getAccounts()).to.eventually.equal(accounts)
  })

  it('persists account in db', () => {
    return accountDao.insertAccount('a@bc').then(() => {
      expect(dbStub.insertOne).to.have.been.calledWith({
        id: match(/[\w\d-]+/),
        email: 'a@bc',
      })
    })
  })

  it('deletes one account from db', () => {
    return accountDao.deleteAccount('1').then(() => {
      expect(dbStub.deleteOne).to.have.been.calledWith({ id: '1' })
    })
  })

  it('updates one account from db', () => {
    return accountDao.updateAccount('1', '123@2').then(() => {
      expect(dbStub.updateOne).to.have.been.calledWith(
        { id: '1' },
        { $set: { email: '123@2' } },
      )
    })
  })
})
