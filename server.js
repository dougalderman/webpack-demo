require('dotenv').config();
const node_env = process.env.NODE_ENV;
const port = process.env.PORT;

const express = require('express');
const expressSession = require('express-session');

const app = express();

console.log('node_env: ', node_env);
if (node_env !== 'production') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('./webpack.dev.js');
  const compiler = webpack(config);
  // Tell express to use the webpack-dev-middleware and use the webpack.config.js
  // configuration file as a base.
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
}
else {
  var app_dir = process.env.APP_DIR;
  console.log('app_dir = ' + app_dir);
  app.use(express.static(__dirname + app_dir));
  app.use(expressSession({
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false
  }));
}

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '\n');
});
