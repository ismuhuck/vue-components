import axios from 'axios'
export const downloadIamge = function(imgsrc, name) {
  const fileName = `${name}`
  // application/pdf;chartset=UTF-8 图片 ：image/jpeg   pdf: application/pdf
  const myBlob = new Blob([imgsrc], { type: 'image/jpeg;chartset=UTF-8' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(myBlob)
  link.download = fileName
  link.click()
  link.remove()
  URL.revokeObjectURL(link.href)
}
export const getImage = url => {
  return axios({ method: 'get', url: url, responseType: 'blob' })
}
