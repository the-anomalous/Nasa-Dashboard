const express = require('express')
const {getAllPlanets} = require('./planets.controller')

const planetsRouter = express.Router()

// Matches '/planets' route
planetsRouter.get('/', getAllPlanets)


module.exports = planetsRouter
