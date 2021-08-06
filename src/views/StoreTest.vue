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
    <router-link
      :to="{
        name: 'renderTest',
        params: { name: 'muhuck', age: 24, info: { num: 10010, sex: '男' } }
      }"
      >渲染函数</router-link
    >
  </div>
</template>
<script>
// import { createNamespacedHelpers } from 'vuex'
// const { mapState, mapMutations, mapGetters, mapActions } = createNamespacedHelpers('')
import { loginAPI } from '@/api/commonApi'
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      msg: '消息内容'
    }
  },
  created() {
    this.getList()
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
    getList() {
      loginAPI.dir({ a: 'a1', b: 'b1' }).then(result => {
        console.log('resultdir', result)
      })
      loginAPI.login({ a: 'alogin1', b: 'blogin1' }).then(result => {
        console.log('resultlogin', result)
      })
      loginAPI.test({ a: 'atest1', b: 'btest1' }).then(result => {
        console.log('resulttest', result)
      })
    },
    handleActions() {
      this.$store.dispatch('Login')
    }
  }
}
</script>
<style scoped></style>
