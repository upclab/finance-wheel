/* eslint-disable no-console */

const chalk = require('chalk');

module.exports = function logStats(process, data) {
  let log = '';

  log += chalk.yellow.bold(`┏ ${process} Process ${new Array((19 - process.length) + 1).join('-')}`);
  log += '\n\n';

  if (typeof data === 'object') {
    data.toString({
      colors: true,
      chunks: false,
    })
    .split(/\r?\n/).forEach((line) => {
      log += `  ${line} \n`;
    });
  } else {
    log += `  ${data}\n`;
  }

  const endLine = `┗ ${new Array(28 + 1).join('-')}`;

  log += `\n${chalk.yellow.bold(endLine)}\n`;

  console.log(log);
};
