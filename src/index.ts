import path from 'path'
import express from 'express'

const app = express()

const PORT = 8080

app.set('views', path.join(__dirname, '../templates'))
app.set('view engine', 'ejs')

// Routing
app.get('/', (req, res) => res.render('index'))

// Start app
app.listen(PORT, () => console.log(`App listening on port ${PORT}`))
