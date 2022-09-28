const path =require('path')
const merge = require('webpack-merge') // webpack文件合并
const baseConfig = require('./webpack.base')
const webpack = require('webpack')

module.exports = merge(baseConfig, {
  mode: 'development',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js'
  },
  devServer: {
    open: true,
    contentBase: './',
    hot: true,
    port: '8000',
    proxy: {
      '/api': {
        target: 'http://localhost:8024/',
        pathRewrite: {
          '^/api': ""
        }
      }
    }
  },
  devtool: 'eval-cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      isDev: 'true' // 字符串内代码会执行 
    })
  ]
})