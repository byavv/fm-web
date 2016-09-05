var Webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("../config/webpack.dev");

const debug = require('debug')('ms:*');

const PORT = process.env.PORT || 3000;
webpackConfig.entry.polyfills.unshift(`webpack-dev-server/client?http://localhost:${PORT}`, "webpack/hot/dev-server");
webpackConfig.entry.vendor.unshift(`webpack-dev-server/client?http://localhost:${PORT}`, "webpack/hot/dev-server");
webpackConfig.entry.main.unshift(`webpack-dev-server/client?http://localhost:${PORT}`, "webpack/hot/dev-server");

//webpackConfig.output.publicPath = '/'
var compiler = Webpack(webpackConfig);
var bundleStart = null;
compiler.plugin('compile', function () {
    console.log('Bundling...');
    bundleStart = Date.now();
});
compiler.plugin('done', function (info) {
    console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
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
        '/public/cars/*': "http://localhost",
        '/profiles/*': "http://localhost",
        '/tracker/*': "http://localhost",
        '/public/makers/*': "http://localhost",
        '/public/enginetypes/*': "http://localhost",
        '/tracks/*': "http://localhost",
        '/auth/*': "http://localhost",
        '/private/cars/*': "http://localhost",
        '/users/*': "http://localhost",
        '/image/*': "http://localhost"
    }
});
server.listen(PORT, () => {
    console.log(`Starting webpack-dev-server on http://localhost:${PORT}`);
});
