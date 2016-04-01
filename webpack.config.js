var path = require('path')

module.exports = {
    entry: [
        path.resolve(__dirname, 'test', 'build/main.js')
    ],
    output : {
        path : path.resolve(__dirname, 'build'),
        publicPath : '/build/',
        filename : 'bundle.js'
    },
    devServer: {
        quiet: true,
        noInfo : true
    }
}
