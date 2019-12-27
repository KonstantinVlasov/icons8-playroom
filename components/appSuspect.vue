<template lang="pug">
  .app-suspect
    .content
      slot
        .header
          img.preview(:src="suspect.image")
          .name {{ suspect.name }}
            .description {{ suspect.description }}

        //message-list.is-short(
        //  :messages="room.suspects.filter(s => s.suspect === suspect.id)"
        //)
        .evidences
          .evidence(
            v-for="(evidence, i) in evidences(suspect)"
            @click="selectEvidence(evidence)"
          )
            .select-evidence(:class="{'is-selected': evidence[`${room.id}checked`]}")
            | {{ evidence.text }}

        //.add-note.button(v-if="!addingNote" @click="openNote") Add note
        //send-message(v-if="addingNote" placeholder="Note" @send="sendMessage(suspect.id, $event)")

</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AppSuspect',
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
    evidences (suspect) {
      if (this.room.evidences) {
        return this.room.evidences.filter(evidence => evidence.userId === suspect.id)
      }
    },
    selectEvidence (evidence) {
      this.$socket.emit('room:evidence:check', {
        room: this.room.id,
        evidence: evidence.id,
        checked: !evidence.checked
      })
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
  @import '../assets/variables.scss';
  .app-suspect {
    display: inline-block;
    flex: 1;
    width: 100%;
    background: white;
    border-radius: 0.5rem;
    margin-bottom: 20px;
    box-shadow: 0 12px 18px -8px rgba(0,0,0,0.2);

    &.is-empty {
      visibility: hidden;
      padding: 0 1rem;
      margin: 0 16px;
      box-shadow: none;
      background: none;
      min-height: 0;
    }
  }
  .content {
    display: flex;
    flex-flow: column wrap;
    padding: 0.75rem;
  }
  .header {
    display: flex;
    width: 100%;
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
    padding-left: 0.5rem;
    margin-bottom: 1rem;
    border-left: 3px solid $color-main;
    &:empty {
      border: none;
    }
  }
  .send-message {
    width: 100%;
  }
  .evidences {
    list-style: none;
    margin-top: 1rem;
    margin-bottom: 0;
  }
  .evidence {
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.35;
    cursor: pointer;
  }
  .select-evidence {
    position: relative;
    display: inline-block;
    margin-right: 6px;
    height: 14px;
    width: 14px;
    vertical-align: sub;
    background-color: #eee;
    border: 1px solid #ccc;

    &:after {
      content: "";
      position: absolute;
      display: none;

      left: 4px;
      top: 0;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 3px 3px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }

    &.is-selected {
      background-color: $color-main;
      border: 1px solid $color-main;
      &:after {
        display: block;
      }
    }
  }
</style>
