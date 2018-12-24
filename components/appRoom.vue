<template lang="pug">
  .app-room
    p {{ title || id || 'undefined' }}
    template(v-if="id")
      ul.messages
        li(v-for="message in messages") {{ message }}
      form.message-form(@submit.prevent="sendMessage")
        input(v-model="message" placeholder="message")
        button send
</template>

<script>
export default {
  name: 'LoginForm',
  props: {
    id: {
      type: String,
      'default': undefined
    },
    title: {
      type: String,
      'default': undefined
    }
  },
  data () {
    return {
      message: '',
      messages: []
    }
  },
  mounted () {
    console.log('mounted')
    this.$socket.on('room:message', data => {
      console.log('data', data)
      if (data.room === this.id) {
        this.messages.push(data.message)
      }
    })
  },
  methods: {
    sendMessage () {
      console.log('send message:', this.message)
      if (this.message) {
        this.$socket.emit('room:message', {
          user: this.user,
          room: this.id,
          message: this.message
        })
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
