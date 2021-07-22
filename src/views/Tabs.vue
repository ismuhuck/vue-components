<template>
  <div>
    <Menu
      :theme="theme2"
      accordion
      @on-select="handleSelect"
      style="float:left;width:15%"
    >
      <Submenu name="1">
        <template slot="title">
          <Icon type="ios-paper" />
          内容管理
        </template>
        <MenuItem name="文章管理">文章管理</MenuItem>
        <MenuItem name="评论管理">评论管理</MenuItem>
        <MenuItem name="举报管理">举报管理</MenuItem>
      </Submenu>
      <Submenu name="2">
        <template slot="title">
          <Icon type="ios-people" />
          用户管理
        </template>
        <MenuItem name="2-1">新增用户</MenuItem>
        <MenuItem name="2-2">活跃用户</MenuItem>
      </Submenu>
    </Menu>
    <Tabs
      type="card"
      closable
      @on-tab-remove="handleTabRemove"
      :value="tabName"
      style="float:left;margin-left:20px;width:75%"
    >
      <TabPane label="首页" name="shouye"><div>首页</div></TabPane>
      <TabPane label="文章管理" v-if="tab0" name="tab0"
        ><div>文章管理</div></TabPane
      >
      <TabPane label="评论管理" v-if="tab1" name="tab1">评论管理</TabPane>
      <TabPane label="举报管理" v-if="tab2" name="tab2">举报管理</TabPane>
    </Tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      theme2: 'light',
      tab0: false,
      tab1: false,
      tab2: false,
      tabName: 'shouye'
    }
  },
  methods: {
    handleSelect(name) {
      console.log('name', name)
      if (name === '举报管理') {
        this.tab2 = true
        this.tabName = 'tab2'
      } else if (name === '评论管理') {
        this.tab1 = true
        this.tabName = 'tab1'
      } else if (name === '文章管理') {
        this.tab0 = true
        this.tabName = 'tab0'
      }
    },
    handleAdd() {
      this.tab0 = true
    },
    handleTabRemove(name) {
      this['tab' + name] = false
    }
  }
}
</script>
<style lang="scss" scoped></style>
