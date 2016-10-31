/**
 * @author: @AngularClass
 */

const webpack = require('webpack');
const helpers = require('./helpers');

/*
 * Webpack Plugins
 */
// problem with copy-webpack-plugin
const AssetsPlugin = require('assets-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const HtmlElementsPlugin = require('./html-elements-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
/*
 * Webpack Constants
 */
const HMR = helpers.hasProcessFlag('hot');
const METADATA = {
    title: 'Angular2 Webpack Starter by @gdi2290 from @AngularClass',
    baseUrl: '/',
    isDevServer: helpers.isWebpackDevServer()
};

module.exports = function (options) {
    isProd = options.env === 'production';
    return {
        entry: {
            'polyfills': ['./client/src/polyfills.browser.ts'],
            'vendor': ['./client/src/vendor.browser.ts'],
            'main': ['./client/src/main.browser.ts']
        },
        resolve: {
            extensions: ['.ts', '.js', '.json'],
            modules: [helpers.root('client/src'), 'node_modules']
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loaders: [
                        '@angularclass/hmr-loader?pretty=' + !isProd + '&prod=' + isProd,
                        'awesome-typescript-loader',
                        'angular2-template-loader'
                    ],
                    exclude: [/\.(spec|e2e)\.ts$/]
                },
                {
                    test: /\.json$/,
                    loader: 'json-loader'
                },
                {
                    test: /\.css$/,
                    loaders: ['to-string-loader', 'css-loader']
                },
                {
                    test: /\.scss$/,
                    exclude: [helpers.root('client/src')],
                    loader: ExtractTextPlugin.extract(['css', 'postcss', 'sass'])
                },
                {
                    test: /\.scss$/,
                    exclude: [helpers.root('client/assets')],
                    loader: 'raw!postcss!sass'
                },
                {
                    test: /\.html$/,
                    loader: 'raw-loader',
                    exclude: [helpers.root('client/src/index.html')]
                },
                {
                    test: /\.(jpg|png|gif)$/,
                    loader: 'file'
                }
            ]
        },
        plugins: [
            new AssetsPlugin({
                path: helpers.root('dist'),
                filename: 'webpack-assets.json',
                prettyPrint: true
            }),
            new ForkCheckerPlugin(),
            new webpack.optimize.CommonsChunkPlugin({
                name: ['polyfills', 'vendor'].reverse()
            }),
            new ContextReplacementPlugin(
                // The (\\|\/) piece accounts for path separators in *nix and Windows
                /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
                helpers.root('client/src') // location of your src
            ),
            new CopyWebpackPlugin([
                {
                    from: 'client/assets',
                    to: 'assets',
                }
            ]),
            new HtmlWebpackPlugin({
                template: 'client/src/index.html',
                title: METADATA.title,
                chunksSortMode: 'dependency',
                metadata: METADATA
            }),
            new HtmlElementsPlugin({
                headTags: require('./head-config.common')
            }),
            new LoaderOptionsPlugin({
                postcss: [
                    autoprefixer({
                        browsers: ['last 2 version']
                    })
                ],
                tslint: {
                    emitErrors: false,
                    failOnHint: false
                },
            }),
            new ExtractTextPlugin("main.css")
        ],
        node: {
            global: true,
            crypto: 'empty',
            process: true,
            module: false,
            clearImmediate: false,
            setImmediate: false
        }
    };
}
