<template lang="pug">
  .index-page
    .content
      .header
        .logo(v-html="$icons.logo")
        .logo-title Icons8 Playroom
      app-suspects(:room="room")
    workflow-selector
    app-room.is-public(
      v-if="workflow === 'public'"
      :room="chat"
    )
    app-room.is-private(
      v-if="workflow === 'private'"
      :room="room"
    )
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'IndexPage',
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
      chat: (state) => state.chat,
      room: (state) => state.room,
      workflow: (state) => state.workflow
    })
  },
  watch: {
    user () {
      console.log('this.user', this.user)
    }
  },
  mounted () {
    console.log('user login')
    const user = JSON.parse(window.localStorage.getItem('playroom.user'))
    if (user.name) {
      this.$socket.emit('user:login', {
        name: user.name,
        role: user.role
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/variables';
  .content {
    position: absolute;
    top: 0;
    left: 0;
    right: $width-room;
    bottom: 0;
    overflow-y: auto;
    background: linear-gradient(135deg, #fcc419, #ffe066);
  }
  .header {
    display: flex;
    align-items: center;
    height: 56px;
    padding: 0 1rem;
  }
  .logo {
    width: 30px;
    height: 30px;
    fill: white;
    margin-right: 0.5rem;
  }
  .logo-title {
    font-size: 18px;
    font-weight: 400;
    color: white;
  }
  .message-form {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 4px;
  }
  .workflow-selector {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
  }
</style>
