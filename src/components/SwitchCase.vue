<template>
  <div>
    <div
      class="box-common box-left"
      :class="boxactive ? 'box-active' : ''"
      @click="monthactiveHandle"
    >
      {{ leftText }}
    </div>
    <div
      class="box-common box-right"
      :class="boxactive ? '' : ' box-active'"
      @click="weekactiveHandle"
    >
      {{ rightText }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    leftText: {
      type: String,
      default: '月'
    },
    rightText: {
      type: String,
      default: '周'
    }
  },
  data() {
    return {
      boxactive: true
    }
  },
  methods: {
    monthactiveHandle() {
      if (!this.boxactive) {
        this.boxactive = !this.boxactive
      } else {
        return
      }
    },
    weekactiveHandle() {
      if (this.boxactive) {
        this.boxactive = !this.boxactive
      } else {
        return
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.box-common {
  display: inline-block;
  line-height: 1.75rem;
  width: 3rem;
  text-align: center;
  border: 1px solid #fff;
  background-color: #1672ff;
  color: #fff;
}
.box-active {
  background-color: #fff;
  color: #1672ff;
}
.box-unactive {
  background-color: #1672ff;
  color: #fff;
}
.box-left {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-right: none;
}
.box-right {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
</style>
