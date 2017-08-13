let webpack = require('webpack');
let path = require('path');
let merge = require('webpack-merge');
let PrepackWebpackPlugin = require('prepack-webpack-plugin').default;
let baseConfig = require('./webpack.config.base');
let config = require('./config');

module.exports= merge(baseConfig,{
    devtool:'cheap-module-eval-source-map',
    entry:{
        entry:['./src/index.js',`webpack-dev-server/client?http://${config.host}:${config.port}`]
    },
    plugins:[
        new webpack.SourceMapDevToolPlugin({
            test:/\.(css|sass|scss)$/
        })
    ]
});