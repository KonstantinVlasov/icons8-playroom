import Vue from 'vue'
import socket from './socket.io.js'
import icons from './icons.js'

import appEvidences from '../components/appEvidences'
import appRoom from '../components/appRoom'
import appSuspect from '../components/appSuspect'
import appSuspects from '../components/appSuspects'
import loginForm from '../components/loginForm'
import messageList from '../components/messageList'
import sendMessage from '../components/sendMessage'
import stateControl from '../components/stateControl'

export default ({ store }) => {
  Vue.use(socket, { store })
  Vue.use(icons())

  Vue.component('app-evidences', appEvidences)
  Vue.component('app-room', appRoom)
  Vue.component('app-suspect', appSuspect)
  Vue.component('app-suspects', appSuspects)
  Vue.component('login-form', loginForm)
  Vue.component('message-list', messageList)
  Vue.component('send-message', sendMessage)
  Vue.component('state-control', stateControl)
}
