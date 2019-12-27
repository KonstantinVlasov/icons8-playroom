<template lang="pug">
  .index-page
    .content
      .header
        img.logo(
          src="/vue-static/playroom/licons-9.png"
        )
        .welcome Привет, {{ user.name }}!
          .logout(@click="logout") logout
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
    },
    logout () {
      console.log('logout')
      window.localStorage.removeItem('playroom.user')
      this.$socket.emit('user:logout', {
        name: this.user.name
      })
      window.location.reload()
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
    padding-bottom: 220px;
    background-image: linear-gradient(to top, #48c6ef 0%, #6f86d6 100%);
  }
  .header {
    display: flex;
    align-items: center;
    height: 60px;
    padding: 0 1.5rem;
  }
  .logo {
    height: 44px;
    fill: white;
    margin-right: 0.5rem;
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
    right: $width-room;
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
  .logout {
    display: inline-block;
    margin-left: 24px;
    font-size: 12px;
    font-weight: 400;
    color: white;
    cursor: pointer;
  }
</style>
