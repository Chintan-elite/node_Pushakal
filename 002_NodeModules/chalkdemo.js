//const chalk = require("chalk")
import chalk from 'chalk';

console.log(chalk.blue("Hello"));

console.log(chalk.blue('Hello') + ' World' + chalk.red('!'));

console.log(chalk.red('Hello', chalk.underline.bgBlue('world') + '!'));

