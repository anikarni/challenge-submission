import Account from './account'

export default {
  initialize: (db) => { this.col = db.collection('accounts') },
  getAccounts: () => { return this.col.find({}).toArray() },
  insertAccount: (account: Account) => { return this.col.insertOne(account) }
}
