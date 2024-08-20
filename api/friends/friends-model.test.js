const Friends = require('./friends-model.js');
const db = require('../../data/dbConfig.js');

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async () => {
  await db('friends').truncate();
})

afterAll(async () => {
  await db.destroy()
})

describe('getAll()' , () => {
  test('get empty list when no friends in db' , async () => {
    const friends = await Friends.getAll()
    expect(friends).toHaveLength(0)
  })
  test('get a list of friends in db' , async () => {
    await db('friends').insert({ friend_name : 'Charles'})
    let friends = await Friends.getAll()
    expect(friends).toHaveLength(1)
    await db('friends').insert({ friend_name : 'Ameyla'})
    friends = await Friends.getAll()
    expect(friends).toHaveLength(2)
  })
})

describe('getById' , () => {
  test('find friend by id' , async () => {
    await db('friends').insert({ friend_name : 'Kirby' })
    const kirby = await Friends.getById(1)
    expect(kirby).toMatchObject({ friend_id: 1 , friend_name: 'Kirby'})
  })
})