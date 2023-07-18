const mongoose = require('mongoose')

const planetsScehema = new mongoose.Schema({
  kelplerName: {
    type: String,
    required: true
  }
})

// Connecting planetsScehema to 'planets'
module.exports = mongoose.model('Planet', planetsScehema)


