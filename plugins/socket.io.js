import io from 'socket.io-client'

import * as types from '../store/mutation.types'

const socket = io.connect({ path: '/playroom/socket.io' })

export default {
  install (Vue, { store, redirect }) {
    socket.on('user:info', data => {
      console.log('!!!!!!')
      console.log('client.user:info', data)
      if (data.success) {
        store.commit(types.USER_LOGGED_IN, {
          isGuest: false,
          ...data.user
        })
        store.commit(types.ROOM_LOADED, data.room)
        store.commit(types.CHAT_LOADED, data.chat)
        store.commit(types.ROOMS_LOADED, data.rooms)
        store.commit(types.SUSPECTS_LOADED, data.suspects)
        store.commit(types.EVIDENCES_LOADED, data.evidences)
        store.commit(types.EVIDENCES1_LOADED, data.evidences1)
        store.commit(types.GAME_STATE_CHANGED, data.gameState)
      } else {
        window.localStorage.setItem('playroom.user', undefined)
        redirect('/playroom/login')
      }
    })

    socket.on('room:evidence', data => {
      console.log('client.room:evidence', data)
      store.commit(types.EVIDENCE_ADDED, data)
    })

    socket.on('game:state', data => {
      console.log('client.game:state', data)
      store.commit(types.GAME_STATE_CHANGED, data)
    })

    Vue.prototype.$socket = socket
    Vue.$socket = socket
  }
}
