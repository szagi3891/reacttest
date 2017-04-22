const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


const getPluginUglify = () => new webpack.optimize.UglifyJsPlugin({ comments: false });

const getPluginCss = () => new ExtractTextPlugin('styles.css');

const getNodeConfig = () => ({
    target: 'node',
    node: {
        __filename: true
    }
});

const getNode = (mode) => mode === 'client' ? {} : getNodeConfig();

const getLoaderSvg = () => ({
    test: /\.svg$/,
    loaders: ['file-loader']
});

const getLoaderJsx = () => ({
    test: /\.jsx?$/,
    use: [{
        loader: 'babel-loader'
    }/*, {
        loader: 'eslint-loader',
        options: {
            configFile: './.eslint'
        }
    }*/]
});

const getLoaderCssClient = () => ({
    test: /\.css$/,
    //use: [ 'style-loader', 'css-loader' ]
    use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader"
    })
});

const getLoaderCssNode = () => ({
    test: /\.css$/,
    //use: 'null'
    loader: 'css-loader/locals?modules',
});

const getLoaderImage = () => ({
    test: /\.(png|jpg|gif|ico)$/,
    loaders: ['file-loader'],
});

const make = (mode) => {
    const nodeConf = getNode(mode);

    return {
        entry: mode === 'client' ? [
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000',
            './src/index.js'
        ] : [
            './src/server.js'
            //'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
        ],
        output: {
            path: path.join(__dirname, 'dist/static'),
            publicPath: '/static/',
            filename: mode === 'client' ? 'index.js' : '../server.js',
            pathinfo: true
        },
        //watch: true,
        module: {
            loaders: [
                getLoaderJsx(),
                getLoaderSvg(),
                mode === 'client' ? getLoaderCssClient() : getLoaderCssNode(),
                getLoaderImage()
            ],
        },
        plugins: mode === 'client' ? [
            getPluginUglify(),
            getPluginCss()
        ] : [
            getPluginUglify(),
        ],
        target: nodeConf.target,
        node: nodeConf.node
    };
};

module.exports = [
    make('client'),
    make('server')
];


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

