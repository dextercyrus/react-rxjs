let config = require("./config")

module.exports = {
    stats: {
        assets: true,
        assetsSort: "field",
        cached: false,
        children: false,
        chunks: false,
        chunkHodules: false,
        chunkOrigins: false,
        chunksSort: "field",
        context: "../src/",
        colors: true,
        errors: true,
        errorOetails: true,
        hash: true,
        modules: false,
        modulesSort: "field",
        publicPath: false,
        reasons: false,
        source: true,
        timings: true,
        version: false,
        warnings: true,
    },
    host: config.host,
    port: config.port,
    setup: function (app) {
        app.use(function (req, res, next) {
            next();
        });
    },
    publicPath: config.publicPath,
    proxy:config.proxy
}