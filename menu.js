const { prompt } = require('inquirer');
const BaseFuncations = require('./baseFunctions');
/**
 * This file is for all CLI Menu options
 */


class Menu {

constructor(){
 this.baseFuncModel = null;
 this.mainMenuOptions = [
  {
    type: 'list',
    name: 'searchgroup',
    message: 'Welcome to search engine!\n Which table do you want to search first?',
    choices: [
      'tickets',
      'organizations',
      'users'
    ]
  }
];
this.restartMenu = [
{
type: 'list',
    name: 'restartOptions',
    message: 'Which step you want to do?',
    choices: [
      'select again in the same group',
      'select again in the different group',
      'Done! Exit'
    ]
}
];
this.confirmExport = [
  {
    type: 'confirm',
    name: 'ifExport',
    message: 'Do you want to export this result?'
  }
]
}
/**
 * Get seachable fields
 * @param {*} allfields 
 * @returns all searchable fileds
 */
 getSearchfield(allfields){
  return {
    type: 'rawlist',
    name: 'searchfields',
    message: `Please select one in ${allfields.length} fileds you would search: `,
    choices: allfields
  }
};

  /**
   * Select read in file among data.json user.json tickets.json
   * @returns if error happens whern open and read json file 
   */
  async selectGroup(){
    const answers = await prompt(this.mainMenuOptions);
    this.baseFuncModel = new BaseFuncations(answers.searchgroup)
    const ifHasError =  await this.baseFuncModel.readInData();
    return ifHasError;
  }
  /**
   * Search data in search fileds
   * print out research result
   */
  async selectField(){
    const allSearchfields = this.getSearchfield(this.baseFuncModel.searchableField);
    const field = await prompt(allSearchfields);
    const value = await prompt(  {
      type : 'input',
      name : 'searchvalue',
      message : 'Enter search value'
    });
    const result = await this.baseFuncModel.seachItem(field.searchfields, value.searchvalue);
    console.log(result);
    // Only enable export data function when there are more than one result found
    if (result.indexOf('Sorry') === -1) {
      const ifexport = await prompt(this.confirmExport);
    if(ifexport.ifExport)
    this.baseFuncModel.exportData();
    }
    return;
  }
/**
 * Recuisive menu
 */
  async selectRestartOption(){
    const resOption = await prompt(this.restartMenu);
    switch(resOption.restartOptions){
      case 'select again in the same group':
      await this.selectField();
      break;
      case 'select again in the different group':
      await this.runningMenu();
      return;
      case 'Done! Exit' :
      return;
    }
    await this.selectRestartOption();
    return;
  }
/**
 * run when user select search in different file
 * Combine select file and select field functions
 */
  async runningMenu () {
    const hasError = await this.selectGroup();
    if(!hasError){
      await this.selectField();
      await this.selectRestartOption();
  } else {
    console.error('sorry, something is wrong');
    return;
  }

}

}

module.exports =  Menu;