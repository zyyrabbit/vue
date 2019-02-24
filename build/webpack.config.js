const path = require('path')
const config = require('../config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin") // v3->v4
const cssLoaderConfig = require('./css-loader.conf') // v3->v4
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin') // v3->v4
// 解决path.join解决路劲替换问题
const pathConvert = (_path, _name) => {
  return path.join(_path, _name).replace('\\', '/')
}
const isProduction = process.env.NODE_ENV === 'production'
module.exports = {
  mode: 'production', // v3->v4
  entry: {
    app: config.SRC_PATH
  },
  output: {
    publicPath: '',
    path: config.PAEG_OUTPUT_PATH,
    filename: isProduction ? pathConvert(config.SCRIPT_PATH, '[name].[hash].bunld.js') : pathConvert(config.SCRIPT_PATH, '[name].bunld.js')
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
        use: cssLoaderConfig.css
      },
      {
        test: /\.scss$/,
        use: cssLoaderConfig.scss
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
        use: ['vue-loader']
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    new VueLoaderPlugin(),  // v3->v4
    new HtmlWebpackPlugin({
      filename: pathConvert(config.PAEG_OUTPUT_PATH, 'index.html'),
      template: path.resolve(__dirname, config.HTML_PATH),
      inject: true,
      hash: true
    }),
    // v3->v4
    new MiniCssExtractPlugin({
      filename: isProduction ? "[name].[hash].css" : "[name].css", 
      chunkFilename:  isProduction ? "[id].[hash].css" : "[id].css"
    })
  ],
  stats: {
    colors: true
  }
}
