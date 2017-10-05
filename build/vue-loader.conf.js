const cssLoaders = require('./Utils/cssLoaders');
const config = require('../config');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  loaders: cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
  }),
  extractCSS: isProduction,
};
