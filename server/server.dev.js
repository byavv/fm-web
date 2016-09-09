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
    /* proxy: {
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
     }*/
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


      /*  '/profiles/*': "http://localhost:3001",
        '/tracker/*': "http://localhost:3001",
        '/tracks/*': "http://localhost:3001",
        '/private/api/cars/*': "http://localhost:3001",
        '/public/api/cars/*': "http://localhost:3001",
        '/private/api/Cars/*': "http://localhost:3001",
        '/public/api/Cars/*': "http://localhost:3001",
        '/public/api/makers/*': "http://localhost:3001",
        '/public/api/enginetypes/*': "http://localhost:3001",
        '/public/api/Makers/*': "http://localhost:3001",
        '/public/api/EngineTypes/*': "http://localhost:3001",
        '/public/api/Users/*': "http://localhost:3001",
        '/private/api/Users/*': "http://localhost:3001",
        '/private/api/profiles/*': "http://localhost:3001",
        '/api/image/*': "http://localhost:3001"*/
    }
});
server.listen(PORT, () => {
    debug(`Starting webpack-dev-server on http://localhost:${PORT}`);
});
