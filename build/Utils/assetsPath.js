const path = require('path');
const config = require('../../config');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = function assetsPath(_path) {
  const assetsSubDirectory = isProduction
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory;
  return path.posix.join(assetsSubDirectory, _path);
};
