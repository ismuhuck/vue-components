<template>
  <div class="container">
    <div class="collapse" v-for="(item, index) in itemList" :key="index">
      <div
        class="collapse-content common"
        @click="collapseClick(index, item.itemTime)"
      >
        <div class="inside-list">{{ item.itemName }}</div>
        <div class="inside-list">
          <span :class="itemTime">{{ item.itemTime }}</span>
          <span class="icon-position">
            <!-- <van-icon :name="item.show ? 'arrow-up' : 'arrow-down'" /> -->
          </span>
        </div>
      </div>
      <div
        class="collapse-item common size-style"
        v-if="index == 0"
        v-show="item.show"
      >
        <div class="item-container" v-for="obj in item.itemData" :key="obj.day">
          <div class="day-left">{{ obj.name }}</div>
          <div class="item-inside-right">{{ obj.data }}</div>
        </div>
      </div>
      <div
        class="collapse-item common size-style"
        v-else-if="index == 1"
        v-show="item.show"
      >
        <div class="item-container" v-for="obj in item.itemData" :key="obj.day">
          <div class="day-left">{{ obj.name }}</div>
          <div class="item-inside-right">{{ obj.data }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    collapseData: {
      type: Array
    }
  },
  watch: {
    collapseData(newVal, oldVal) {
      console.log(newVal, oldVal);
    }
  },
  created() {
    this.init(this.collapseData);
  },
  methods: {
    // 组件数据初始化
    init(collapse) {
      this.itemList[0] = this.collapseData[0];
      this.itemList[1] = this.collapseData[1];
    },
    // 通过点击事件 来控制子面板的显示与隐藏 当该项数据为0时不可点击
    collapseClick(i, num) {
      for (let a = 0; a < this.itemList.length; a++) {
        if (a == i) {
          this.itemList[i].show = !this.itemList[i].show;
        } else {
          this.itemList[a].show = false;
        }
      }
    }
  },
  data() {
    return {
      datacollapse: {},
      itemTime: "item-time",
      itemList: [
        // 需要展示的列表数据
        {
          itemName: "222", // 折叠面板标题
          show: false, // 是否展示子面板
          itemTime: "222", // 本周或本月的对应项的时间
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
          itemName: "222", // 折叠面板标题
          show: false, // 是否展示子面板
          itemTime: "222", // 本周或本月的对应项的时间
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
  }
};
</script>
<style lang="scss" scoped>
.container {
  padding-bottom: 40px;
}
.collapse {
  background-color: #fff;
  .collapse-content {
    padding: 5px 10px;
    line-height: 35px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgb(235, 235, 235);
  }
  .inside-list {
    font-size: 16px;
  }
}
.item-inside {
  border-bottom: 1px solid rgb(225, 225, 225);
  padding: 5px 10px;
}
.common {
  font-size: 16px;
}
.icon-position {
  vertical-align: -3px;
  color: rgb(155, 155, 155);
}
.item-time {
  color: rgb(125, 125, 125);
}
.collapse-item {
  background-color: rgb(245, 245, 245);
  line-height: 35px;
}
.size-style {
  font-size: 14px;
}
.item-container {
  display: flex;
  justify-content: space-between;
  line-height: 30px;
  border-bottom: 1px solid rgb(225, 225, 225);
  padding: 5px 10px;
}
.item-inside-right {
  color: rgb(155, 155, 155);
}
</style>
