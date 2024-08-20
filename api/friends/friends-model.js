const db = require('../../data/dbConfig')

async function insert(friend) {
    const [id] = await db('friends').insert(friend)
    return db('friends').where({ id }).first()
  }
  
  async function update(friend_id, changes) {
    await db('friends').where({ friend_id }).update(changes)
    return db('friends').where({ friend_id }).first()
  }
  
  function remove(id) {
    return db('friends').where({ id }).delete()
  }
  
  function getAll() {
    return db('friends')
  }
  
  function getById(friend_id) {
    return db('friends').where({ friend_id }).first()
  }



module.exports = {
    insert,
    update,
    remove,
    getAll,
    getById,
}