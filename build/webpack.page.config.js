
const webpackConfig = require('./webpack.config.js')
const webpackMerge = require('webpack-merge')
// 导入模块分析工具
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = webpackMerge(webpackConfig, {
    // 在生产环境下把 devtool 设置成 hidden-source-map，
    // 意思是生成最详细的 Source Map，但不会把 Source Map 暴露出去。由于在生产环境下会做代码压缩，一个 JavaScript 文件只有一行，所以需要列信息
    devtool: 'hidden-source-map',
    // v3->v4
    optimization: {
      runtimeChunk: {
        name: 'manifest'
      },
      minimize: true, //不需要webpack.optimize.UglifyJsPlugin，只需要使用optimization.minimize为true就行(production mode下面自动为true)
      splitChunks:{
        chunks: 'async',
        minSize: 30000, // bytes
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        name: false,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/](vue|vuex|vue-router)[\\/]/,
            name: 'vendor',
            chunks: 'all', // async 和 non-async 放在一起
          },
          styles: {
            name: 'styles',
            test: /\.(scss|css)$/,
            chunks: 'all',
            minChunks: 1,
            reuseExistingChunk: true, 
            enforce: true // 强制必须生成chunk
          }
        }
      }
    },
    plugins: [
      new BundleAnalyzerPlugin()
    ]
})

// v3
/* plugins: [
 new webpack.optimize.CommonsChunkPlugin({
   name: 'vendor',
   minChunks: function(module) {
     // any required modules inside node_modules are extracted to vendor exclude baseVendor
     return (
       module.resource &&
       /\.js$/.test(module.resource) &&
       module.resource.indexOf(
         path.join(__dirname, '../node_modules')
       ) === 0
     )
   }
 }),
 new webpack.optimize.CommonsChunkPlugin({
   name: 'manifest',
   minChunks: Infinity
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
 // 在生产环境中使用，精简vue一些错误警告语句的代码
 new webpack.DefinePlugin({
     'process.env': {
         NODE_ENV: '"production"'
     }
 }),
 new BundleAnalyzerPlugin()
] */
