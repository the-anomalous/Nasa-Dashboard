const express = require('express')
const launchesRouter = require('../routes/launches/launches.routes')
const planetsRouter = require('../routes/planets/planets.routes')
 
const v1Router = express.Router()

// Routes starts with /v1/planets
v1Router.use('/planets', planetsRouter)

// Routes starts with /v1/launches
v1Router.use('/launches', launchesRouter)

module.exports = {
  v1Router
}
