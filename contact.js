#!/usr/bin/env node
const program = require('commander');
const Menu = require('./menu');
program
  .version('0.0.1')
  .description('Search Engine');

/**
 * Start Program
 */
program
.command('startEngine')
.alias("start")
.description('Start menu')
.action(async () => {
  const menu = new Menu;
  await menu.runningMenu();
});

program.on('command:*', function () {
  console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
  process.exit(1);
});

// Assert that a VALID command is provided 
if (!process.argv.slice(2).length || !/[arudl]/.test(process.argv.slice(2))) {
  program.outputHelp();
  process.exit();
}
program.parse(process.argv)