<template>
  <div class="download">
    <Loading :loadingFlag="loading"></Loading>
    <Button @click="downPdf">下载Pdf</Button>
    <Button @click="downImg">下载图片</Button>
  </div>
</template>

<script>
/* eslint-disable */
import { downloadFile, getFile } from '@/api/download.js'
import Loading from '@/components/css/loading.vue'
export default {
  data() {
    return {
      loading: true
    }
  },
  components: {
    Loading
  },
  mounted(){
    setTimeout(() => {
      this.loading = false
    },3000)
  },
  methods: {
    downImg() {
      getFile('/getFileStream?name=a.jpg')
        .then(result => {
          console.log('result', result)
        })
        .catch(err => {
          downloadFile(err.data, 'a', 'image/jpeg')
          console.log('err', err)
        })
    },
    downPdf(){
      getFile('/getFileStream?name=b.pdf')
      .then((result) => {
        console.log(result)
      }).catch((err) => {
        downloadFile(err.data, 'b', 'application/pdf')
      });
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  width: 50px;
  height: 50px;
}
</style>
