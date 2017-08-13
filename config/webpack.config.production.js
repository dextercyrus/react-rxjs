let webpack = require('webpack');
let ExtracTextPlugin = require('extract-text-webpack-plugin');
let path = require('path');
let merge = require('webpack-merge');
let PrepackWebpackPlugin = require('prepack-webpack-plugin').default;
let baseConfig = require('./webpack.config.base');
let config = require('./config');

module.exports = merge(baseConfig, {
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../publish' + config.publicPath)
    },
    plugins: [
        new PrepackWebpackPlugin({}),
        new webpack.optimize.UglifyJsPlugin()
    ]
})