'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    let server, scripts, port, config;

    port = getPort();
    config = require((0, _path.normalize)((0, _path.resolve)('./webpack.config.js')));
    server = new _webpackDevServer2.default((0, _webpack2.default)(config.compiler), config.options);

    scripts = ['<script type="text/javascript">', 'document.write("<script async src=\'http://HOST:' + port + '/webpack-dev-server.js\'><\\/script>".replace("HOST", location.hostname));', '</script>', '</body>'].join('');

    server.listen(port);

    return function* (next) {
        yield next;

        if (~this.type.indexOf('html') && this.body) {
            this.body = ('' + this.body).replace('</body>', scripts);
        }
    };
};

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _path = require('path');

var _webpackDevServer = require('webpack-dev-server');

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getPort() {
    return 2000 + Math.floor(Math.random() * 58000);
}