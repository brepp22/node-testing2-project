const request = require('supertest')
const db = require('../data/dbConfig')
const server = require('./server.js')

const Elleanor = { friend_name : 'Elleanor'}
const Kirby = { friend_name : 'Kirby' }

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

describe('[GET]' , () => {
    test('should return 200 ok', () => {
        return request(server)
        .get('/')
        .then( res => {
            expect(res.status).toBe(200)
        })
    })
    test('should return json' , async () => {
        const res = await request(server).get('/')
        expect(res.type).toBe('application/json')
    })
    test('should return { api: "up" }' , async () => {
        const res = await request(server).get('/')
        expect(res.body).toEqual({ api: 'up'})
    })
})

describe('[GET] friends', () => {
    test('return 200 ok' , async () =>{
        const res = await request(server).get('/friends')
        expect(res.status).toBe(200)
    })
    test('respond with empty array if no friends' , async () => {
        const res = await request(server).get('/friends')
        expect(res.body).toHaveLength(0)
    })
    test('respond with friends if friends' , async () => {
        await db('friends').insert(Elleanor)
        let res = await request(server).get('/friends')
        expect(res.body).toHaveLength(1)
        await db('friends').insert(Kirby)
        res = await request(server).get('/friends')
        expect(res.body).toHaveLength(2)
    })
})

describe('[GET] friends by id' , () => {
    test('responds with friend with given id' , async () => {
        await db('friends').insert(Elleanor)
        let res = await request(server).get('/friends/1')
        expect(res.body).toMatchObject(Elleanor)
    })
    test('responds with 404 if not found in db' , async () => {
        const response = await request(server).get('/friends/5')
        expect(response.status).toBe(404)
    })
})



