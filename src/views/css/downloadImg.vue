<template>
  <div>
    内容
    <Button @click.native="downImg">下载</Button>
  </div>
</template>

<script>
import { downloadIamge, getImage } from '@/api/download.js'
export default {
  methods: {
    downImg() {
      getImage('/getFileStream?name=a.jpg')
        .then(result => {
          console.log('result', result)
        })
        .catch(err => {
          downloadIamge(err.data, 'a')
          console.log('err', err)
        })
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
