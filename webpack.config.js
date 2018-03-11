const path = require('path');
// Not compatible with webpack 4
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
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
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  ]
};
