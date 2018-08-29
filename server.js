// webpack-dev-serve node.js接口不能实时刷新浏览器，与文件修改同步
const webpack = require('webpack')
const config = require('./config/config')
const WebpackDevServer = require('webpack-dev-server')
const webpackDevConfig = require('./build/webpack.dev.config')

// 编译实例
const compiler = webpack(webpackDevConfig)
const server = new WebpackDevServer(compiler, {
    publicPath: config.PUBLIC_PATH,
    stats: {
        colors: true // 显示不同的颜色区分打包的文件
    },
    hot: true,
    contentBase: config.OUTPUT_PATH
})
// 启动服务器
server.listen(config.PORT, (err) => {
    if (err) {
        console.log(err)
        return
    }
    console.log('http://localhost:3000' + config.PUBLIC_PATH)
})
