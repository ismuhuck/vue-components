// 点击返回顶部函数
function backTop(btnId) {
  var btn = document.getElementById(btnId)
  var d = document.documentElement //获取整个HTML页面
  var b = document.body
  // console.log(d.scrollTop,b.scrollTop)
  window.onscroll = set
  btn.style.display = 'none'
  btn.onclick = function() {
    btn.style.display = 'none'
    window.onscroll = null
    this.timer = setInterval(function() {
      //   Math.ceil 向上取整 返回大于或等于函数参数 并且与之最接近的整数
      d.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1)
      b.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1)
      if (d.scrollTop + b.scrollTop == 0)
        clearInterval(btn.timer, (window.onscroll = set))
    }, 10)
  }
  function set() {
    btn.style.display = d.scrollTop + b.scrollTop > 100 ? 'block' : 'none'
  }
}

// 时间格式化函数 fmt: YYYY-mm-dd-HH-MM-SS
function dateFormat(fmt, date) {
  let ret
  const opt = {
    'Y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    'S+': date.getSeconds().toString() // 秒
  }
  for (let k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      /**
       * padStart 根据给定的长度在字符串前面补充想要补充的字符串 padStart(len,str)
       *  len: 转换后的长度
       *  str: 想要补充的字符串
       * padEnd(len,str) 在字符串的后面补充字符串
       * (opt[k].padStart(ret[1].length, "0"))
       */
      fmt = fmt.replace(
        ret[1],
        ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
      )
    }
  }
  return fmt
}
/**
 * 判断数据类型
 * @param {any} data 要判断数据类型的数据
 * @param {string} type 目标类型
 * @returns 是否是目标类型，当不传入指定type时返回相应的类型
 */
export function isType(data, type) {
  const typeObj = {
    '[object String]': 'string',
    '[object Number]': 'number',
    '[object Boolean]': 'boolean',
    '[object Null]': 'null',
    '[object Undefined]': 'undefined',
    '[object Object]': 'object',
    '[object Array]': 'array',
    '[object Function]': 'function',
    '[object Date]': 'date', // Object.prototype.toString.call(new Date())
    '[object RegExp]': 'regExp',
    '[object Map]': 'map',
    '[object Set]': 'set',
    '[object HTMLDivElement]': 'dom', // document.querySelector('#app')
    '[object WeakMap]': 'weakMap',
    '[object Window]': 'window', // Object.prototype.toString.call(window)
    '[object Error]': 'error', // new Error('1')
    '[object Arguments]': 'arguments'
  }
  let name = Object.prototype.toString.call(data) // 借用Object.prototype.toString()获取数据类型
  let typeName = typeObj[name] || '未知类型' // 匹配数据类型
  return type ? typeName === type : typeName
}

/**
 *
 * @returns 获取当前日期
 */
export function getCurrentTime() {
  return dateFormat('YYYY-mm-dd', new Date())
}

/**
 *获取查询参数
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * 将对象编码为查询参数
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

export { backTop, dateFormat }
