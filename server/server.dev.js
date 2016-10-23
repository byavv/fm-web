var Webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("../config/webpack.dev");

const debug = require('debug')('ms:web');

const PORT = process.env.PORT || 3000;
webpackConfig.entry.polyfills.unshift(`webpack-dev-server/client?http://localhost:${PORT}`, "webpack/hot/dev-server");
webpackConfig.entry.vendor.unshift(`webpack-dev-server/client?http://localhost:${PORT}`, "webpack/hot/dev-server");
webpackConfig.entry.main.unshift(`webpack-dev-server/client?http://localhost:${PORT}`, "webpack/hot/dev-server");

//webpackConfig.output.publicPath = '/'
var compiler = Webpack(webpackConfig);
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
    publicPath: '/static',
    contentBase: "./dist",
    setup: (app) => {
    },
    proxy: {
        '/profiles/*': "http://localhost",
        '/tracker/*': "http://localhost",
        '/tracks/*': "http://localhost",
        '/private/api/cars/*': "http://localhost",
        '/public/api/cars/*': "http://localhost",
        '/private/api/Cars/*': "http://localhost",
        '/public/api/Cars/*': "http://localhost",
        '/public/api/makers/*': "http://localhost",
        '/public/api/enginetypes/*': "http://localhost",
        '/public/api/Makers/*': "http://localhost",
        '/public/api/EngineTypes/*': "http://localhost",
        '/public/api/Users/*': "http://localhost",
        '/private/api/Users/*': "http://localhost",
        '/private/api/profiles/*': "http://localhost",
        '/api/image/*': "http://localhost"
    }
});
server.listen(PORT, () => {
    debug(`Starting webpack-dev-server on http://localhost:${PORT}`);
});
