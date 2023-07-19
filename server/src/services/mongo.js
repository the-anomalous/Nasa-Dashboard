const mongoose = require('mongoose')

const MONGO_URL = 'mongodb+srv://anomalous003:67tQuBtdwhVRbPhA@nasacluster.qprm991.mongodb.net/?retryWrites=true&w=majority' 

//MongDB onConnect events
mongoose.connection.once('open', () => console.log('MongDB connection is ready!!'))
mongoose.connection.on('error', (err) => console.error(err))

const connectMongoDB = async () => {
  await mongoose.connect(MONGO_URL)
}

const disconnectMongoDB = async () => {
  await mongoose.disconnect()
}

module.exports = {
  connectMongoDB,
  disconnectMongoDB
}
