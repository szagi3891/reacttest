var path = require('path');
//var webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['babel-loader']
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
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    plugins: [/*{
        new webpack.optymalize.UglifyJsPlugin({
            comments: true,
            mangle: false,
            compress: {
                warnings: true
            }
        })
    }*/]
};
