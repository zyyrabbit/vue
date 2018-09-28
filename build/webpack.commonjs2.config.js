const path = require('path')
const webpack = require('webpack')
// const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const config = require('../config')
const components = require('../components.json')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const vueLoaderConfig = require('./vue-loader.conf')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
// 解决path.join解决路劲替换问题
/* const pathConvert = (_path, _name) => {
    return path.join(_path, _name).replace('\\', '/')
} */

const webpackConfig = {
  entry: components,
  output: {
    path: path.resolve(process.cwd(), './lib'),
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: '[id].js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': config.SRC
    },
    modules: ['node_modules']
  },
  externals: {
    vue: config.vue
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [{
            loader: 'vue-loader',
            options: vueLoaderConfig
        }]
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
    new ProgressBarPlugin(),
    new CopyWebpackPlugin([{
      from: config.GEN_CSS_PATH_FROM,
      to: './style'
    }]),
   // new ProgressBarPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
}

module.exports = webpackConfig
