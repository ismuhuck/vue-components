<template>
  <!-- 加载loading组件 -->
  <div class="container" v-show="loadingFlag">
    <div class="loading-container">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loadingFlag: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  width: 100vw;
  display: flex;
  background-color: #fff;
  // opacity: 0.5;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
}
.loading-container {
  position: relative;
  margin: auto;
  width: 86px;
  height: 86px;
  span {
    position: absolute;
    height: 100%;
    width: 100%;
    border-radius: 50%;
    &:nth-child(1) {
      top: 0;
      left: 0;
      border-bottom: 3px solid black;
      animation: turn 1s linear infinite;
    }
    &:nth-child(2) {
      right: 0;
      top: 0;
      border-right: 3px solid black;
      animation: turn2 1s linear infinite;
    }
    &:nth-child(3) {
      right: 0;
      bottom: 0;
      border-top: 3px solid black;
      animation: turn3 1s linear infinite;
    }
  }
  @keyframes turn {
    0% {
      transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
    }
    to {
      transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
    }
  }
  @keyframes turn2 {
    0% {
      transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
    }
    to {
      transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
    }
  }
  @keyframes turn3 {
    from {
      transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
    }
    to {
      transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
    }
  }
}
</style>
