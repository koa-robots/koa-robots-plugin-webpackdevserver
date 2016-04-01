import webpack from 'webpack'
import compose from 'koa-compose'
import {normalize, resolve} from 'path'
import webpackDevMiddleware from 'koa-webpack-dev-middleware'
import webpackHotMiddleware from 'koa-webpack-hot-middleware'

export default function() {
    let compiler, config

    config = require(normalize(resolve('./webpack.config.js')))
    config.plugins = config.plugins || []
    config.devServer = config.devServer || {}

    config.devServer.hot = true
    config.devServer.publicPath = config.output.publicPath
    config.entry.unshift('webpack-hot-middleware/client')
    config.plugins.unshift(new webpack.HotModuleReplacementPlugin())
    config.plugins.unshift(new webpack.NoErrorsPlugin())

    compiler = webpack(config)

    return compose([webpackDevMiddleware(compiler, config.devServer), webpackHotMiddleware(compiler)])
}
