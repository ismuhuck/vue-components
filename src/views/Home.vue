<template>
  <div class="home">
    <!-- <SwitchCase leftText="年" rightText="月"></SwitchCase> -->
    <!-- <Collapse :collapseData="itemList"></Collapse>
    {{dateFormat("YYYY-mm-dd-HH-MM-SS",new Date()) }} -->
    <TemStore />
  </div>
</template>

<script>
// import dateFormat from '../../public/util/util'
import TemStore from "./StoreTest";
export default {
  methods: {
    // dateFormat:dateFormat,
    intervalFun() {
      const timer = setInterval(() => {
        console.log("这是一个定时器，每一秒执行一次");
      }, 1000);
      // 添加事件侦听器，在beforeDestory中进行销毁
      this.$once("hook:beforeDestory", () => {
        clearInterval(timer);
        // 用于eslint忽略下一行
        // eslint-disable-next-line
        timer = null;
      });
    }
  },
  data() {
    return {
      itemList: [
        // 需要展示的列表数据
        {
          itemName: "文本一", // 折叠面板标题
          show: false, // 是否展示子面板
          itemTime: "2020.6.1", // 本周或本月的对应项的时间
          itemData: [
            {
              name: "默认数据",
              data: "2333"
            },
            {
              name: "默认数据",
              data: "2333"
            }
          ] //子面板数据
        },
        {
          itemName: "文本2", // 折叠面板标题
          show: false, // 是否展示子面板
          itemTime: "2019.02.01", // 本周或本月的对应项的时间
          itemData: [
            {
              name: "默认数据",
              data: "2333"
            },
            {
              name: "默认数据",
              data: "2333"
            }
          ] //子面板数据
        }
      ]
    };
  },
  name: "Home",
  components: {
    TemStore
    // SwitchCase: () => import("../components/SwitchCase.vue"),
    // Collapse: () => import("../components/collapse.vue")
  },
  mounted() {
    // this.intervalFun()
  }
};
</script>
