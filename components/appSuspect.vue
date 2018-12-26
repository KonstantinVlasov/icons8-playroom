<template lang="pug">
  .app-suspect
    .header
      img.preview(:src="suspect.image")
      .name {{ suspect.name }}
        .description {{ suspect.description }}

    message-list(
      :messages="room.suspects.filter(s => s.suspect === suspect.id)"
      :show-name="false"
    )

    .add-note.button(v-if="!addingNote" @click="openNote") Add note
    send-message(v-if="addingNote" placeholder="Note" @send="sendMessage(suspect.id, $event)")

</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'WorkflowSelector',
  props: {
    suspect: {
      type: Object,
      'default': () => {
        return {}
      }
    },
    room: {
      type: Object,
      'default': () => {
        return { suspects: [] }
      }
    }
  },
  data () {
    return {
      addingNote: false
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
      suspects: (state) => state.suspects
    })
  },
  methods: {
    openNote () {
      this.addingNote = true
    },
    sendMessage (suspect, message) {
      console.log('suspect', suspect)
      console.log('send note:', message)
      if (message) {
        this.$socket.emit('room:note', {
          user: this.user,
          room: this.room.id,
          suspect: suspect,
          message: message
        })
        this.addingNote = false
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-suspect {
    flex: 1;
    display: flex;
    flex-flow: column wrap;
    align-items: flex-end;
    min-width: 280px;
    min-height: 170px;
    background: white;
    padding: 1rem;
    border-radius: 0.5rem;
    margin: 0 16px 32px;
    box-shadow: 0 12px 40px -8px rgba(0,0,0,0.2);

    &.is-empty {
      visibility: hidden;
      padding: 0 1rem;
      margin: 0 16px;
      box-shadow: none;
      background: none;
      min-height: 0;
    }
  }
  .header {
    display: flex;
    width: 100%;
    margin-bottom: 0.5rem;
  }
  .preview {
    width: 48px;
    height: 48px;
    border-radius: 0.5rem;
    margin-right: 0.75rem;
    &:not([src]) {
      display: none;
    }
  }
  .name {
    font-weight: 600;
  }
  .description {
    font-size: 14px;
    font-weight: 300;
    color: #999;
  }
  .add-note {
    font-size: 14px;
    height: 28px;
    line-height: 26px;
    padding: 0 0.75rem;
  }
  .message-list {
    width: 100%;
    flex: 1;
    margin-bottom: 1rem;
  }
</style>
