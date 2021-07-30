;(function(env) {
  // 开发环境服务器地址
  const dev = {
    BASE_API: '127.0.0.1:3000'
  }
  // 测试环境服务器地址
  const test = {
    BASE_API: '127.0.0.1:5000'
  }
  // 生产环境服务器地址
  const prod = {
    BASE_API: '127.0.0.1:4066'
  }
  if (env === 'dev') {
    return dev
  } else if (env === 'test') {
    return test
  } else if (env === 'prod') {
    return prod
  }
})('dev')
