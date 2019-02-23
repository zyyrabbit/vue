const path = require('path')
const config = require('../config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const vueLoaderConfig = require('./vue-loader.conf')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
// 解决path.join解决路劲替换问题
const pathConvert = (_path, _name) => {
    return path.join(_path, _name).replace('\\', '/')
}
module.exports = {
    entry: {
        app: config.SRC_PATH,
        vendor: ['vue']
    },
    output: {
        publicPath: '',
        path: config.PAEG_OUTPUT_PATH,
        filename: process.env.NODE_ENV === 'production' ? pathConvert(config.SCRIPT_PATH, '[name].[hash].bunld.js') : pathConvert(config.SCRIPT_PATH, '[name].bunld.js')
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
                '@': pathConvert(config.BASE_PATH, 'src')
            }
    },
    module: {
        rules: [{
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 2000,
                        name: '/font/[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 2000,
                        name: pathConvert(config.IMAGE_PATH, '[name].[ext]')
                    }
                }]
            },
            {
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader',
                    options: vueLoaderConfig
                }]
            }
        ]
    },
    plugins: [
        new ProgressBarPlugin(),
        new HtmlWebpackPlugin({
            filename: pathConvert(config.PAEG_OUTPUT_PATH, 'index.html'),
            template: path.resolve(__dirname, config.HTML_PATH),
            inject: true,
            hash: true
            // chunks: ['app']
        }),
        new ExtractTextPlugin(pathConvert(config.STYLE_PATH, '[name].css'), {
            allChunks: true
        })
    ],
    stats: {
        // Nice colored output
        colors: true
    }
}
