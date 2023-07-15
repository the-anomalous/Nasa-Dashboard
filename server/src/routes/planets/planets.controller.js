const { getHabitablePlanets }
 = require('../../models/planets.model')

const getAllPlanets = (req, res) => {
  return res.status(200).json(getHabitablePlanets())
} 
  
module.exports = {
  getAllPlanets,
}
