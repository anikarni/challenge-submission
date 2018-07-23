import Account from './account'

export default {
  initialize: db => {
    this.col = db.collection('accounts')
  },

  getAccounts: () => {
    return this.col
      .find({})
      .toArray()
      .then(docs => {
        return docs.map(doc => new Account(doc.id, doc.email))
      })
  },

  insertAccount: (account: Account) => {
    return this.col.insertOne(account)
  },

  deleteAccount: (id: string) => this.col.deleteOne({ id }),

  updateAccount: (account: Account) => {
    return this.col.updateOne(
      { id: account.id },
      { $set: { email: account.email } },
    )
  },
}
