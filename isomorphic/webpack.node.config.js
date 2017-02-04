var path = require('path');
var webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
      //'client' : './src/index.js',
      'server': './src/server.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            use: [{
                loader: 'babel-loader'
            }/*, {
                loader: 'eslint-loader',
                options: {
                    configFile: './.eslint'
                }
            }*/]
        }, {
            test: /\.svg$/,
            loaders: ['file-loader'],
        }, {
            test: /\.css$/,
            //use: 'null'
            loader: 'css-loader/locals?modules',
        }, {
            test: /\.(png|jpg|gif)$/,
            loaders: ['file-loader'],
        }]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle-[name].js',
        pathinfo: true
    },
    target: 'node',
    node: {
        __filename: true
    }
};

/*
npm install postcss-loader autoprefixer --save-dev

var autoprefixer = require('autoprefixer');

module.exports = {
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'css-loader!postcss-loader'
    }]
  },
  postcss: [
    autoprefixer()
  ]
};
*/
