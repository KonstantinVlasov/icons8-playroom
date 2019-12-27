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
function getRooms () {
  return db.get('rooms')
    .filter({ private: true }).value()
}
function addUserToRoom (room, user) {
  console.log('users from', room, db.get('rooms')
    .find({ id: room.id })
    .get('users').value())

  db.get('rooms')
    .find({ id: room.id })
    .get('users')
    .push(user)
    .write()
}

module.exports = (client, io) => {
  client.on('user:login', data => {
    data.login = data.name
    console.log('server.user:login login data', data)

    let user = db.get('users')
      .find({ login: data.name }).value()
    console.log('user', user)

    if (!user) {
      db.get('users')
        .push(data)
        .write()
      user = data
    }

    if (!user.room) {
      if (clients[data.name]) {
        user.room = clients[data.name].room
        console.log('clients user', user)
      }

      if (!user.room) {
        const rooms = getRooms()
        console.log('rooms', rooms)

        const roomsUsers = [...rooms.map(room => room.users.length)]
        let lowestRoom = rooms[roomsUsers.indexOf(Math.min(...roomsUsers))]
        user.room = lowestRoom.id

        if (!lowestRoom.users.find(obj => obj.login === user.login)) {
          addUserToRoom(lowestRoom, user)
        }
        console.log('lowestRoom', lowestRoom)
      }
      db.get('users')
        .find({ login: data.name })
        .assign({ room: user.room })
        .write()
    }

    const userRoom = db.get('rooms').find({ id: user.room }).value()
    if (!userRoom.users.find(obj => obj.login === user.login)) {
      addUserToRoom(userRoom, user)
    }

    clients[data.name] = {
      'socket': client.id,
      name: data.name,
      room: user.room,
      password: data.password
    }

    io.to(client.id).emit('user:info', {
      success: true,
      user: user,
      users: db.get('users'),
      room: db.get('rooms').find({ id: user.room }).value(),
      rooms: db.get('rooms'),
      chat: chat(),
      suspects: db.get('suspects'),
      evidences: db.get('evidences'),
      evidences1: db.get('evidences1'),
      gameState: db.get('gameState')
    })

    client.join('public')
    client.join(user.room)
  })
  client.on('user:logout', data => {
    delete clients[data.name]
  })
}
