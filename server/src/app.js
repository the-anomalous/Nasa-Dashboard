const express = require('express')
const cors = require('cors')
const path = require('path')
const morgan = require('morgan')

// Routers
const planetsRouter = require('./routes/planets/planets.routes.js')
const launchesRouter = require('./routes/launches/launches.routes.js')    

const app = express()

app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 
}))

app.use(morgan('combined'))
app.use(express.json())

app.use('/planets', planetsRouter)
app.use('/launches', launchesRouter)

app.use(express.static(path.join(__dirname, '..', 'public')))
app.get('/*', (req,res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

module.exports = app
