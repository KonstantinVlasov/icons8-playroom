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
    console.log('server.user:login login data', data)

    const user = db.get('users')
      .filter({ login: data.name/* , password: data.password */ }).value()[0]
    console.log('user', user)

    clients[data.name] = {
      'socket': client.id,
      name: data.name,
      password: data.password
    }

    io.to(client.id).emit('user:info', {
      success: true,
      user: user || data,
      room: info(data.role),
      rooms: db.get('rooms'),
      chat: chat(),
      suspects: db.get('suspects'),
      evidences: db.get('evidences'),
      evidences1: db.get('evidences1'),
      gameState: db.get('gameState')
    })

    client.join('public')
    client.join(data.role)
  })
  client.on('user:logout', data => {
    delete clients[data.name]
  })
}
