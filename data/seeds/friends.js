
exports.seed =  function(knex) {
 return knex('friends').insert([
    {friend_name: 'Elleanor'},
    {friend_name: 'Andrew'},
    {friend_name: 'Franklin'},
 
  ])
}
