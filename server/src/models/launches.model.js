const axios = require('axios')
const launchesDatabase = require('./launches.mongo')
const planets = require('./planets.mongo')

const DEFAULT_FLIGHT_NUMBER = 100

const launch = {
  flightNumber: 100, //flight_number
  mission: 'Kelper Exploration X', //name
  rocket: 'Explorer IS1', // rocket.name
  launchDate: new Date('27 December, 2030'), //date_local
  target: 'Kepler-442 b', //not applicable
  customer: ['ZTM', 'Nasa'], //payload.customers for each payload
  upcoming: true, //upcoming
  success: true //success
}

const saveAllLaunches = async launch => {
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
  const planet = await planets.findOne({
    keplerName: launch.target
  })
  
  if (!planet) {
    throw new Error('Planet not found')
  }
   
  const newLaunch = Object.assign(launch,{
      flightNumber: newFlightNumber,
      customer: ['ZTM', 'NASA'],
      success: true,
      upcoming: true
    })

  await saveAllLaunches(newLaunch)
}

const findLaunch = async filter => {
  return await launchesDatabase.findOne(filter)
}

const existsLaunchWithId = async launchId => {
  return await findLaunch({
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

const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query'

const populateLaunches = async () => {
  const response = await axios.post(SPACEX_API_URL, {
    "query": {},
    "options": {
      "pagination": "fasle",
      "populate": [
        {
          "path": "rocket",
          "select": {
            "name": 1
            }
          },
          {
            "path": "payloads",
            "select": {
              "customers": 1
            }
         }
       ]
    }
 })
 
  if (response.status !== 200) {
    console.log('Error Downloading launches Data')
    throw new Error('Failed to load launches data')
  }
   
  const launchdocs = response.data.docs
  launchdocs.forEach(launchdoc => {

    const payloads = launchdoc['payloads']
    const customers = payloads.flatMap(payload => payload['customers'])

    const launch = {
      flightNumber: launchdoc['flight_number'],
      mission: launchdoc['name'],
      rocket: launchdoc['rocket']['name'],
      launchDate: launchdoc['date_local'],
      upcoming: launchdoc['upcoming'],
      success: launchdoc['success'],
      customers
    }
    
    saveAllLaunches(launch)
  });
}

const loadLaunchesData = async () => {
  console.log('Downloading launches data')

  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: 'Falcon 1',
    mission: 'FalconSat'
  })

  if(firstLaunch) {
    console.log('Database already populated')
  } else {
    await populateLaunches()
  }
}

module.exports = {
  loadLaunchesData,
  getAllLaunches,
  scheduleNewLaunch,
  existsLaunchWithId,
  abortLaunchWithId
}

