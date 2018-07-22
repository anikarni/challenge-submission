import Account from './account'
import uuid from 'uuid/v4'

export default {
  initialize: db => {
    this.col = db.collection('accounts')
  },

  getAccounts: () => this.col.find({}).toArray(),

  insertAccount: (email: String) => this.col.insertOne({ id: uuid(), email }),

  deleteAccount: (id: String) => this.col.deleteOne({ id }),

  updateAccount: (id: String, email: String) => {
    return this.col.updateOne({ id }, { $set: { email } })
  },
}
