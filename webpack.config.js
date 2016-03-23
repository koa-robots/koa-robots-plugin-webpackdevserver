var path = require('path')

module.exports = {
    compiler : {
        entry : path.resolve(__dirname, 'test', 'bundle.js'),
        output : {
            path : path.resolve(__dirname, 'test'),
            filename : 'dist.js'
        }
    },
    options : {
        port: 8088,
        noInfo : true,
        publicPath : '/'
    }
}
