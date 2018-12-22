import Vue from 'vue'
import socket from './socket.io.js'

export default () => {
  Vue.use(socket)
}
