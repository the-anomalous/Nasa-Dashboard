const http = require('http')
const app = require('./app')
const {loadPlanetsData} = require('./models/planets.model')

const server = http.createServer(app)
const PORT = process.env.PORT || 5000

const startServer = async () => {
  await loadPlanetsData()
  server.listen(PORT, () => console.log(`Server running on ${PORT}...`))
}

startServer()