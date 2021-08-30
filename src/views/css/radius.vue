<template>
  <div class="inner">
    <div class="container"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    setInterval(() => {
      debugger
    }, 100)
  }
}
</script>

<style lang="scss" scoped>
// .inner {
//   display: flex;
//   height: 100vh;
// }
// 设置水平垂直居中的最简洁方法，原理：
// 在flex格式化上下文中，设置了margin: auto的元素，在通过justify-content和align-self进行对其之前，任何正处于空闲的空间都会分配到该方向的自动margin中去
// .container {
//   width: 500px;
//   height: 500px;
//   background-color: #7f7f7f;
//   margin: auto;
//   border-radius: 45%;
//   animation: turn 3s infinite linear;
// }
// @keyframes turn {
//   0% {
//     transform: rotateZ(0deg);
//   }
//   50% {
//     transform: rotateZ(180deg);
//   }
//   100% {
//     transform: rotateZ(360deg);
//   }
// }

//使用animation实现波浪滚动效果
.inner {
  min-height: 100vh;
  align-items: center;
  position: relative;
  background-color: rgb(118, 218, 255);
  overflow: hidden;
  &::before,
  &::after {
    content: '';
    position: absolute;
    min-height: 300vw;
    min-width: 300vw;
    background-color: #fff;
    left: 50%;
    animation-name: rotate;
    animation-duration: 10s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
  &::before {
    bottom: 15vh;
    border-radius: 45%;
  }
  &::after {
    bottom: 12vh;
    opacity: 0.5;
    border-radius: 47%;
  }
}
@keyframes rotate {
  0% {
    transform: translate(-50%, 0) rotateZ(0deg);
  }
  50% {
    transform: translate(-50%, -2%) rotateZ(180deg);
  }
  100% {
    transform: translate(-50%, 0) rotateZ(360deg);
  }
}
</style>
