const fs = require('fs');
const path = require('path') 
const { parse } = require('csv-parse');
const planets = require('./planets.mongo')

// const habitablePlanets = [];

const isPlanetHabitable = data => {
  return data['koi_disposition'] = 'CONFIRMED'
    && data['koi_insol'] > 0.36 && data['koi_insol'] < 1.11
    && data['koi_prad'] < 1.6
    && data['kepler_name'] !== ''
  }

const savePlantes = async (data) => {
  try {
    return await planets.updateOne({
      keplerName: data.kepler_name
    }, {
      keplerName: data.kepler_name
    }, {
      upsert: true
    })
  } catch (err) {
    console.error(`Planets not saved ${err}`);    
  } 
}

const getHabitablePlanets = async () => {
  return await planets.find({})
}

const loadPlanetsData = () => {
  return (
    new Promise((resolve, reject) => { 
    fs.createReadStream(path.join(__dirname, '..','data', 'kepler_data.csv'))
      .pipe(parse({
        comment: '#',
        columns: true
      }))
      .on('data', data => {
        if (isPlanetHabitable(data)) {
          // habitablePlanets.push(data)
          savePlantes(data)  
        }
      })
      .on('error', err => {
        console.log(err);
        reject(err)
      })
      .on('end', async () => {
        const planetscount = (await getHabitablePlanets()).length
        console.log(`done processing, ${planetscount} planets found!!`);
        resolve()
    })
  }))
}

module.exports = {
  loadPlanetsData,
  getHabitablePlanets
}
