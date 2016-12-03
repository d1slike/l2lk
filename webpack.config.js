'use strict';

const NODE_ENV = process.env.NODE_ENV || 'dev';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ENTRY_POINT = './js/App.js';
//const ENTRY_POINT_LOGIN = './js/login.jsx';
const path = require('path');
const context = path.join(__dirname, 'app');
const output = 'src/main/resources/';
const content = path.resolve(output);
const outputPath = output + 'static';
const webpack = require('webpack');
function addHash(template, hash) {
    return NODE_ENV !== 'dev' ? template.replace(/\.[^.]+$/, `.[${hash}]$&`) : template;
}
const config = {
    context: context, // исходная директория
    module: {
        loaders: [
            {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'postcss')},
            {test: /\.js$/, loaders: ['babel-loader'], include: [context]},
            {
                test: /\.jsx$/,
                include: context,
                loaders: [
                    NODE_ENV == 'dev' ? 'babel?presets[]=es2015,presets[]=react,presets[]=stage-0,presets[]=react-hmre'
                        : 'babel?presets[]=es2015,presets[]=react,presets[]=stage-0'],
            },
            {test: require.resolve('jquery'), loader: 'expose?jQuery!expose?$'},
            /*{
             test:   /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
             include: /\/node_modules\//,
             loader: 'file?name=[1][name].[ext]&regExp=node_modules/(.*)'
             },*/
            {
                test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)/,
                //exclude: /\/node_modules\//,
                loader: addHash('file?name=[path][name].[ext]&limit=4096', 'hash:6')
            }
        ]
    },
    debug: false,
    devtool: 'cheap-inline-module-source-map',
    resolve: {
        extensions: ['', '.js', '.jsx', '.css'],
        modulesDirectories: ['node_modules']
    },
    resolveLoader: {
        modulesDirectories: ['node_modules'],
        moduleTemplates: ['*-loader', '*'],
        extensions: ['', '.js', '.jsx']
    },
    postcss: function () {
        return [
            autoprefixer({
                browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                ]
            }),
        ];
    },
    entry: {
        app: [
            ENTRY_POINT,
        ],
        /*login:  [
         ENTRY_POINT_LOGIN
         ],*/
        vendor: [
            'jquery',
            'jquery-validation',
            /*'bootstrap',
             'animate.css',
             'react-bootstrap',
             'materialize-css',
             'react',
             'redux',
             'react-toastr',
             'react-router-redux',
             'react-redux',
             'react-intl',
             'react-dropzone',
             'react-dom',
             'react-router'*/
        ]
    }, // файл для сборки, если несколько - указываем hash (entry name => filename)
    externals: {},
    output: {
        filename: addHash('[name].js', 'chunkhash'),
        library: '[name]', // Экспорт точки входа в глобальную переменную
        chunkFilename: addHash('[id].js', 'chunkhash'), // Шаблон названия файлов с динамическими модулями
        path: path.join(__dirname, outputPath), // выходная директория
        pathinfo: true,
        publicPath: '/'
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.ProvidePlugin({
            'window.jQuery': 'jquery',
            'root.jQuery': 'jquery',
            jQuery: 'jquery',
            $: 'jquery',
            toastr: 'toastr',
            ReactDOM: 'react-dom',
            React: 'react'
        }),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        new HtmlWebpackPlugin({
            filename: NODE_ENV == 'dev' ? './../../index.html' : './../static/index.html',
            template: content + '/html_template/index.html',
            chunks: ['app', 'vendor'],
            //css:      ['style']
        }),
        /*new HtmlWebpackPlugin({
         filename: NODE_ENV == 'dev' ? './../../login.html' : './../static/login.html',
         template: content + '/html_template/login.html',
         chunks:   ['login', 'vendor'],
         inject:   true,
         //css:      ['style']
         }),*/
        new ExtractTextPlugin(addHash('[name].css', 'contenthash'), {disable: NODE_ENV === 'dev'}),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    ]
};
if (NODE_ENV === 'dev') {
    config.output.publicPath = '/';
    config.debug = true;
    config.devtool = 'eval';
    config.devServer = {
        proxy: [{
            path: '/api/**',
            target: 'http://127.0.0.1:8899'
        }, {
            path: '/j_spring_security_check',
            target: 'http://127.0.0.1:8899'
        }],
        host: '0.0.0.0',
        contentBase: content,
        hot: true,
        info: true,
        port: 8088,
        stats: {
            colors: true
        },
        publicPath: '/',
        historyApiFallback: true
    };
    // Control flow:
    //   middlware ->
    //     proxy ->
    //       historyApiFallback ? -> historyApiFallback, middleware
    //         -> contentBase

    // proxy:
    //   array [ { path: '*', target: '"http://localhost:3000" } ]
    //  or
    //   object { '*': { target: "http://localhost:3000" } }
    //  or
    //   object { '*': "http://localhost:3000" }
    /*proxy: [{
     path:      "dynamic/!* or /regexp/",
     target:    "http://localhost:3000",
     host:      "proxy.host", // if another HOST header needed for proxy,
     bypass:    function(req, res, options) {
     // return URL to rewrite req.url and SKIP PROXY
     // return false otherwise
     },
     rewrite:   function(req, options) {
     // do something with req if needed
     },
     configure: function(proxy) {
     // do something with http-proxy server instance if needed (add handlers etc)
     }
     }],*/
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    );
    config.entry.app = [
        'webpack-dev-server/client?http://127.0.0.1:8088',
        'webpack/hot/only-dev-server',
        ENTRY_POINT,
    ];
    /*config.entry.login = [
     'webpack-dev-server/client?http://127.0.0.1:8088',
     'webpack/hot/only-dev-server',
     ENTRY_POINT_LOGIN,
     ];*/
} else {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                sequences: true,
                booleans: true,
                loops: true,
                unused: true,
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    );
}
module.exports = config;