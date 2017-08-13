let webpack = require('webpack');
let path = require('path');
let webpackDevServer = require('webpack-dev-server');
let serverConfig = require('./webpack.server.config');
let webpackConfig = require('./webpack.config.dev');
let compiler = webpack(webpackConfig);

let app = new webpackDevServer(compiler,serverConfig);

app.listen(serverConfig.port,serverConfig.host,function(err){
    if(err) console.error(err);
});

console.info(`listen at http://${serverConfig.host}:${serverConfig.port}`);