export default {
  initialize: (db) => { this.db = db },

  getAccounts: () => {
    return this.db.collection('accounts').find({}).toArray()
  }
}
