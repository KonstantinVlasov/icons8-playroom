const db = require('../database')
const clients = require('./clients')

function appInfo () {
  return db.get('rooms')
    .filter({ private: true })
    .map('name')
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
      info: appInfo()
    })

    client.join('public')
    client.join(data.role)
  })
  client.on('user:logout', data => {
    delete clients[data.name]
  })
}
