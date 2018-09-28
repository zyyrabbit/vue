const webpackConfig = require('./webpack.config')
const config = require('../config')
const webpackMerge = require('webpack-merge')
const webpack = require('webpack')

module.exports = webpackMerge(webpackConfig, {
    devtool: 'source-map',
    plugins: [
		new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
		publicPath: config.PUBLIC_PATH,
		stats: {
			colors: true // 显示不同的颜色区分打包的文件
		},
		hot: true,
		contentBase: config.PAEG_OUTPUT_PATH
	}
})
