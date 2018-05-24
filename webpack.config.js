const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const express = require('express');

module.exports = {
  entry: ['babel-polyfill', './src/index.js'] ,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: path.join(__dirname, 'dist')
  },
  module: {
    loaders: [
      {
        // enforce: 'pre',
        test: /\.js$/,
        loaders: ['eslint-loader'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.(png|jpg|gif|gltf|glb)$/,
        loader: "file-loader",
        options: {
          name: "[name]-[hash].[ext]"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/public/index.template.html',
      filename: 'index.html',
      inject: 'head'
    }),

    new CopyWebpackPlugin([
     {from: './src/static/', to: 'static'}
    ])

  ],
  devtool: 'source-map',
  devServer: {
    hot: true,
    contentBase: 'dist',
    // staticOptions: {
    //   redirect: false
    // },
    // before(app){
    //   app.use(express.static('static'))
    // },
    port: 8080
  }
};
