<template>
  <div>
    <button @click="handleGetter" v-permission="'C'">getter</button>
    <button @click="handleMutations" v-permission="'R'">mutations</button>
    <button @click="handleActions" v-permission="'U'">actions</button>
    <div>name:{{ name }}</div>
    <div>age:{{ age }}</div>
    <div v-for="item in list" :key="item.name">
      <span>{{ item.name }} --</span>
      <span>{{ item.age }}</span>
      <i class="iconfont zwpt_infor"></i>
    </div>
    <div>token: {{ token }}</div>
  </div>
</template>
<script>
// import { createNamespacedHelpers } from 'vuex'
// const { mapState, mapMutations, mapGetters, mapActions } = createNamespacedHelpers('')
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState({
      name: state => state.USER.name,
      age: state => state.USER.age,
      list: state => state.USER.list,
      token: state => state.USER.token
    })
  },
  methods: {
    ...mapMutations(['SET_NAME', 'SET_AGE', 'SET_TOKEN']),
    handleGetter() {
      console.log('getters', this.$store.getters.GET_LIST)
    },
    handleMutations() {
      this.SET_NAME('muhuck')
      // this.$store.commit("SET_TOKEN","tokenkkkkkkk")
    },
    handleActions() {
      this.$store.dispatch('Login')
    }
  }
}
</script>
<style scoped></style>
