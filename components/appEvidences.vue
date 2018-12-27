<template lang="pug">
  .app-evidences
    .title Доступные улики
    ul
      li.evidence(
        v-for="evidence in room.evidences"
      ) {{ evidence }}
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AppEvidences',
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
    console.log('mounted AppEvidences')
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/variables.scss';
  .app-evidences {
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    justify-content: space-between;
  }
  .title {
    font-weight: 600;
  }
  ul {
    list-style: none;
    padding-left: 1rem;
  }
  li:before {
    content: "•";
    display: inline-block; width: 1em;
    margin-left: -1em;
    color: black;
  }
</style>
