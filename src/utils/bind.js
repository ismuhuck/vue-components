/* eslint-disable */

/**
 * @description new 操作符的实现
 * @param {Function} _func 要生成实例对象的方法名
 * @param  {...any} args 剩余参数，用于赋值给要生成对象的方法
 * @returns
 */
function _new(_func, ...args) {
  if (typeof _func != 'function') {
    throw new Error('参数应该为一个函数')
  }
  // 创建一个空对象 并将该方法的原型赋值给该对象
  let obj = Object.create(_func.prototype)
  // 将该方法的this绑定到 该方法
  let result = _func.apply(obj, args)
  return result instanceof Object ? result : obj
}

function Student(name) {
  this.name = name
}
Student.prototype.say = function() {
  console.log('你好')
}
const new_obj = _new(Student, 'muhuck')

// 使用bind 解决this 隐式绑定的问题
class Page {
  constructor(callback) {
    this.className = 'Page'
    // callback() // 内部使用严格模式，直接执行的话实际指向的是undefined
    this.messageCallback = callback // 回调函数的this 被隐式的绑定到 Page类
    this.messageCallback('消息信息')
  }
}

class PageA {
  constructor() {
    this.className = 'PageA'
    // this.pageClass = new Page(this.handleMessage) // 此时传递的是函数的内存地址，没有上下文对象， this未进行绑定
    this.pageClass = new Page(this.handleMessage.bind(this)) // 将回调函数的this进行绑定
  }
  handleMessage(msg) {
    console.log('通话', this.className, msg)
  }
}
new PageA()

/**
 *  call 方法的实现  就是将其绑定到传入的对象中 然后使用该对象进行调用
 * @param {Object} context 函数要绑定到的对象
 * @param  {...any} arg 需要传递的参数
 * @returns 绑定函数的处理结果
 */
Function.prototype.mycall = function(context, ...arg) {
  if (context === null || context === undefined) {
    context = window
  } else {
    context = Object(context)
  }
  context.thisFun = this
  let result = context.thisFun(...arg)
  delete context.thisFun
  return result
}

var name = '泰植'
let stu = {
  name: 'muhuck'
}
function getName(age, aa) {
  console.log('this.name', this.name)
}

// 判断是否为类数组对象
function isArrayLike(o) {
  if (
    o && // o不是null、undefined等
    typeof o === 'object' && // o是对象
    isFinite(o.length) && // o.length是有限数值
    o.length >= 0 && // o.length为非负值
    o.length === Math.floor(o.length) && // o.length是整数
    o.length < 4294967296
  )
    // o.length < 2^32
    return true
  else return false
}

let arr = [1, 2, 3]

/**
 *
 * @param {Object} thisArg  要绑定到的对象
 * @param  {...any} params
 * @returns 已绑定this的函数
 */
Function.prototype.mybind = function(thisArg, ...params) {
  const _this = this // 缓存当前函数
  console.log('thisout', this)
  let funToBind = function(...params2) {
    console.log('thisin', this)
    const isNew = this instanceof funToBind // this 是否是funToBind 的实例  也就是返回的funToBind 是否通过new 调用
    const context = isNew ? this : Object(thisArg)
    return _this.call(context, ...params, ...params2)
  }
  if (_this.prototype) {
    funToBind.prototype = Object.create(_this.prototype)
  }
  return funToBind
}

const myBindFun = getName.mybind(stu)
myBindFun(19)
