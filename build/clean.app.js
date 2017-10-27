/* eslint-disable no-console */

const del = require('del');
const chalk = require('chalk');

const doneLog = `${chalk.bgGreen.white(' DONE ')} `;

del.sync(['package/*', 'app/*']);
console.log(`\n${doneLog}\n`);
process.exit();
