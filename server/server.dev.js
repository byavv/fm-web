var Webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
var webpackDevConfig = require("../config/webpack.dev")({ env: 'development' });

const debug = require('debug')('ms:web');

const PORT = process.env.PORT || 3000;
webpackDevConfig.entry.polyfills.unshift(`webpack-dev-server/client?http://localhost:${PORT}`, "webpack/hot/dev-server");
webpackDevConfig.entry.vendor.unshift(`webpack-dev-server/client?http://localhost:${PORT}`, "webpack/hot/dev-server");
webpackDevConfig.entry.main.unshift(`webpack-dev-server/client?http://localhost:${PORT}`, "webpack/hot/dev-server");

var compiler = Webpack(webpackDevConfig);
var bundleStart = null;
compiler.plugin('compile', function () {
    debug('Start bundling...');
    bundleStart = Date.now();
});
compiler.plugin('done', function (info) {
    debug('Bundle completed, time:' + (Date.now() - bundleStart) + 'ms!');
});

const server = new WebpackDevServer(compiler, {
    hot: true,
    stats: {
        colors: true
    },
    quiet: false,
    noInfo: true,
    publicPath: '/static/',
    contentBase: "./dist",
    setup: (app) => {
    },
    proxy: {
        '/api/*': "http://localhost:3001"
    }
});
server.listen(PORT, () => {
    debug(`Starting webpack-dev-server on http://localhost:${PORT}`);
});
