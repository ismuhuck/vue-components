<template>
  <div class="download">
    <Loading></Loading>
  </div>
</template>

<script>
// import { downloadIamge, getImage } from '@/api/download.js'
import Loading from '@/components/css/loading.vue'
export default {
  components: {
    Loading
  },
  methods: {
    // downImg() {
    //   getImage('/getFileStream?name=a.jpg')
    //     .then(result => {
    //       console.log('result', result)
    //     })
    //     .catch(err => {
    //       downloadIamge(err.data, 'a')
    //       console.log('err', err)
    //     })
    // }
  }
}
</script>

<style lang="scss" scoped>
// .download {
//   background-color: brown;
// }
img {
  width: 50px;
  height: 50px;
}
</style>
