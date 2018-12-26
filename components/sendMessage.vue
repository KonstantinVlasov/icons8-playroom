<template lang="pug">
  form.send-message(@submit.prevent="sendMessage")
    textarea.message-text(
      v-model="message"
      @keyup.enter="sendMessage"
      :placeholder="placeholder"
    )
    button.button Send
</template>

<script>
export default {
  name: 'SendMessage',
  props: {
    placeholder: {
      type: String,
      'default': 'Message'
    }
  },
  data () {
    return {
      message: '',
      messages: []
    }
  },
  methods: {
    sendMessage () {
      if (this.message) {
        this.$emit('send', ('' + this.message).trim())
        this.message = ''
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/variables.scss';
  .send-message {
    display: flex;
  }
  .message-text {
    flex: 1;
    vertical-align: top;
    margin-right: 0.5rem;
    border: 1px solid #ddd;
    font-size: 14px;
    &:focus {
      outline: none;
      border: 1px solid $color-main;
    }
  }
  .button {
    vertical-align: top;
  }
</style>
