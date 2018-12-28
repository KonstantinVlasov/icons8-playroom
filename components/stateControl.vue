<template lang="pug">
  .state-control
    .title Control panel
    | Current state: {{ gameState }}
    br
    select(v-model="state")
      option(v-for="(option, i) in gameStates" :value="i") {{ option.title }}
    = ' '
    .button(@click="activateState") Activate state
    br
    br
    select(v-model="evidence")
      option(v-for="option in filteredEvidences" :value="option") {{ option }}
    br
    select(v-model="room")
      option(v-for="option in rooms" :value="option.id") {{ option.title }}
    = ' '
    .button(@click="sendEvidence") Send Evidence
</template>

<script>
import * as types from '../store/mutation.types'
import { mapState } from 'vuex'

export default {
  name: 'StateControl',
  data () {
    return {
      state: 1,
      room: 'public',
      evidence: ''
    }
  },
  computed: {
    ...mapState({
      rooms: (state) => state.rooms,
      evidences: (state) => state.evidences,
      gameState: (state) => state.gameState,
      gameStates: (state) => state.gameStates
    }),
    filteredEvidences () {
      const room = this.rooms
        .find(room => room.id === this.room)
      console.log('room', room)
      if (room) {
        console.log('room.evidences', room.evidences)
        return this.evidences.filter(evidence => {
          return !room.evidences.some(e => e === evidence)
        })
      } else {
        return this.evidences
      }
    }
  },
  watch: {
    state () {
      console.log('state', this.state)
    }
  },
  methods: {
    activateState () {
      this.$socket.emit('game:state', this.gameStates[this.state])
      // this.$store.commit(types.GAME_STATE_CHANGED, this.gameStates[this.state])
    },
    sendEvidence () {
      console.log('client sendEvidence')
      console.log('this.room', this.room)
      console.log('this.evidence', this.evidence)
      this.$socket.emit('room:evidence', {
        evidence: this.evidence,
        room: this.room
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .state-control {
    padding: 1rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 8px 48px -12px rgba(0,0,0,0.35);
  }
  .title {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
</style>
