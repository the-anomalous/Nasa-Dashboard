const fs = require('fs');
const path = require('path') 
const { parse } = require('csv-parse');

const habitablePlanets = [];

const isPlanetHabitable = data => {
  return data['koi_disposition'] = 'CONFIRMED'
    && data['koi_insol'] > 0.36 && data['koi_insol'] < 1.11
    && data['koi_prad'] < 1.6
    && data['kepler_name'] !== ''
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
          habitablePlanets.push(data)
        }
      })
      .on('error', err => {
        console.log(err);
        reject(err)
      })
      .on('end', () => {
        console.log('done processing');
        resolve()
    })
  }))
}

const getHabitablePlanets = () => {
  return habitablePlanets
}

module.exports = {
  loadPlanetsData,
  getHabitablePlanets
}
