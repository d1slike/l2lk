var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname,
        filename: "bundle.js",
        publicPath: "/static/"
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: "babel",
                include: path.resolve(__dirname, "src"),
                query: {
                    presets: ["es2015", "stage-0", "react", "react-hmre"]
                }
            },
            {
                test: /\.css$/,
                include: path.resolve(__dirname, "css"),
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            }
        ]
    },

    resolve: {
        extensions: ['', '.js', '.jsx', '.css'],
        modulesDirectories: ['node_modules']
    },

    plugins: [
        new ExtractTextPlugin('bundle.css')
    ]

};
