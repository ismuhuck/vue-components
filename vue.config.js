const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i

const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  configureWebpack: config => {
    const plugins = []
    if (process.env.NODE_ENV === 'production') {
      // 开启gzip
      plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      )
    }
    config.plugins = [...config.plugins, ...plugins]
    config.devtool = 'source-map'
  },
  chainWebpack: config => {
    // 配置路径别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
  },
  publicPath: './',
  assetsDir: 'static',
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: false, // false 打包时不生成.map 文件
  lintOnSave: false, // 是否开启esLint
  devServer: {
    host: '0.0.0.0',
    port: 7405,
    https: false,
    hotOnly: true, // 是否开启热更新
    open: false, // 是否自启动浏览器
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true //是否开启代理， 在本地创建一个虚拟服务端
      },
      '/test': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/test': '/rf/test' // 重写请求路径 将/test 重写为 /rf/test
        }
      },
      '/getFileStream': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true
      }
    }
  }
}
