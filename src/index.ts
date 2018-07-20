import path from 'path'
import express from 'express'
import { MongoClient } from 'mongodb'
import accountController from './accountController'
import accountDao from './accountDao'

const PORT = 8080
const DB_URL = 'mongodb://localhost:27017'
const DB_NAME = 'accounts'

// Start db connection
MongoClient.connect(DB_URL, (err, client) => {
  console.log('Connected to database server')
  const db = client.db(DB_NAME)
  accountDao.initialize(db)

  // Start app
  app.listen(PORT, () => console.log(`App listening on port ${PORT}`))
})

const app = express()
app.set('views', path.join(__dirname, '../templates'))
app.set('view engine', 'ejs')

// Routing
app.get('/', accountController.listAccounts)
