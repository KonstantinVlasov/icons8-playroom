<template lang="pug">
  .message-list
    //.message.is-announce(v-if="!messages.length") No messages yet
    .message(
      v-for="message in messages"
      :class="{'is-my': message.user !== user.name, 'is-hide-name': !showName}"
    ) {{ message.message }}
      .name {{message.user}}
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MessageList',
  props: {
    messages: {
      type: Array,
      'default': () => {
        return []
      }
    },
    showName: {
      type: Boolean,
      'default': true
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.user
    })
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/variables.scss';
  .message {
    position: relative;
    width: calc(100% - 3rem);
    padding: 0.5rem;
    margin-bottom: 1rem;
    border-radius: 4px;
    font-size: 14px;
    background: white;
    box-shadow: 0 4px 16px -8px rgba(0,0,0,0.2);
    &.is-announce {
      //margin: 0 auto;
    }
    &.is-my {
      margin-left: 3rem;
      .name {
        display: none;
      }
    }
    &.is-hide-name {
      margin-bottom: 0.5rem;
      .name {
        display: none;
      }
    }
  }
  .name {
    position: absolute;
    top: -11px;
    left: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #999;
  }
</style>
