'use strict'

export default ({ store, redirect, route }) => {
  if (route.path !== '/playroom/login' && store.state.user.isGuest) {
    redirect('/playroom/login')
  }
}
