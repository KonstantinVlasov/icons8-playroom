import io from 'socket.io-client'

import * as types from '../store/mutation.types'

const socket = io()

export default {
  install (Vue, { store }) {
    socket.on('user:info', data => {
      console.log('user:info', data)
      if (data.success) {
        store.commit(types.USER_LOGGED_IN, {
          isGuest: false,
          ...data.user
        })
        store.commit(types.ROOM_LOADED, data.room)
        store.commit(types.CHAT_LOADED, data.chat)
        store.commit(types.SUSPECTS_LOADED, data.suspects)
      }
    })

    Vue.prototype.$socket = socket
    Vue.$socket = socket
  }
}
