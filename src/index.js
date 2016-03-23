import webpack from 'webpack'
import {join, normalize, resolve} from 'path'
import webpackDevServer from 'webpack-dev-server'

export default function() {
    let server, scripts, port, config

    config = require(normalize(resolve('./webpack.config.js')))
    port = config.options.port
    server = new webpackDevServer(webpack(config.compiler), config.options)

    scripts = [
        '<script type="text/javascript">',
        'document.write("<script async src=\'http://HOST:' + port + '/webpack-dev-server.js\'><\\/script>".replace("HOST", location.hostname));',
        '</script>',
        '</body>'
    ].join('')

    server.listen(port)

    return function*(next) {
        yield next

        if (~this.type.indexOf('html') && this.body) {
            this.body = ('' + this.body).replace('</body>', scripts)
        }
    }
}
