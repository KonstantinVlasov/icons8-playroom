const db = require('../database')

module.exports = (client, io) => {
  client.on('room:message', data => {
    console.log('room:message')
    console.log('message: ' + data.message)
    console.log('user: ' + data.user)
    console.log('room: ' + data.room)
    const message = { message: data.message, user: data.user.name }
    db.get('rooms')
      .find({ id: data.room })
      .get('messages')
      .push(message)
      .write()
    io.to(data.room).emit('room:message', { ...message, room: data.room })
  })

  client.on('room:note', data => {
    console.log('room:note')
    console.log('message: ' + data.message)
    console.log('user: ' + data.user.name)
    console.log('room: ' + data.room)
    console.log('suspect: ' + data.suspect)
    const message = { message: data.message, user: data.user.name, suspect: data.suspect }
    db.get('rooms')
      .find({ id: data.room })
      .get('suspects')
      .push(message)
      .write()
    io.to(data.room).emit('room:note', { ...message, room: data.room })
  })
}
