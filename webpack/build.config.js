const VueLoaderPlugin = require('vue-loader/lib/plugin')
const TerserPlugin = require('terser-webpack-plugin')
const TvjsRef = require('./tvjs-ref-plugin.js')

const webpack = require('webpack')
const path = require('path')

const VERS = require('../package.json').version
const DATE = new Date().toDateString()
const BANNER =

    `TVJS Std Extension Pack - v${VERS} - ${DATE}\n` +
    `    https://github.com/tvjsx/tvjs-xp\n` +
    `    Copyright (c) 2020 c451 Code's All Right;\n` +
    `    Licensed under the MIT license`

let common = {
    entry: {
        'tvjs-xp': './src/index_prod.js',
        'tvjs-xp.min': './src/index_prod.js',
    },
    externals: {
        'trading-vue-js-tmm': 'trading-vue-js-tmm',
        'vue': 'vue'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        library: 'TvjsXP',
        libraryTarget: 'umd',
        //libraryExport: "default"
    },
    performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    module: {
        rules: [{
            test: /\.vue$/,
            exclude: /node_modules/,
            loader: 'vue-loader'
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        {
            test: /\.css$/,
            use: [
                'vue-style-loader',
                'css-loader'
            ]
        },
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            include: /\.min\.js$/,
            extractComments: {
                banner: BANNER
            }
        })]
    },
    devtool: 'source-map',
    plugins: [
        new VueLoaderPlugin(),
        new webpack.BannerPlugin({
            banner: BANNER
        }),
        new TvjsRef()
    ]
}


module.exports = [
    common
]
