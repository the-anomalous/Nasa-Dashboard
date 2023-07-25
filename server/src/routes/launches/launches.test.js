const request = require('supertest')
const app = require('../../app')
const {
  connectMongoDB,
  disconnectMongoDB
} = require('../../services/mongo')

const {loadPlanetsData} = require('../../models/planets.model')

describe('Testing Lauches API', () => {
  beforeAll(async () => {
    await connectMongoDB()
    await loadPlanetsData()
  })

  afterAll(async () => {
    await disconnectMongoDB()
  })
  
  describe('Test GET /launches', () => {
    test('It should responed with status 200', async () => {
      const response = await request(app)
        .get('/v1/launches')
        .expect('Content-Type', /json/)
        .expect(200) 
    })
  })

  describe('Test POST /launches', () => {
    const completeLaunchData = {
      mission: "ZTM-55",
      rocket: "ZTM expirmental",
      target: "Kepler-442 b",
      launchDate: "March 20, 2030"
    } 

    const launchDataWithoutDate = {
      mission: "ZTM-55",
      rocket: "ZTM expirmental",
      target: "Kepler-442 b",
    }  

    const launchDataWithInvalidDate = {
      mission: "ZTM-55",
      rocket: "ZTM expirmental",
      target: "Kepler-442 b",
      launchDate: "zoot"
    } 

    test('It should responed with status 201', async () => {
      const response = await request(app)
        .post('/v1/launches')
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
        .post('/v1/launches')
        .send(launchDataWithoutDate)
        .expect('Content-Type', /json/)
        .expect(400)

      expect(response.body).toStrictEqual({
        error: "Missing required launch property"
      })
    })

    test('It should catch invalid dates', async () => {
      const response = await request(app)
        .post('/v1/launches')
        .send(launchDataWithInvalidDate)
        .expect('Content-Type', /json/)
        .expect(400)

      expect(response.body).toStrictEqual({
        error: "Invalid date"
      })
    })
  })
})

