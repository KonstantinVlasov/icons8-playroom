<template lang="pug">
  .app-suspects
    app-suspect
      app-evidences
    app-suspect(
      v-for="suspect in suspects"
      :key="suspect.id"
      :suspect="suspect"
      :room="room"
    )
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
    columns: 300px;
    column-gap: 20px;
    padding: 0 1.5rem;
  }
</style>
