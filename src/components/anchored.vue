<script>
export default {
  props: {
    level: {
      type: Number,
      required: true
    }
  },
  render(createElement) {
    // 使用render函数渲染
    return createElement(
      'h' + this.level, // 标签名
      this.$slots.default // 插槽默认数据
    )
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
<style lang="scss" scoped></style>
