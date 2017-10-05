/* eslint-disable no-console */

require('./check-versions')();

process.env.NODE_ENV = 'production';
process.env.ELECTRON_BUILD = true;

const chalk = require('chalk');
const electron = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('../config');
const greeting = require('./Utils/greeting');
const logStats = require('./Utils/logStats');
const electronLog = require('./Utils/electronLog');
const mainConfig = require('./webpack.app.base.conf');
const rendererConfig = require('./webpack.web.dev.conf');

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.app.port;

let electronProcess = null;
let manualRestart = false;
let hotMiddleware;

function startRenderer() {
  return new Promise((resolve) => {
    rendererConfig.entry.renderer = [path.join(__dirname, 'dev-client')].concat(rendererConfig.entry.app);

    const compiler = webpack(rendererConfig);
    hotMiddleware = webpackHotMiddleware(compiler, {
      log: false,
      heartbeat: 2500,
    });

    compiler.plugin('compilation', (compilation) => {
      compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
        hotMiddleware.publish({ action: 'reload' });
        cb();
      });
    });

    compiler.plugin('done', (stats) => {
      logStats('Renderer', stats);
    });

    const server = new WebpackDevServer(
      compiler,
      {
        contentBase: path.join(__dirname, '../'),
        quiet: true,
        before(app, ctx) {
          app.use(hotMiddleware);
          ctx.middleware.waitUntilValid(() => {
            resolve();
          });
        },
      },
    );

    server.listen(port);
  });
}

function startElectron() {
  electronProcess = spawn(electron, ['--inspect=5858', path.join(__dirname, '../package/main.js')]);

  electronProcess.stdout.on('data', (data) => {
    electronLog(data, 'blue');
  });
  electronProcess.stderr.on('data', (data) => {
    electronLog(data, 'red');
  });

  electronProcess.on('close', () => {
    if (!manualRestart) process.exit();
  });
}

function startMain() {
  return new Promise((resolve) => {
    mainConfig.entry.main = [path.join(__dirname, '../src/electron/index.dev.js')].concat(mainConfig.entry.main);

    const compiler = webpack(mainConfig);

    compiler.plugin('watch-run', (compilation, done) => {
      logStats('Main', chalk.white.bold('Compiling the main frame'));
      hotMiddleware.publish({ action: 'compiling' });
      done();
    });

    compiler.watch({}, (err, stats) => {
      if (err) {
        console.log(err);
        return;
      }

      logStats('Main', stats);

      if (electronProcess && electronProcess.kill) {
        manualRestart = true;
        process.kill(electronProcess.pid);
        electronProcess = null;
        startElectron();

        setTimeout(() => {
          manualRestart = false;
        }, 5000);
      }

      resolve();
    });
  });
}

function init() {
  greeting();

  Promise.all([startRenderer(), startMain()])
    .then(() => {
      startElectron();
    })
    .catch((err) => {
      console.error(err);
    });
}

init();

module.exports = {
  close: () => {
    electronProcess.kill();
  },
};

