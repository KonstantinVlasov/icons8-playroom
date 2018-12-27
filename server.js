const express = require('express')
const app = express()
const http = require('http').Server(app)
const { Nuxt, Builder } = require('nuxt')
const io = require('socket.io')(http, { path: '/playroom/socket.io' })
const socket = require('./app/socket')

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

io.on('connection', socket(io))

http.listen(3050, function () {
  console.log('listening on *:3050')
})
