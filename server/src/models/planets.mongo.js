const mongoose = require('mongoose')

const planetsScehema = new mongoose.Schema({
  keplerName: {
    type: String,
    required: true
  }
})

// Connecting planetsScehema to 'planets'
module.exports = mongoose.model('Planet', planetsScehema)


