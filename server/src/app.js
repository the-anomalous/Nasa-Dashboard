const express = require('express')
const cors = require('cors')
const path = require('path')
const morgan = require('morgan')
const { v1Router } = require('./routes/v1.routes.js')

const app = express()

app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 
}))

app.use(morgan('combined'))
app.use(express.json())

// Routes starts with /v1
app.use('/v1', v1Router)

app.use(express.static(path.join(__dirname, '..', 'public')))
app.get('/*', (req,res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

module.exports = app
