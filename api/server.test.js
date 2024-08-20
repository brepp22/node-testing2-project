const request = require('supertest')
const db = require('../data/dbConfig')
const server = require('./server.js')

beforeAll(async () => {
    await db.migrate.rollback() 
    await db.migrate.latest()
  })
  beforeEach(async () => {
    await db('friends').truncate()
  })
  afterAll(async () => {
    await db.destroy()
  })

  describe('sanity check' , () => {
    test('environment is testing' , () => {
        expect(process.env.NODE_ENV).toBe('testing')
    })
})

