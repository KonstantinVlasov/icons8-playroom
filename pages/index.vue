<template lang="pug">
  .index-page
    h1 hello {{ user }}
    app-room(:id="'public'" :title="'Public'")
    app-room(:id="user.room.id" :title="user.room.title")
    login-form
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'IndexPage',
  data () {
    return {
      message: '',
      messages: []
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.user
    })
  },
  watch: {
    user () {
      console.log('this.user', this.user)
    }
  },
  mounted () {
    this.$socket.on('chat:message', msg => {
      this.messages.push(msg)
    })
  },
  methods: {
    sendMessage () {
      console.log('send text:', this.message)
      if (this.message) {
        this.$socket.emit('chat:message', {
          user: this.user,
          message: this.message
        })
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
  .message-form {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 4px;
  }
</style>
