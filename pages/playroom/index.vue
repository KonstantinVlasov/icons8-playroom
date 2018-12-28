<template lang="pug">
  .index-page
    .content
      .header
        .logo(v-html="$icons.logo")
        .logo-title Icons8 Playroom
        .welcome Привет {{ user.name }}!
      img.movie-picture(
        v-if="gameState.content === 'movie-picture'"
        src="/vue-static/playroom/movie-picture.jpg"
      )
      .final-preview(v-if="gameState.content === 'final'")
        img(:src="currentFinal")
      app-suspects(
        v-if="gameState.content === 'suspects'"
        :room="room"
      )
    state-control(v-if="user.isAdmin")
    app-room.is-public(
      v-if="gameState.room === 'public'"
      :room="chat"
    )
    app-room.is-private(
      v-if="gameState.room === 'private'"
      :room="room"
    )
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'IndexPage',
  data () {
    return {
      final: ['01.jpg', '02.jpg'],
      currentIndex: 0,
      isFinal: false
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
      chat: (state) => state.chat,
      room: (state) => state.room,
      gameState: (state) => state.gameState
    }),
    currentFinal () {
      return `/vue-static/playroom/final/${this.final[this.currentIndex]}`
    }
  },
  watch: {
    user () {
      console.log('this.user', this.user)
    }
  },
  mounted () {
    console.log('user login')
    if (this.user.isGuest) {
      const user = JSON.parse(window.localStorage.getItem('playroom.user'))
      if (user && user.name) {
        this.$socket.emit('user:login', {
          name: user.name,
          role: user.role,
          password: user.password
        })
      }
    }
    this.nextSlide()
  },
  methods: {
    nextSlide () {
      setTimeout(() => {
        this.currentIndex++
        if (this.currentIndex >= this.final.length) {
          this.currentIndex = 0
        }
        this.nextSlide()
      }, 250)
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
    padding: 0 1.5rem;
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
  .welcome {
    flex: 1;
    text-align: right;
    font-weight: 400;
    color: white;
  }
  .message-form {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 4px;
  }
  .state-control {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
  }
  .movie-picture {
    width: 100%;
  }
  .final-preview {
    padding-top: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      border-radius: 2rem;
    }
  }
</style>
