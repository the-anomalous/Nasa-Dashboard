const { 
  getAllLaunches, 
  addNewLaunch,
  abortLaunchWithId,
  existsLaunchWithId } = require('../../models/launches.model.js')

const httpGetAllLaunches = (req, res) => {
  return res.status(200).json(getAllLaunches())
}   

const httpAddNewLaunch = (req,res) => {
  const launch = req.body

  if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
    return res.status(400).json({
      error: "Missing required launch property"
    })
  }

  launch.launchDate = new Date(launch.launchDate)
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid date"
    })
  }

  addNewLaunch(launch)
  return res.status(201).json(launch)
}
 
const httpAbortLaunch = (req, res) => {
  const launchId = Number(req.params.id)
    
  if(!existsLaunchWithId(launchId))
  return res.status(404).json({
    error: 'Launch Id not found'
  })
  
  const aborted = abortLaunchWithId(launchId)
  return res.status(200).json(aborted)
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch
}
