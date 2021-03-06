const path = require('path');
const BomPlugin = require('webpack-utf8-bom')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    entry: [
        'babel-polyfill',
        path.join(__dirname, '../../src/web/index'),
    ],
    output: {
        path: path.join(__dirname, '../public'),
        filename: 'bundle.js'
    },
    plugins: [
        new BomPlugin(true),
        new UglifyJsPlugin({
            uglifyOptions: {
                mangle: true,
                compress: true
            }
        }),
        new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      })
    ],
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    }
}
