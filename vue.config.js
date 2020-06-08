module.exports = {
	lintOnSave: true, // 是否开启esLint
  devServer: {
    host: '0.0.0.0',
    port: 8082,
		https: false, // 是否开启https
		hotOnly: true,	// 是否开启热更新
		open: true,	// 是否自启动浏览器
  }
}
