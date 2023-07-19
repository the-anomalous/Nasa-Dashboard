const { 
  getAllLaunches, 
  scheduleNewLaunch,
  abortLaunchWithId,
  existsLaunchWithId } = require('../../models/launches.model.js')

const httpGetAllLaunches = async (req, res) => {
  return res.status(200).json(await getAllLaunches())
}   

const httpAddNewLaunch = async (req,res) => {
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

  await scheduleNewLaunch(launch)
  return res.status(201).json(launch)
}
 
const httpAbortLaunch = async (req, res) => {
  const launchId = Number(req.params.id)
   
  const launchExists = await existsLaunchWithId(launchId)
  
  if(!launchExists) {
  return res.status(404).json({
    error: 'Launch Id not found'
  })}
  
  const aborted = await abortLaunchWithId(launchId)
  
  if (!aborted) {
    return res.status(400).json({
      error: 'Launch not aborted'
    })
  }

  return res.status(200).json({
    ok: true
  })
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch
}
