const path = require('path')
// const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const vueLoaderConfig = require('./vue-loader.conf')
const config = require('../config')
// 这里是为了添加js loaders
vueLoaderConfig.loaders.js = 'isparta-loader'
vueLoaderConfig.preserveWhitespace = false

const webpackConfig = {
  entry: {
    app: ['./src/components/index.js']
  },
  output: {
    path: path.resolve(process.cwd(), './dist'),
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: '[id].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': config.SRC,
      'vue$': 'vue/dist/vue.common.js'
    },
    modules: ['node_modules']
  },
  devtool: '#inline-source-map',
  module: {
    rules: [
      // 支持babel
      {
        enforce: 'post',
        test: /\.js$/,
        loader: 'isparta-loader',
        options: { esModules: true },
        include: /src/
      },
      {
        test: /\.js$/,
        include: process.cwd(),
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader']
      },
       {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.html$/,
        loader: 'html-loader?minimize=false'
      },
      {
        test: /\.otf|ttf|woff2?|eot(\?\S*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: path.posix.join('static', '[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.svg(\?\S*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: path.posix.join('static', '[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(gif|png|jpe?g)(\?\S*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: path.posix.join('static', '[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
  ]
}

module.exports = webpackConfig
