const path = require('path')
const webpack = require('webpack')
// const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
// 解决path.join解决路劲替换问题
/* const pathConvert = (_path, _name) => {
    return path.join(_path, _name).replace('\\', '/')
} */

const webpackConfig = {
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
  // externals: config.externals,
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
   // new ProgressBarPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new ParallelUglifyPlugin({
     // 传递给 UglifyJS 的参数
      uglifyJS: {
          output: {
            // 最紧凑的输出
                beautify: false,
                // 删除所有的注释
                comments: false
          },
          compress: {
            // 在UglifyJs删除没有用到的代码时不输出警告
                warnings: false,
                // 删除所有的 `console` 语句，可以兼容ie浏览器
                drop_console: true,
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true
          }
        }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
}

module.exports = webpackConfig
