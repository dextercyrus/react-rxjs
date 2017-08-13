let webpack = require('webpack');
let ExtracTextPlugin = require('extract-text-webpack-plugin');
let path = require('path');

let config = {
    entry: {
        entry: './src/index.js',
        vendor: './src/vendor.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtracTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }]
                })
            }, {
                test: /\.(sass|scss)$/,
                use: ExtracTextPlugin.extract({
                    use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }, 'sass-loader']
                })
            }, {
                test: /\.(png|gif|jpg|svg|ttf|eot|woff|woff2)\??.*$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1000
                    }
                }]
            }, {
                test: /\.(js|jsx)$/,
                use: [{
                    loader: 'babel-loader',
                    query: {
                         "presets": [ "es2015", "react", "stage-0"],
                        plugins: [require('babel-plugin-transform-class-properties')]
                    }
                }]
            }, {
                test: /\.(ts|tsx)$/,
                use: [{
                    loader: 'ts-loader'
                }]
            }
        ]
    },
    resolve: {
        alias: {
            "@common": path.resolve(__dirname, '../src/common/')
        }
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'manifest']
        }),
        new ExtracTextPlugin('style.css')
    ]
};

module.exports = config;