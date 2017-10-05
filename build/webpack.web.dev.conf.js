const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const styleLoaders = require('./Utils/styleLoaders');
const webpack = require('webpack');
const config = require('../config');
const baseWebpackConfig = require('./webpack.web.base.conf');

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach((name) => {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name]);
});

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: styleLoaders({ sourceMap: config.dev.cssSourceMap }),
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
});

webpackConfig.plugins.push(
  new webpack.DefinePlugin({
    'process.env': config.dev.env,
  }),
  // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  // https://github.com/ampedandwired/html-webpack-plugin
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'index.html',
    inject: true,
  }),
  new FriendlyErrorsPlugin(),
);

module.exports = webpackConfig;
