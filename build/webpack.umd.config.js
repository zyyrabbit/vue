const path = require('path')
const webpack = require('webpack')
const config = require('../config')
// const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const cssLoaderConfig = require('./css-loader.conf') // v3->v4
const VueLoaderPlugin = require('vue-loader/lib/plugin') // v3->v4
const webpackConfig = {
  mode: 'production', // v3->v4
  entry: {
    app: ['./src/components/index.js']
  },
  output: {
    path: path.resolve(process.cwd(), './lib'),
    publicPath: '/dist/',
    filename: 'index.js',
    chunkFilename: '[id].js',
    libraryTarget: 'umd',
    library: 'VUEUI',
    umdNamedDefine: true
  },
  externals: {
    vue: config.vue
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': config.SRC
    },
    modules: ['node_modules']
  },
  optimization: {
    minimize: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: config.SRC
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
        loaders:  cssLoaderConfig.scss
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
    new VueLoaderPlugin(),  // v3->v4
    new ProgressBarPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
}

module.exports = webpackConfig
