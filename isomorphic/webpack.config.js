var path = require('path');
var webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

function getEntry(mode) {
    return mode === 'client' ? './src/index.js' : './src/server.js';
/*
    if (mode === 'client') {
        return {
            'client' : './src/index.js'
        };
    } else {
        return {
            'server': './src/server.js'
        };
    }
*/
}

function getOutput(mode) {
    var filename = mode === 'client' ? 'index.js' : 'server.js';

    return {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        //filename: 'bundle-[name].js',
        filename: filename,
        pathinfo: true
    };
}

function getPlugins(mode) {
    var out = [
        new webpack.optimize.UglifyJsPlugin({
            comments: false
        })
    ];

    if (mode === 'client') {
        out.push(new htmlWebpackPlugin({
            template: './public/index.html'
        }));
    }

    return out;
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


module.exports = [
    make('client'),
    make('server')
];
