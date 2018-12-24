const db = require('./database')

const clients = require('./socket/clients')
const roomManager = require('./socket/roomManager')
const userManager = require('./socket/userManager')

module.exports = (io) => {
  return function (client) {
    console.log('a user connected')
    userManager(client, io)

    client.on('disconnect', () => {
      console.log('user disconnected')
      Object.values(clients).some(user => {
        if (user.socket === client.id) {
          delete clients[user.name]
        }
      })
    })

    // public chat
    client.on('chat:message', data => {
      console.log('message: ' + data.message)
      io.emit('chat:message', data.message)
    })

    roomManager(client, io)
  }
}
