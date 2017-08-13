let path = require('path');
module.exports = {
    host: 'localhost',
    port: '3000',
    publicPath: '/dist/',
    proxy: {
        "/service/": {
            target: "http://localhost:3000",
            pathRewrite: { 
                "^/service/": "/dist-service/" ,
            }
        }
    }
}