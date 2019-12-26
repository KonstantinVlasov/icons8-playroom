<template lang="pug">
  .app-evidences
    .title Психологический портрет
    ul
      li.evidence(
        v-for="evidence in evidences"
      ) {{ evidence }}
</template>

<script>
export default {
  name: 'AppEvidences',
  data () {
    return {
      evidences: [
        'Живет сегодняшним днем и пытается извлечь удовольствие из всего что возможно, авантюрист',
        'Не расположен к искреннему общению и скрывает большую часть своей жизни',
        'Внешне очень слабо проявляет эмоции, хотя проблем в отношении с людьми не имеет',
        'Легковнушаемый, склонен верить во все подряд',
        'Достаточно самостоятельный, порой эгоистичный, умеет влиять на людей'
      ]
    }
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
    padding-left: 0.75rem;
  }
  li {
    margin-bottom: 0.25rem;
    font-size: 14px;
    line-height: 1.35;
    font-weight: 400;
    &:before {
      content: "•";
      display: inline-block;
      width: 0.75em;
      margin-left: -0.75em;
      color: black;
    }
  }
</style>
