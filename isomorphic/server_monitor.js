var http = require('http');
var express = require('express');

var app = express();

var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var compiler = webpack(webpackConfig);

app.use(require("webpack-dev-middleware")(compiler, {
    hot: true
}));

var server = http.createServer(app);

server.listen(2999, function() {
    console.log("Listening on %j", server.address());
});
