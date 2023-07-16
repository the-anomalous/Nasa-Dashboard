const request = require('supertest')
const app = require('../../app')

describe('Test GET /luanches', () => {
  test('It should responed with status 200', async () => {
    const response = await request(app)
      .get('/launches')
      .expect('Content-Type', /json/)
      .expect(200) 
  })
})

describe('Test POST /launches', () => {
  const completeLaunchData = {
    mission: "ZTM-55",
    rocket: "ZTM expirmental",
    target: "Kepler 560",
    launchDate: "March 20, 2030"
  } 

  const launchDataWithoutDate = {
    mission: "ZTM-55",
    rocket: "ZTM expirmental",
    target: "Kepler 560",
  } 

  const launchDataWithInvalidDate = {
    mission: "ZTM-55",
    rocket: "ZTM expirmental",
    target: "Kepler 560",
    launchDate: "zoot"
  } 

  test('It should responed with status 201', async () => {
    const response = await request(app)
      .post('/launches')
      .send(completeLaunchData)
      .expect('Content-Type', /json/)
      .expect(201) 

    const requestDate = new Date(completeLaunchData.launchDate).valueOf()
    const responseDate = new Date(response.body.launchDate).valueOf()

    // testing if requestDate == responseDate
    expect(responseDate).toBe(requestDate)

    expect(response.body).toMatchObject(launchDataWithoutDate)
  })
  
  test('It should catch missing required proporties', async () => { 
    const response = await request(app)
      .post('/launches')
      .send(launchDataWithoutDate)
      .expect('Content-Type', /json/)
      .expect(400)

    expect(response.body).toStrictEqual({
      error: "Missing required launch property"
    })
  })

  test('It should catch invalid dates', async () => {
    const response = await request(app)
      .post('/launches')
      .send(launchDataWithInvalidDate)
      .expect('Content-Type', /json/)
      .expect(400)

    expect(response.body).toStrictEqual({
      error: "Invalid date"
    })
  })
})
