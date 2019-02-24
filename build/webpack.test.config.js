const path = require('path')
const config = require('../config')
const cssLoaderConfig = require('./css-loader.conf') // v3->v4
const VueLoaderPlugin = require('vue-loader/lib/plugin') // v3->v4
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const webpackConfig = {
  mode: 'development',
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
      {
        test: /\.js$/,
        include: process.cwd(),
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      // 支持babel
      {
        //  enforce: 'post' 需要去掉
        test: /\.js$/,
        loader: 'istanbul-instrumenter-loader',
        options: { esModules: true },
        include: /src/,
        exclude: /node_modules|\.spec\.js$/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loaders: cssLoaderConfig.css
      },
       {
        test: /\.scss$/,
        loaders: cssLoaderConfig.scss
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
        test: /\.(svg|gif|png|jpe?g)(\?\S*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: path.posix.join('static', '[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new ProgressBarPlugin()
  ]
}

module.exports = webpackConfig
