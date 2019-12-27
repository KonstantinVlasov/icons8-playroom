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
  users: [],
  chat: {
    id: undefined,
    title: undefined
  },
  room: {
    id: undefined,
    title: undefined,
    evidences: []
  },
  rooms: [{
    id: 'team1', title: 'Отдел Зайчата', evidences: []
  }, {
    id: 'team2', title: 'Отдел Пиу-пиу', evidences: []
  }, {
    id: 'team3', title: 'Отдел Пуньк', evidences: []
  }],
  suspects: {},
  evidences: undefined,
  evidences1: undefined,
  gameState: {
    title: 'Знакомство',
    room: 'private',
    content: 'suspects'
  },
  gameStates: {
    1: {
      title: 'Знакомство',
      room: 'public',
      content: 'suspects'
    },
    3: {
      title: 'Допросы',
      room: 'private',
      content: 'suspects'
    },
    10: {
      title: 'Финал',
      room: 'public',
      content: 'final'
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
  },
  [types.GAME_STATE_CHANGED] (state, gameState) {
    state.gameState = gameState
  },
  [types.USERS_LOADED] (state, users) {
    state.users = users
  },
  [types.ROOMS_LOADED] (state, rooms) {
    state.rooms = rooms
  },
  [types.SUSPECTS_LOADED] (state, suspects) {
    state.suspects = suspects
  },
  [types.EVIDENCES_LOADED] (state, evidences) {
    state.evidences = evidences
  },
  [types.EVIDENCES1_LOADED] (state, evidences) {
    state.evidences1 = evidences
  },
  [types.CHAT_LOADED] (state, chat) {
    state.chat = chat
  },
  [types.ROOM_LOADED] (state, room) {
    state.room = room
  },
  [types.EVIDENCE_CHECKED] (state, data) {
    console.log('EVIDENCE_CHECKED', data)
    const evidence = state.room.evidences.find(evidence => evidence.id === data.evidence)
    evidence[`${data.room}checked`] = data.checked
  },
  [types.EVIDENCE_ADDED] (state, data) {
    const room = state.rooms.find(room => room.id === data.room)
    if (room) {
      room.evidences.push(data.evidence)
    }
    console.log('data.room', data.room)
    console.log('state.room.id', state.room.id)
    if (data.room === state.room.id) {
      state.room.evidences.push(data.evidence)
    }
  },
  [types.NEW_EVIDENCES_ADDED] (state, data) {
    const room = state.rooms.find(room => room.id === data.room)
    if (room) {
      room.evidences.push(...data.evidences.map(evidence => {
        return { ...evidence, isNew: true }
      }))
    }
    console.log('data.room', data.room)
    console.log('state.room.id', state.room.id)
    if (data.room === state.room.id) {
      state.room.evidences.push(...data.evidences)
    }
  }
}

const store = () => new Vuex.Store({
  state,
  mutations
})

export default store
