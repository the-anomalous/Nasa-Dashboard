const http = require('http')
const app = require('./app')
const mongoose = require('mongoose')

const {connectMongoDB} = require('./services/mongo.js')
const {loadPlanetsData} = require('./models/planets.model')

const server = http.createServer(app)
const PORT = process.env.PORT || 5000

const MONGO_URL = 'mongodb+srv://anomalous003:67tQuBtdwhVRbPhA@nasacluster.qprm991.mongodb.net/?retryWrites=true&w=majority'

//MongDB onConnect events
mongoose.connection.once('open', () => console.log('MongDB connection is ready!!'))
mongoose.connection.on('error', (err) => console.error(err))

const startServer = async () => {
  await mongoose.connect(MONGO_URL)

  await connectMongoDB()
  await loadPlanetsData()
  server.listen(PORT, () => console.log(`Server running on ${PORT}...`))
}

startServer()
