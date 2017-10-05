const cssLoaders = require('./cssLoaders');

module.exports = function styleLoaders(options) {
  const output = [];
  const loaders = cssLoaders(options);

  /* eslint-disable guard-for-in,no-restricted-syntax */
  for (const extension in loaders) {
    const loader = loaders[extension];
    output.push({
      test: new RegExp(`\\.${extension}$`),
      use: loader,
    });
  }
  /* eslint-enable guard-for-in,no-restricted-syntax */

  return output;
};
