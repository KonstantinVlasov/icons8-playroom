<template lang="pug">
  .state-control
    .content.is-users
      .title Users
      .subtitle team 1
      .users(v-for="user in users.filter(user => user.room === 'team1')")
        .user {{ user.name }}
      .subtitle team 2
      .users(v-for="user in users.filter(user => user.room === 'team2')")
        .user {{ user.name }}
      .subtitle team 3
      .users(v-for="user in users.filter(user => user.room === 'team3')")
        .user {{ user.name }}
    .content.is-evidences
      .title Evidences
      .rooms
        .room {{ rooms[1].id}} {{ rooms[1].title }}
        input.room-input(type="number" v-model.number="team1Value" )
      .rooms
        .room {{ rooms[2].id}} {{ rooms[2].title }}
        input.room-input(type="number" v-model.number="team2Value" )
      .rooms
        .room {{ rooms[3].id}} {{ rooms[3].title }}
        input.room-input(type="number" v-model.number="team3Value" )
      .button(@click="sendEvidence") Send Evidence
    //.content
      .title Control panel
      | Current state: {{ gameState }}
      br
      select(v-model="state")
        option(v-for="(option, i) in gameStates" :value="i") {{ option.title }}
      = ' '
      .button(@click="activateState") Activate state
      //br
        br
        select(v-model="evidence")
          option(v-for="option in filteredEvidences" :value="option") {{ option }}
        br
        select(v-model="room")
          option(v-for="option in rooms" :value="option.id") {{ option.title }}
        = ' '
        .button(@click="sendEvidence") Send Evidence

      //.evidences(v-for="evidence in evidences") {{ evidence.userId }}: {{ evidence.text }} - {{ evidence.proof }}
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'StateControl',
  data () {
    return {
      state: 1,
      team1Value: 0,
      team2Value: 0,
      team3Value: 0,
      room: 'public',
      evidence: ''
    }
  },
  computed: {
    ...mapState({
      users: (state) => state.users,
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
    },
    sendEvidence () {
      // console.log('client sendEvidence')
      // console.log('this.room', this.room)
      // console.log('this.evidence', this.evidence)
      // this.$socket.emit('room:evidence', {
      //   evidence: this.evidence,
      //   room: this.room
      // })
      this.$socket.emit('room:evidences', {
        rooms: [{
          amount: this.team1Value,
          id: 'team1'
        }, {
          amount: this.team2Value,
          id: 'team2'
        }, {
          amount: this.team3Value,
          id: 'team3'
        }]
      })
      this.team1Value = 0
      this.team2Value = 0
      this.team3Value = 0
    }
  }
}
</script>

<style lang="scss" scoped>
  .state-control {
  }
  .content {
    display: inline-block;
    padding: 1rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 8px 48px -12px rgba(0,0,0,0.35);
    height: 200px;
    width: 480px;
    overflow-y: auto;
    margin-right: 1rem;

    &.is-users {
      width: 220px;
    }
    &.is-evidences {
      width: 280px;
    }
  }
  .title {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  .subtitle {
    font-size: 12px;
    font-weight: 600;
  }
  .user {
    font-size: 14px;
    font-weight: 400;
    white-space: nowrap;
  }
  .rooms {
    display: inline-block;
    margin-bottom: 6px;
  }
  .room, .room-input {
    display: inline-block;
    margin-right: 8px;
    width: 180px;
  }
  .room-input {
    width: 40px;
  }
</style>
