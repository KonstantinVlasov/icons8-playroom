'use strict'

import Vue from 'vue'

export default ({ store, redirect, route }) => {
  if (route.path !== '/playroom/login' && store.state.user.isGuest) {
    const user = JSON.parse(window.localStorage.getItem('playroom.user'))
    console.log('middleware auth user', user)
    if (user && user.name) {
      Vue.$socket.emit('user:login', {
        name: user.name,
        role: user.role,
        password: user.password
      })
    } else {
      redirect('/playroom/login')
    }
  }
}
