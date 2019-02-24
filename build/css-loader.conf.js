'use strict'
const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin") // v3->v4
const isProduction = process.env.NODE_ENV === 'production'
exports.css = [
  isProduction ? MiniCssExtractPlugin.loader :  'style-loader',
  'css-loader',
  'postcss-loader'
]
exports.scss = [
  isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader',
  'css-loader',
  'postcss-loader',
  'sass-loader',
  {
    loader: 'sass-resources-loader',
    options: {
      resources: path.resolve(__dirname, '../src/components/theme-chalk/src/common/*.scss')
    }
  }
]
