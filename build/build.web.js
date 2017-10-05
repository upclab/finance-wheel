/* eslint-disable no-console */

require('./check-versions')();

const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');

const config = require('../config');
const greeting = require('./Utils/greeting');
const logStats = require('./Utils/logStats');
const webpackConfig = require('./webpack.web.prod.conf');

process.env.NODE_ENV = 'production';

greeting();
logStats('Web Production', chalk.white.bold('Starting builidng for production'));

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), (error) => {
  if (error) throw error;
  webpack(webpackConfig, (err, stats) => {
    if (err) throw err;

    logStats('Web Production', stats);

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'));
      process.exit(1);
    }

    logStats('Web Production', chalk.green('Build complete'));
  });
});
