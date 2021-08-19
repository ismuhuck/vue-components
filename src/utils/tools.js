/**
 * 判断数据类型
 * @param {any} data 要判断数据类型的数据, 注意返回的类型为小写字母开头
 * @param {string} type 目标类型
 * @returns 是否是目标类型，当不传入指定type时返回相应的类型
 */
function isType(data, type) {
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
 *  日期格式化时间
 * @param {String} fmt 想要的日期格式
 * @param {Date} date 需要格式化的Date类型的日期
 * @returns 格式化完成的数据
 */
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

export { isType, dateFormat }
