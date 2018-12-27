<template lang="pug">
  .app-room
    .title {{ room.title || room.id || 'undefined' }} чат
    template(v-if="room")
      message-list(:messages="room.messages")
      send-message(@send="sendMessage")
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'LoginForm',
  props: {
    room: {
      type: Object,
      'default': () => {
        return {}
      }
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.user
    })
  },
  mounted () {
    console.log('mounted')
    this.$socket.on('room:message', data => {
      console.log('room:message data', data)
      if (data.room === this.room.id) {
        this.room.messages.push({ message: data.message, user: data.user })
      }
    })
  },
  methods: {
    sendMessage (message) {
      console.log('send message:', message)
      if (message) {
        this.$socket.emit('room:message', {
          user: this.user,
          room: this.room.id,
          message: message
        })
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/variables.scss';
  .app-room {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
    width: $width-room;
    background: #f2f4f8;
  }
  .title {
    font-size: 24px;
    padding: 1rem;
  }
  .message-list {
    padding: 1rem;
  }
  .send-message {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem 1rem 0.675rem;
    background: #f7f9fd;
    border-top: 1px solid rgba(0,0,0,0.05);
  }
</style>
