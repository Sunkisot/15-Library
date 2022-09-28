const webpack = require('webpack')
const merge = require('webpack-merge') // webpack文件合并
const baseConfig = require('./webpack.base')
const TerserJSPlugin = require('terser-webpack-plugin') // js压缩
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin') // css 压缩
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // 打包分析

module.exports = merge(baseConfig, {
  mode: 'production',
  optimization: {
    minimizer: [new TerserJSPlugin(), new OptimizeCssPlugin()],
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      isDev: 'false'
    }),
    new BundleAnalyzerPlugin()
  ]
})