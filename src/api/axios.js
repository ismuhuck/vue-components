import axios from 'axios'
import QS from 'qs'

let isFormData = false
let isDownLoad = false
function initParams(params) {
  if (params) {
    if (Object.keys(params).length > 0) {
      for (let key in params) {
        if (
          params[key] &&
          params[key] != '' &&
          typeof params[key] == 'string'
        ) {
          params[key] = params[key].replace(new RegExp("'", 'g'), "\\\\'")
        }
      }
    }
    return params
  } else return {}
}
// axios.defaults.baseURL = 'http://127.0.0.1:3000/'
axios.defaults.timeout = 1000
axios.defaults.withCredentials = true // 携带cookie
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8' // 设置post请求头

function initRequest() {
  isFormData = false
  isDownLoad = false
}

function initFormRequest() {
  isFormData = true
  isDownLoad = false
}

// function initDownLoad() {
//   isFormData = false
//   isDownLoad = true
// }

// 请求拦截器
axios.interceptors.request.use(
  config => {
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
      // 'authorization': getCookie('token')
    }
    if (isFormData) {
      axios.defaults.headers.post['Content-Type'] =
        'application/x-www-form-urlencoded;charset=UTF-8'
    } else {
      axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
    }

    if (isDownLoad) {
      config.responseType = 'blob'
    }

    return config
  },
  error => {
    return Promise.error(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      if (isDownLoad) {
        return Promise.resolve(response)
      }
      if (response.data.code > 199 && response.data.code < 301) {
        //是后台返回的
        return Promise.resolve(response)
      } else if (response.data.code == 401) {
        return Promise.reject(response)
      } else {
        return Promise.reject(response)
      }
    } else if (response.status === 302) {
      return Promise.reject(response)
    }
  },
  // 服务器状态码不是200的情况
  error => {
    if (error.data && error.data.code) {
      switch (error.data.code) {
        // 401: 未登录
        case 401:
          console.error('未登录')
          break
        // 403 token过期
        case 403:
          console.error('登录过期，请重新登录')
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          break
        // 404请求不存在
        case 404:
          console.error('网络请求不存在')
          break
        // 其他错误，直接抛出错误提示
        default:
        // console.error(error.data.message);
      }
      return Promise.reject(error.data)
    } else {
      return Promise.reject(error.response)
    }
  }
)

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  initRequest()
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: initParams(params)
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  initRequest()
  return new Promise((resolve, reject) => {
    axios
      .post(url, QS.stringify(initParams(params)))
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

export function formData(url, params) {
  initFormRequest()
  let formData = new FormData()
  params = initParams(params)
  for (let key in params) {
    formData.append(key, params[key])
  }
  return new Promise((resolve, reject) => {
    axios
      .post(url, formData)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
// export function downLoad(url, params) {
//   initDownLoad()
//   return new Promise((resolve, reject) => {
//     axiosinstance
//       .get(url, {
//         params: initParams(params)
//       })
//       .then(res => {
//         resolve(res.data)
//       })
//       .catch(err => {
//         reject(err.data)
//       })
//   })
// }
