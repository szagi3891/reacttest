var path = require('path');
var webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

function getEntry(mode) {
    if (mode === 'client') {
        return {
            'client' : './src/index.js'
        };
    } else {
        return {
            'server': './src/server.js'
        };
    }
}

function getOutput(mode) {
    var outPath = mode === 'client' ? 'dist_client' : 'dist_server';

    return {
        path: path.join(__dirname, outPath),
        publicPath: '/',
        filename: 'bundle-[name].js',
        pathinfo: true
    };
}

function getPlugins(mode) {
    return [
        new webpack.optimize.UglifyJsPlugin({
            comments: false
        }),
        new htmlWebpackPlugin({
            template: './public/index.html'
        })
    ];
}

function getNode(mode) {
    if (mode === 'client') {
        return {};
    }

    return {
        target: 'node',
        node: {
            __filename: true
        }
    };
}

function getCssLoader(mode) {
    if (mode === 'client') {
        return {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        };
    } else {
        return {
            test: /\.css$/,
            //use: 'null'
            loader: 'css-loader/locals?modules',
        };
    }
}

function getLoaders(mode) {
    return [{
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
    },
    getCssLoader(mode),
    {
        test: /\.(png|jpg|gif)$/,
        loaders: ['file-loader'],
    }];
}

function make(mode) {
    return function() {
        var nodeConf = getNode(mode);

        return {
            entry: getEntry(mode),
            output: getOutput(mode),
            module: {
                loaders: getLoaders(mode),
            },
            plugins: getPlugins(mode),
            target: nodeConf.target,
            node: nodeConf.node
        };
    }
}

module.exports = {
    client: make('client'),
    server: make('server')
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
