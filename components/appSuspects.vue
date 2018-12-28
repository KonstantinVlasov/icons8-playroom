<template lang="pug">
  .app-suspects
    app-suspect
      app-evidences(:room="room")
    app-suspect(
      v-for="suspect in suspects"
      :key="suspect.id"
      :suspect="suspect"
      :room="room"
    )
    app-suspect.is-empty
    app-suspect.is-empty
    app-suspect.is-empty
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AppSuspects',
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
      suspects: (state) => state.suspects
    })
  },
  mounted () {
    console.log('mounted AppSuspects')
    this.$socket.on('room:note', data => {
      console.log('room:note data', data)
      if (data.room === this.room.id) {
        this.room.suspects.push({ message: data.message, user: data.user, suspect: data.suspect })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  .app-suspects {
    columns: 280px;
    column-fill: auto;
    column-gap: 24px;
    padding: 0 1.5rem;
  }
</style>
