const path = require('path');
// Not compatible with webpack 4
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  /* entry: {
    app: './src/index.js',
  }, */
  entry: [
    // Add the client which connects to our middleware
    // You can use full urls like 'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr'
    // useful if you run your app from another point like django
    'webpack-hot-middleware/client',
    // And then the actual application
    './src/index.js'
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      /* CSS only--no splitting out
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      } */
      {
        test: /\.(s*)css$/, // Test for CSS or Sass
        /*use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        }) */
        use:
          [ MiniCssExtractPlugin.loader,
        'css-loader', 'sass-loader']
      },
      {
        // Image files
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    /*
    // new ExtractTextPlugin('styles.css')
    //if you want to pass in options, you can do so:
    new ExtractTextPlugin({
      filename: 'style.css'
    }) */
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    new HtmlWebpackPlugin({
      title: 'Output Management'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  // following for development only
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  }
};
