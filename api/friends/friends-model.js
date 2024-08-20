const db = require('../../data/dbConfig')

async function insert(friend) {
    const [id] = await db('friends').insert(friend)
    return db('friends').where({ id }).first()
  }
  
  function getAll() {
    return db('friends')
  }
  
  function getById(friend_id) {
    return db('friends').where({ friend_id }).first()
  }



module.exports = {
    insert,
    getAll,
    getById,
}