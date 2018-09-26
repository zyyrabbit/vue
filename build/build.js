const webpack = require('webpack')
const config = require('../config')
const gulp = require('gulp')
const gutil = require('gulp-util')
const webpackProdConfig = require('./webpack.prod.config')
const webpackProdCompConfig = require('./webpack.prod.component.config')
const del = require('del')
gulp.task('clean-dist', () => {
    del([config.OUTPUT_PATH]).then(function(paths) {
        gutil.log('[clean]', paths)
    })
})

gulp.task('build', ['clean-dist'], () => {
    // 合并组件
    webpack(webpackProdConfig, (err, stats) => {
        if (err) {
            throw new gutil.PluginError('webpack', err)
        }

        gutil.log('[webpack]', stats.toString({
            colors: true,
            chunks: false,
            errorDetails: true
        }))
    })
    // 按需打包
    webpack(webpackProdCompConfig, (err, stats) => {
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
