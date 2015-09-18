/* global __dirname */
'use strict';

// https://github.com/petehunt/webpack-howto
// https://webpack.github.io/docs/usage-with-bower.html
var path = require('path'),
    webpack = require('webpack')
    ;

module.exports = {
    entry: './main.js',
    output: {
        path: __dirname,
        filename: 'app.js'
    },
    resolve: {
        root: [path.join(__dirname, 'bower_components')]
    },
    module: {
        loaders: [
          { test: /\.jsx?$/, loaders: ['babel'], exclude: /node_modules/ }
        ]
    },
    stats: {
        colors: true,
        reasons: true,
    },
    plugins: [],
    devtool: 'source-map'
};
