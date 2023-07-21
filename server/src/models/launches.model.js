const launchesDatabase = require('./launches.mongo')
const planets = require('./planets.mongo')

const DEFAULT_FLIGHT_NUMBER = 100

const launch = {
  flightNumber: 100,
  mission: 'Kelper Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('27 December, 2030'),
  target: 'Kepler-442 b',
  customer: ['ZTM', 'Nasa'],
  upcoming: true,
  success: true
}

const saveAllLaunches = async launch => {
  const planet = await planets.findOne({
    keplerName: launch.target
  })
  
  if (!planet) {
    throw new Error('Planet not found')
  }
  
  await launchesDatabase.findOneAndUpdate({
    flightNumber: launch.flightNumber
  }, launch, {
    upsert: true
  })
} 

const getLatestFlightNumber = async () => {
  const latestLaunch = await launchesDatabase
  .findOne()
  .sort('-flightNumber');

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }
 
  return latestLaunch.flightNumber
}

const getAllLaunches = async () => {
  return await launchesDatabase.find({}, {
    '__id': 0, '__v': 0
  })
}

const scheduleNewLaunch = async launch => {
  const newFlightNumber = await getLatestFlightNumber() + 1
 
  const newLaunch = Object.assign(launch,{
      flightNumber: newFlightNumber,
      customer: ['ZTM', 'NASA'],
      success: true,
      upcoming: true
    })

  await saveAllLaunches(newLaunch)
}

const existsLaunchWithId = async launchId => {
  return await launchesDatabase.findOne({
    flightNumber: launchId
  })
}

const abortLaunchWithId = async launchId => {
  const aborted = await launchesDatabase.updateOne({
    flightNumber: launchId
  }, {
    upcoming: false,
    success:false
  })

  return aborted.modifiedCount === 1 
}

saveAllLaunches(launch)

module.exports = {
  getAllLaunches,
  scheduleNewLaunch,
  existsLaunchWithId,
  abortLaunchWithId
}

