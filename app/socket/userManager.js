const db = require('../database')
const clients = require('./clients')

function info (role) {
  return db.get('rooms')
    .filter({ id: role }).value()[0]
}
function chat () {
  return db.get('rooms')
    .filter({ id: 'public' }).value()[0]
}

module.exports = (client, io) => {
  client.on('user:login', data => {
    console.log('login data', data)
    clients[data.name] = {
      'socket': client.id,
      name: data.name,
      password: data.password
    }

    io.to(client.id).emit('user:info', {
      success: true,
      user: data,
      room: info(data.role),
      chat: chat(),
      suspects: db.get('suspects')
    })

    client.join('public')
    client.join(data.role)
  })
  client.on('user:logout', data => {
    delete clients[data.name]
  })
}
