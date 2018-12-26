'use strict'

export default ({ store, redirect, route }) => {
  if (route.path !== '/login' && store.state.user.isGuest) {
    // redirect('/login')
  }
}
