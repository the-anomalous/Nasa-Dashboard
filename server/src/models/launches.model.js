const launches = new Map()

let latestFlightNumber = 100

const launch = {
  flightNumber: 100,
  mission: 'Kelper Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('27 December, 2030'),
  target: 'Kepler-422 b',
  customer: ['ZTM', 'Nasa'],
  upcoming: true,
  success: true
}

launches.set(launch.flightNumber, launch)

const getAllLaunches = () => Array.from(launches.values())

const addNewLaunch = launch => {
  latestFlightNumber++
  
  launches.set(latestFlightNumber, 
    Object.assign(launch,{
      flightNumber: latestFlightNumber,
      customer: ['ZTM', 'NASA'],
      success: true,
      upcoming: true
    }))
}

const existsLaunchWithId = launchId => {
  return launches.has(launchId)
}

const abortLaunchWithId = launchId => {
  const aborted = launches.get(launchId)
  aborted.upcoming = false
  aborted.success = false
  return aborted
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
  existsLaunchWithId,
  abortLaunchWithId
}

