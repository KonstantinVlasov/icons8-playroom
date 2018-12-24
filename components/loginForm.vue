<template lang="pug">
  .login-form
    form(@submit.prevent="login")
      input(v-model="user.name" placeholder="Name")
      select(v-model="user.role")
        option(v-for="option in rooms" :value="option.id") {{ option.title }}
      //input(v-model="user.password" type="password" placeholder="Password")
      button login
</template>

<script>
export default {
  name: 'LoginForm',
  data () {
    return {
      user: {
        name: undefined,
        // password: undefined,
        role: undefined
      },
      rooms: [{
        id: 'film', title: 'Film Crew'
      }, {
        id: 'cia', title: 'CIA Agents'
      }, {
        id: 'mi6', title: 'MI6 Agents'
      }]
    }
  },
  mounted () {
    try {
      const user = JSON.parse(window.localStorage.getItem('playroom.user'))
      this.user.name = user.name
      this.user.role = user.role
    } catch {
      window.localStorage.removeItem('playroom.user')
    }
  },
  methods: {
    login () {
      this.$socket.emit('user:login', {
        name: this.user.name,
        role: this.user.role,
        password: this.user.password
      })
      window.localStorage.setItem('playroom.user', JSON.stringify({
        name: this.user.name,
        role: this.user.role
      }))
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
