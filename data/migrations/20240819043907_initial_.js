exports.up = function(knex) {
    return knex.schema
        .createTable('friends' , tbl => {
            tbl.increments('friend_id')
            tbl.string('friend_name' , 128)
            .notNullable()
        })
  
};


exports.down = function(knex) {
  return knex.schema.dropTableIfExists('friends')
};
