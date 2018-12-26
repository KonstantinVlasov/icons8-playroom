<template lang="pug">
  .app-suspects
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
  name: 'WorkflowSelector',
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
    console.log('mounted')
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
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    justify-content: space-between;
  }
</style>
