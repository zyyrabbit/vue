const webpack = require("webpack");
const path = require("path");
const webpackConfig = require("./webpack.config.js");
const webpackMerge = require("webpack-merge");

module.exports = webpackMerge(webpackConfig, {
    devtool: 'cheap-source-map',
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            comments: false
        }),
        //在生产环境中使用，精简vue一些错误警告语句的代码
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                except: ['$super', '$', 'exports', 'require']
            }
        })
    ]
});