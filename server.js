const express = require('express')
const app = express()
const http = require('http').Server(app)
const { Nuxt, Builder } = require('nuxt')
const io = require('socket.io')(http)
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('data.json')
const data = low(adapter)

data.defaults({ user: {}, rooms: {} })

app.get('/api', function (req, res) {
  res.send('<h1>Hello world</h1>')
})

let config = require('./nuxt.config.js')
config.dev = (process.env.NODE_ENV !== 'production')

let nuxt = new Nuxt(config)

// Start build process (only in development)
if (config.dev) {
  new Builder(nuxt).build()
}

app.use(express.static('static'))

app.use(nuxt.render)

io.on('connection', function (socket) {
  console.log('a user connected')
  socket.on('disconnect', function () {
    console.log('user disconnected')
  })
  socket.on('chat:message', function (msg) {
    console.log('message: ' + msg)
    io.emit('chat:message', msg)
  })
})

http.listen(3050, function () {
  console.log('listening on *:3050')
})
