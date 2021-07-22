<template>
  <div>
    <solt-child>
      <template v-slot:header>
        这是头部插槽
      </template>
      <template v-slot:default="slotProps">
        {{ slotProps.user.lastName }}
      </template>
      <template v-slot:footer>
        这是底部插槽
      </template>
    </solt-child>
  </div>
</template>

<script>
import SoltChild from './slotChild.vue'
export default {
  components: {
    SoltChild
  },
  data() {
    return {
      a: ''
    }
  }
}
</script>

<style scoped lang="less"></style>
