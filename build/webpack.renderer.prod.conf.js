const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BabiliWebpackPlugin = require('babili-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const assetsPath = require('./Utils/assetsPath');
const baseWebpackConfig = require('./webpack.renderer.base.conf');

baseWebpackConfig.target = 'electron-renderer';

const styleLoaders = require('./Utils/styleLoaders');
const config = require('../config');

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
    }),
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.app.assetsRoot,
    filename: assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: assetsPath('js/[id].[chunkhash].js'),
  },
});

webpackConfig.plugins.push(
  new BabiliWebpackPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"',
  }),
  new HtmlWebpackPlugin({
    filename: config.app.index,
    template: 'index.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
    },
    chunksSortMode: 'dependency',
  }),
  new webpack.HashedModuleIdsPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks(module) {
      // any required modules inside node_modules are extracted to vendor
      return (
        module.resource &&
        /\.js$/.test(module.resource) &&
        module.resource.indexOf(
          path.join(__dirname, '../node_modules'),
        ) === 0
      );
    },
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    chunks: ['vendor'],
  }),
  new CopyWebpackPlugin([
    {
      from: path.join(__dirname, '../static'),
      to: path.join(__dirname, '../package/static'),
      ignore: ['.*'],
    },
  ]),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
  }),
);

module.exports = webpackConfig;
