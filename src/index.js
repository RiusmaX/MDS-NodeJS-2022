require('dotenv').config()

const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const app = express()
const port = 3000

// Connection à la base de données
const connect = require('./data/helpers/db')
connect()

// Ajout de 9 middlewares de sécurité
app.use(helmet())
// Gestion du cross-origin
app.use(cors())

// Parmétrage de Express pour le body et le JSON
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// On importe le logger
const logger = require('./middlewares/logger')
// On dit à Express d'utiliser le logger en tant que middleware
app.use(logger)

// On branche notre route users sur le fichier correspondant, le nom index.js est utilisé par défaut.
app.use('/users', require('./routes/users'))
app.use('/auth', require('./routes/auth'))
app.use('/protected', require('./routes/protected'))
app.use('/files/upload', require('./routes/files/upload'))
app.use('/files/download', require('./routes/files/download'))

app.get('/', (req, res) => {
  res.send('Hello world Express !')
})

app.listen(port, () => {
  console.log('Server is running on port ' + port)
})
