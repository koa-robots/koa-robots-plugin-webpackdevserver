'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    let compiler, config;

    config = require((0, _path.normalize)((0, _path.resolve)('./webpack.config.js')));

    config.devServer.hot = true;
    config.plugins = config.plugins || [];
    config.entry.unshift('webpack-hot-middleware/client');
    config.plugins.unshift(new _webpack2.default.HotModuleReplacementPlugin());
    config.plugins.unshift(new _webpack2.default.NoErrorsPlugin());

    compiler = (0, _webpack2.default)(config);

    return (0, _koaCompose2.default)([(0, _koaWebpackDevMiddleware2.default)(compiler, config.devServer), (0, _koaWebpackHotMiddleware2.default)(compiler)]);
};

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _koaCompose = require('koa-compose');

var _koaCompose2 = _interopRequireDefault(_koaCompose);

var _path = require('path');

var _koaWebpackDevMiddleware = require('koa-webpack-dev-middleware');

var _koaWebpackDevMiddleware2 = _interopRequireDefault(_koaWebpackDevMiddleware);

var _koaWebpackHotMiddleware = require('koa-webpack-hot-middleware');

var _koaWebpackHotMiddleware2 = _interopRequireDefault(_koaWebpackHotMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }