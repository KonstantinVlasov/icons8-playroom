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
  rooms: [{
    id: 'cia', title: 'Агенты ЦРУ'
  }, {
    id: 'mi6', title: 'Агенты МИ6'
  }, {
    id: 'film', title: 'Съемочая группа'
  }],
  suspects: {},
  evidences: [
    'У убийцы нет кота',
    'У убийцы нетдомашнего паука',
    'У убийцы нет ручной змеи',
    'У убийцы нет собаки',
    'Убийца раньше нигде не работал',
    'Убийца любит сниматься',
    'Убийца не любит фотографироваться',
    'У убийцы есть свой дом',
    'У убийцы дорогая машина',
    'Убийца не любит пить воду',
    'Убийца любит петь',
    'Убийца умееет стрелять',
    'Убийца не сидел в тюрьме',
    'Убийца любит играть в карты',
    'У убийцы нет братьев/сестер',
    'У убийцы нет жены/мужа',
    'Убийца любит флиртовать'
  ],
  gameState: {
    title: 'Знакомство',
    room: 'public',
    content: 'suspects'
  },
  gameStates: {
    1: {
      title: 'Знакомство',
      room: 'public',
      content: 'suspects'
    },
    2: {
      title: 'Конкурс саундтреков',
      room: 'public',
      content: 'suspects'
    },
    3: {
      title: 'Допросы',
      room: 'private',
      content: 'suspects'
    },
    4: {
      title: 'Конкурс по картинке',
      room: 'public',
      content: 'movie-picture'
    },
    5: {
      title: 'Допросы',
      room: 'private',
      content: 'suspects'
    },
    6: {
      title: 'Конкурс на П',
      room: 'public',
      content: 'suspects'
    },
    7: {
      title: 'Допросы',
      room: 'private',
      content: 'suspects'
    },
    8: {
      title: 'Конкурс иконок',
      room: 'public',
      content: 'suspects'
    },
    9: {
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
  [types.ROOMS_LOADED] (state, rooms) {
    state.rooms = rooms
  },
  [types.SUSPECTS_LOADED] (state, suspects) {
    state.suspects = suspects
  },
  [types.SUSPECTS_LOADED] (state, suspects) {
    state.suspects = suspects
  },
  [types.CHAT_LOADED] (state, chat) {
    state.chat = chat
  },
  [types.ROOM_LOADED] (state, room) {
    state.room = room
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
  }
}

const store = () => new Vuex.Store({
  state,
  mutations
})

export default store
