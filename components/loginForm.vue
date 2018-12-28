<template lang="pug">
  .login-form
    form(@submit.prevent="login")
      .item
        input(v-model="user.name" placeholder="Name")
      .item
        select(v-model="user.role")
          option(v-for="option in rooms" :value="option.id") {{ option.title }}
      .item
        input(v-model="user.password" type="password" placeholder="Password")
      .item
        button.button Login
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'LoginForm',
  data () {
    return {
      user: {
        name: undefined,
        password: undefined,
        role: undefined
      }
    }
  },
  computed: {
    ...mapState({
      rooms: (state) => state.rooms
    })
  },
  mounted () {
    try {
      const user = JSON.parse(window.localStorage.getItem('playroom.user'))
      this.user.name = user.name
      this.user.role = user.role
      this.user.password = user.password
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
        role: this.user.role,
        password: this.user.password
      }))
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/variables';
  .login-form {
    padding: 1rem 2rem;
    background: white;
    border-radius: 1rem;
    box-shadow: 0 12px 40px -8px rgba(0,0,0,0.2);
  }
  .item {
    margin-bottom: 1rem;
  }
  input {
    width: 100%;
    height: 48px;
    margin: 8px 0;
    border: none;
    border-bottom: 1px solid #555;
    font-size: 18px;

    &:focus {
      outline: none;
      border-bottom: 1px solid $color-main;
    }
  }
  select {
    width: 100%;
    height: 48px;
    margin: 8px 0;
    border: none;
    border-bottom: 1px solid #555;
    font-size: 18px;

    &:focus {
      outline: none;
      border-bottom: 1px solid $color-main;
    }
  }
  .button {
    width: 100%;
    border-radius: 1.5rem;
  }
</style>
