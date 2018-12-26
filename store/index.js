'use strict'

import Vuex from 'vuex'
import * as types from './mutation.types'

const state = () => ({
  workflow: 'public',
  user: {
    isGuest: true,
    isAdmin: false,
    loaded: false,
    name: '',
    chat: undefined
  },
  chat: {
    id: undefined,
    title: undefined
  },
  room: {
    id: undefined,
    title: undefined
  },
  suspects: {}
})

const mutations = {
  [types.USER_LOGGED_IN] (state, user) {
    user.loaded = true
    if (!user.room) {
      user.room = {
        id: undefined,
        title: undefined
      }
    }
    state.user = user
  },
  [types.USER_LOGGED_OUT] (state) {
    state.user = {
      isGuest: true,
      loaded: true,
      room: {
        id: undefined,
        title: undefined
      }
    }
  },
  [types.WORKFLOW_CHANGED] (state, workflow) {
    state.workflow = workflow
  },
  [types.SUSPECTS_LOADED] (state, suspects) {
    state.suspects = suspects
  },
  [types.CHAT_LOADED] (state, chat) {
    state.chat = chat
  },
  [types.ROOM_LOADED] (state, room) {
    state.room = room
  }
}

const store = () => new Vuex.Store({
  state,
  mutations
})

export default store
