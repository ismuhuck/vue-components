import axios from 'axios'
/**
 * 解决浏览器对一些文件自动打开 ，无法下载的问题，以blob的格式进行数据传输，然后创建链接进行下载
 * @param {*} imgsrc
 * @param {*} name 文件名
 * @param {*} fileType 文件MIME类型
 */
export const downloadFile = function(imgsrc, name, fileType) {
  console.log('imgsrc', imgsrc)
  const fileName = `${name}`
  // application/pdf;chartset=UTF-8 图片 ：image/jpeg   pdf: application/pdf
  const myBlob = new Blob([imgsrc], { type: fileType })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(myBlob)
  link.download = fileName
  link.click()
  link.remove()
  URL.revokeObjectURL(link.href)
}
export const getFile = url => {
  return axios({ method: 'get', url: url, responseType: 'blob' })
}
