import Account from './account'
import uuid from 'uuid/v4'

export default {
  initialize: db => {
    this.col = db.collection('accounts')
  },
  getAccounts: () => {
    return this.col.find({}).toArray()
  },
  insertAccount: (email: String) => {
    const id = uuid()
    return this.col.insertOne({ id, email })
  },
  deleteAccount: (id: String) => {
    return this.col.deleteOne({ id })
  },
}
