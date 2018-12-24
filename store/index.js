'use strict'

import Vuex from 'vuex'
import * as types from './mutation.types'

const state = () => ({
  user: {
    isGuest: true,
    loaded: false,
    name: '',
    room: {
      id: undefined,
      title: undefined
    }
  }
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
  }
}

const store = () => new Vuex.Store({
  state,
  mutations
})

export default store
