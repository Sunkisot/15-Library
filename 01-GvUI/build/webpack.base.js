const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')  // 生成html文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 清除dist文件夹
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 将css提取成一个独立的文件
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin') // 在html中追加资源引用

module.exports = {
    optimization: {
        splitChunks: {
            chunks: 'all', // 默认值为 async  表示只会对异步加载的模块进行代码分割
            minSize: 0, // 模块最少大于30KB才拆分
            maxSize: 0,  // 如果超出了maxSize,会进一步进行拆分
            minChunks: 2, // 模块最少引用一次才会被拆分
            maxAsyncRequests: 5, // 异步加载时同时发送的请求数量最大不能超过5,超过5的部分不拆分
            maxInitialRequests: 3, // 页面初始化时同时发送的请求数量最大不能超过3,超过3的部分不拆分
            automaticNameDelimiter: '_', // 默认的连接符
            name: true, // 拆分的chunk名,设为true表示根据模块名和CacheGroups的key来自动生成,使用上面连接符连接
            cacheGroups: { // 缓存组配置,上面配置读取完成后进行拆分,如果需要把多个模块拆分到一个文件,就需要缓存,所以命名为缓存组
                vendors: { // 自定义缓存组名
                    test: /[\\/]node_modules[\\/]/, // 检查node_modules目录,只要模块在该目录下就使用上面配置拆分到这个组
                    priority: -10, // 权重-10,决定了哪个组优先匹配,例如node_modules下有个模块要拆分,同时满足vendors和default组,此时就会分到vendors组,因为-10 > -20
                    // filename: 'vendors.js'
                },
                default: { // 默认缓存组名
                    minChunks: 1, // 最少引用两次才会被拆分
                    priority: -20, // 权重-20
                    reuseExistingChunk: true // 如果主入口中引入了两个模块,其中一个正好也引用了后一个,就会直接复用,无需引用两次
                }
            }
        }
    },
    entry: {
        index: ['@babel/polyfill', path.join(__dirname, '../src/index.js')],
    },
    output: {
        path: path.join(__dirname, '../dist'),
        // filename: '[name].[contenthash:8].js'
        filename: 'my-lib.js', 
        libraryTarget: 'umd',  //用到的模块定义规范
        library: 'myLib',   //库的名字
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, '../src/index.html'),
            filename: 'index.html',
        }),
        // new CleanWebpackPlugin(),
        // 代码备注
        new webpack.BannerPlugin('我真牛掰！'),
        // 将jquery库自动加载到每个模块
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new webpack.IgnorePlugin(/\.\/locale/, /moment/),
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, '../dist/manifest.json')
        }),
        new AddAssetHtmlWebpackPlugin({
            filepath: path.resolve(__dirname, '../dist/vue_dll.js')
        })
    ],
    module: {
        noParse: /jquery|bootstrap/,
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                // use: ['style-loader', 'css-loader'],
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(scss|sass)$/,
                // use: ['style-loader', 'css-loader', 'sass-loader'],
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.less$/,
                // use: ['style-loader', 'css-loader', 'less-loader'],
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
            },
            {
                test: /\.(png|jpg|gif)/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        // limit表示如果图片大于5KB，就以路径形式展示，小于的话就用base64格式展示
                        limit: 5 * 1024,
                        // 打包输出目录
                        outputPath: 'images',
                        // 打包输出图片名称
                        name: '[name]-[hash:5].[ext]'
                    }
                }]
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'icons'
                },
            },
            // 打包html中的图片
            {
                test: /\.(htm|html)$/,
                loader: 'html-withimg-loader',
                options: {
                    name: '[name]-[hash:5].[ext]',
                    outputPath: 'images'
                },
            },
            // 将jquery挂载到window（需在入口文件引入一次）
            // {
            //   test: require.resolve('jquery'),
            //   use: {
            //     loader: 'expose-loader',
            //     options: '$'
            //   }
            // }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts']
    }
}