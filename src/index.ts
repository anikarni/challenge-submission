import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import { MongoClient } from 'mongodb'
import accountController from './accountController'
import accountDao from './accountDao'

const PORT = 8080
const DB_URL = process.env.MONGO_URL || 'mongodb://localhost:27017'
const DB_NAME = 'accounts'
const app = express()

// Start db connection
MongoClient.connect(DB_URL, (err, client) => {
  if (err) throw err

  console.log('Connected to database server')
  const db = client.db(DB_NAME)
  accountDao.initialize(db)

  // Start app
  app.listen(PORT, () => console.log(`App listening on port ${PORT}`))
})

app.set('views', path.join(__dirname, '../templates'))
app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routing
app.get('/', accountController.listAccounts)
app.post('/accounts/create', accountController.createAccount)
