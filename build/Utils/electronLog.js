/* eslint-disable no-console */

const chalk = require('chalk');

module.exports = function electronLog(data, color) {
  let log = '';
  const dataArray = data.toString().split(/\r?\n/);

  dataArray.forEach((line) => {
    log += `  ${line}\n`;
  });

  if (/[0-9A-z]+/.test(log)) {
    let message = chalk[color].bold('┏ Electron -------------------');
    message += '\n\n';
    message += log;
    message += chalk[color].bold('┗ ----------------------------');
    message += '\n';

    console.log(message);
  }
};
