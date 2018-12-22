<template lang="pug">
  .index-page
    h1 hello
    ul.messages
      li(v-for="message in messages") {{ message }}
    form.message-form(@submit.prevent="sendMessage")
      input(v-model="message")
      button send
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      message: '',
      messages: []
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
        this.$socket.emit('chat message', this.message)
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
