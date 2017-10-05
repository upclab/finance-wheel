const webpack = require('webpack');

module.exports = function pack(config) {
  return new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      if (err) reject(err.stack || err);
      else if (stats.hasErrors()) {
        let error = '';

        stats.toString({
          chunks: false,
          colors: true,
        })
        .split(/\r?\n/)
        .forEach((line) => {
          error += `    ${line}\n`;
        });

        reject(error);
      } else {
        resolve(stats.toString({
          chunks: false,
          colors: true,
        }));
      }
    });
  });
};
