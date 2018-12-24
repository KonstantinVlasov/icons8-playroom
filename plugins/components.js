import Vue from 'vue'
import socket from './socket.io.js'

import appRoom from '../components/appRoom'
import loginForm from '../components/loginForm'

export default ({ store }) => {
  Vue.use(socket, { store })

  Vue.component('app-room', appRoom)
  Vue.component('login-form', loginForm)
}
