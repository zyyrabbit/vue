const webpack = require('webpack')
const config = require('../config')
const gulp = require('gulp')
const gutil = require('gulp-util')
const del = require('del')
const webpackUmdConfig = require('./webpack.umd.config')
const webpackCommonjs2Config = require('./webpack.commonjs2.config')

gulp.task('clean-dist', () => {
    del([config.OUTPUT_PATH]).then(function(paths) {
        gutil.log('[clean]', paths)
    })
})

gulp.task('build', ['clean-dist'], () => {
    // 合并组件
    webpack(webpackUmdConfig, (err, stats) => {
        if (err) {
            throw new gutil.PluginError('webpack', err)
        }

        gutil.log('[webpack]', stats.toString({
            colors: true,
            chunks: false,
            errorDetails: true
        }))
    })
    // 分开打包
     webpack(webpackCommonjs2Config, (err, stats) => {
        if (err) {
            throw new gutil.PluginError('webpack', err)
        }

        gutil.log('[webpack]', stats.toString({
            colors: true,
            chunks: false,
            errorDetails: true
        }))
    })
})
