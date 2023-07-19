const { getHabitablePlanets }
 = require('../../models/planets.model')


const getAllPlanets = async (req, res) => {
  console.log('ran')  
  // console.log(await getHabitablePlanets())
  return res.status(200).json(await getHabitablePlanets())
} 
  
module.exports = {
  getAllPlanets,
}
