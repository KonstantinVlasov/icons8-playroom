const db = require('../database')
const clients = require('./clients')

module.exports = (client, io) => {
  client.on('room:message', data => {
    console.log('message: ' + data)
    console.log('room: ' + data.room)
    io.to(data.room).emit('room:message', data)
  })
}
