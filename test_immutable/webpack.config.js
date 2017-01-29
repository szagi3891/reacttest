var path = require('path');
var webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    module: {
        loaders: [{
            test: /\.jsx?$/,
            use: [{
                loader: 'babel-loader'
            }, {
                loader: 'eslint-loader',
                options: {
                    configFile: './.eslint'
                }
            }]
        }, {
            test: /\.svg$/,
            loaders: ['file-loader'],
        }, {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        }, {
            test: /\.(png|jpg|gif)$/,
            loaders: ['file-loader'],
        }]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            comments: false
        }),
        new htmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
};
