const express = require('express')
const Friends = require('../api/friends/friends-model')

const server = express()

server.use(express.json())

server.get('/' , async (req, res) => {
    res.status(200).json({api: 'up'})
})

server.get("/friends", (req, res) => {
    Friends.getAll()
      .then(friends => {
        res.status(200).json(friends);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  
  server.get("/friends/:id", async (req, res) => {
    const friend = await Friends.getById(req.params.id);
    if (!friend) {
      res.json({status: 404 , message: 'friend not found'})
    } else {
      res.json(friend)
    }
  });
  
  server.post("/friends", async (req, res) => {
    const newFriend = await Friends.insert(req.body);
    res.json(newFriend);
  });
  
//   server.delete("/friends/:id", (req, res) => {
//     res.end();
//   });
  
//   server.put("/friends/:id", (req, res) => {
//     res.end();
//   });

module.exports = server 