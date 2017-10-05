/* eslint-disable no-console */

const chalk = require('chalk');
const { say } = require('cfonts');

module.exports = function greeting() {
  const cols = process.stdout.columns;
  let text = '';

  if (cols > 104) {
    text = 'Finance|Wheel';
  } else {
    text = false;
  }

  if (text) {
    say(text, {
      font: 'block',
      space: false,
    });
  } else {
    console.log(chalk.blue.bold('\n  Finance Wheel'));
  }
};
