<template>
  <div>
    <anchored :level="1">这是默认内容</anchored>
    <div>{{ name }}</div>
    <div>{{ info.sex }}</div>
  </div>
</template>
<script>
export default {
  // props: ['name', 'age', 'info'],
  props: {
    name: String,
    age: Number,
    info: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {}
  },
  mounted() {
    console.log('$route.params', this.$route.params)
  },
  methods: {},
  components: {
    anchored: () => import('../components/anchored.vue')
  }
}
</script>
<style lang="scss" scoped></style>
