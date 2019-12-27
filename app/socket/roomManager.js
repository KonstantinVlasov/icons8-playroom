const db = require('../database')

const evidences = db.get('evidences').value()

module.exports = (client, io) => {
  client.on('room:message', data => {
    console.log('server.room:message')
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
    console.log('server.room:note')
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

  client.on('room:evidence', data => {
    console.log('server.room:evidence')
    console.log('evidence: ' + data.evidence)
    console.log('room: ' + data.room)
    db.get('rooms')
      .find({ id: data.room })
      .get('evidences')
      .push(data.evidence)
      .write()
    io.to(data.room).emit('room:evidence', { evidence: data.evidence, room: data.room })
  })

  client.on('room:evidences', data => {
    console.log('server.room:evidence', data)
    data.rooms.forEach(obj => {
      const room = db.get('rooms')
        .find({ id: obj.id })
        .value()
      const start = room.evidences.length
      const nextEvidences = evidences.slice(start, start + obj.amount)
      db.get('rooms')
        .find({ id: obj.id })
        .get('evidences')
        .push(...nextEvidences)
        .write()
      console.log('obj.id', obj.id)
      io.to(obj.id).emit('room:evidences', { evidences: nextEvidences, room: obj.id })
    })
  })

  client.on('room:evidence:check', data => {
    console.log('server.room:evidence:check', data)
    db.get('rooms')
      .find({ id: data.room })
      .get('evidences')
      .find({ id: data.evidence })
      .assign({ [`${data.room}checked`]: data.checked })
      .write()
    io.to(data.room).emit('room:evidence:check', {
      room: data.room,
      evidence: data.evidence,
      checked: data.checked
    })
  })

  client.on('game:state', data => {
    console.log('server.game:state')
    console.log('title: ' + data.title)
    console.log('room: ' + data.title)
    db.set('gameState', data).write()
    io.emit('game:state', data)
  })
}
