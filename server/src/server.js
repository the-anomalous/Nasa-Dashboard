const http = require('http')
const app = require('./app')
const mongoose = require('mongoose')

const {connectMongoDB} = require('./services/mongo.js')
const {loadPlanetsData} = require('./models/planets.model')
const {loadLaunchesData} = require('./models/launches.model.js')

const server = http.createServer(app)
const PORT = process.env.PORT || 5000

const startServer = async () => {
  await connectMongoDB()
  await loadPlanetsData()
  await loadLaunchesData()

  server.listen(PORT, () => console.log(`Server running on ${PORT}...`))
}

startServer()
