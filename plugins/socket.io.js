import io from 'socket.io-client'

const socket = io()
console.log('socket!!!', socket)

export default {
  install (Vue) {
    console.log('socket', socket)
    Vue.prototype.$socket = socket
    Vue.$socket = socket
  }
}
