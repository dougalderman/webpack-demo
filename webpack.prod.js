const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Production'
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  module: {
    rules: [
      {
        test: /\.(s*)css$/, // Test for CSS or Sass
        use:
          [ MiniCssExtractPlugin.loader,
        'css-loader', 'sass-loader']
      }
    ]
  }
});
