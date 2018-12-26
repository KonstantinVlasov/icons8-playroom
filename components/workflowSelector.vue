<template lang="pug">
  .workflow-selector
    .button(@click="changeWorkflow('public')") Public
    .button(@click="changeWorkflow('private')") Private
    .button(@click="changeWorkflow('game')") Game
</template>

<script>
import * as types from '../store/mutation.types'
import { mapState } from 'vuex'

export default {
  name: 'WorkflowSelector',
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      workflow: (state) => state.workflow
    })
  },
  methods: {
    changeWorkflow (workflow) {
      this.$store.commit(types.WORKFLOW_CHANGED, workflow)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
