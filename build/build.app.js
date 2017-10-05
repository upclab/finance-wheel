/* eslint-disable no-console  */

process.env.NODE_ENV = 'production';

const chalk = require('chalk');
const del = require('del');
const Multispinner = require('multispinner');

const greeting = require('./Utils/greeting');
const packConf = require('./Utils/packConf');
const logStats = require('./Utils/logStats');

const mainConfig = require('./webpack.app.base.conf');
const rendererConfig = require('./webpack.app.prod.conf');

const errorLog = `${chalk.bgRed.white(' ERROR ')} `;
const okayLog = `${chalk.bgBlue.white(' OKAY ')}`;

greeting();
logStats('App Production', chalk.white.bold('Starting builidng for production'));

del.sync(['package/*', '!.gitkeep']);

const tasks = ['main', 'renderer'];
const m = new Multispinner(tasks, {
  preText: 'building',
  postText: 'process',
});

let results = '';

m.on('success', () => {
  process.stdout.write('\x1B[2J\x1B[0f');

  logStats('App Production', results);
  logStats('App Production', `${okayLog} time to wrap it up with electron builder..`);
  process.exit();
});

packConf(mainConfig).then((result) => {
  results += `${result}\n\n`;
  m.success('main');
}).catch((err) => {
  m.error('main');
  console.log(`\n  ${errorLog}failed to build main process`);
  console.error(`\n${err}\n`);
  process.exit(1);
});

packConf(rendererConfig).then((result) => {
  results += `${result}\n\n`;
  m.success('renderer');
}).catch((err) => {
  m.error('renderer');
  console.log(`\n  ${errorLog}failed to build renderer process`);
  console.error(`\n${err}\n`);
  process.exit(1);
});
