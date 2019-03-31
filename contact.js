#!/usr/bin/env node
const program = require('commander');
const { prompt } = require('inquirer');
const {  mainMenuOptions , getSearchfield } = require('./menu');
const BaseFuncations = require('./baseFunctions');

program
  .version('0.0.1')
  .description('Search Engine');

/**
 * Start Program
 */
program
.command('selectMenu')
.alias("start")
.description('Start menu')
.action(async () => {
  const answers = await prompt(mainMenuOptions);
  const readinData = new BaseFuncations(answers.searchgroup)
  await readinData.readInData();
  const allSearchfields = getSearchfield(readinData.searchableField);
  const field = await prompt(allSearchfields);
  const value = await prompt(  {
    type : 'input',
    name : 'searchvalue',
    message : 'Enter search value'
  });
const result = await readinData.seachItem(field.searchfields, value.searchvalue);
console.log(result);
});

// Assert that a VALID command is provided 
if (!process.argv.slice(2).length || !/[arudl]/.test(process.argv.slice(2))) {
  program.outputHelp();
  //process.exit();
}
program.parse(process.argv)