<template lang="pug">
  .login-form
    form(@submit.prevent="login")
      .title Hello friend!
      .desc Пожалуйста, введите полное имя и фамилию для удобства других игроков
      .item
        input(
          autofocus
          v-model="user.name" placeholder=""
          :class="{'is-error': emptyName}"
        )
      //.item
        select(v-model="user.role")
          option(v-for="option in rooms" :value="option.id") {{ option.title }}
      //.item
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
      },
      emptyName: false
    }
  },
  computed: {
    ...mapState({
      rooms: (state) => state.rooms
    })
  },
  mounted () {
    try {
      const user = JSON.parse(window.localStorage.getItem('licons9.user'))
      this.user.name = user.name
      this.user.role = user.role
      this.user.password = user.password
    } catch {
      window.localStorage.removeItem('licons9.user')
    }
  },
  methods: {
    login () {
      if (!this.user.name) {
        this.emptyName = true
        return
      }
      this.$socket.emit('user:login', {
        name: this.user.name,
        role: this.user.role,
        password: this.user.password
      })
      window.localStorage.setItem('licons9.user', JSON.stringify({
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
    padding: 2rem 2rem 1rem;
    background: white;
    border-radius: 1rem;
    box-shadow: 0 12px 40px -8px rgba(0,0,0,0.2);
  }
  .title {
    font-size: 20px;
    font-weight: 400;
  }
  .desc {
    font-weight: 400;
    font-size: 14px;
  }
  .item {
    margin-bottom: 1rem;
  }
  input {
    width: 100%;
    height: 48px;
    margin: 0 0 8px;
    border: none;
    border-bottom: 1px solid $color-main;
    font-size: 18px;

    &:focus {
      outline: none;
      border-bottom: 1px solid $color-main;
    }
    &.is-error {
      border-bottom: 2px solid #e33100;
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
    border-radius: 0.5rem;
  }
</style>
