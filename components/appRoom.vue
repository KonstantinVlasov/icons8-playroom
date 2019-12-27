<template lang="pug">
  .app-room
    .title {{ room.title || room.id || 'undefined' }}
    .description(v-if="room.id === 'public'") Это общий чат, сообщения видны всем участникам игры
    .description(v-if="room.id !== 'public'") Это <b>приватный</b> чат, сообщения видны только вашей команде
    .users Команда:
      .user(v-for="user in roomUsers") {{ user.name }}
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
      user: (state) => state.user,
      users: (state) => state.users
    }),
    roomUsers () {
      return this.users.filter(user => user.room === this.room.id)
    }
  },
  mounted () {
    console.log('mounted')
    this.$socket.on('room:message', data => {
      console.log('room:message data', data)
      if (data.room === this.room.id) {
        this.room.messages.push({ message: data.message, user: data.user })
        console.log('this.$el', this.$el)
        this.$el.scrollTop = this.$el.scrollHeight + 60
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
    overflow-y: scroll;
    width: $width-room;
    padding-bottom: 120px;
    background: #f2f4f8;
  }
  .title {
    font-size: 24px;
    padding: 1rem;
  }
  .description {
    padding: 0 1rem 1rem;
    b {
      font-weight: 600;
    }
  }
  .users {
    padding: 0 1rem 1rem;
    font-size: 14px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
  .message-list {
    padding: 1rem;
  }
  .send-message {
    position: fixed;
    bottom: 0;
    right: 0;
    width: $width-room;
    padding: 1rem 1rem 0.675rem;
    background: #f7f9fd;
    border-top: 1px solid rgba(0,0,0,0.05);
  }
</style>
