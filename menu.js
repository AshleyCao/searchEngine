/**
 * This file is for all CLI Menu options
 */
const mainMenuOptions = [
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
  
/**
 * @function  [addContact]
 * @returns {String} Status
 */
const getSearchfield = (allfields) => {
  return {
    type: 'rawlist',
    name: 'searchfields',
    message: `Please select one in ${allfields.length} fileds you would search: `,
    choices: allfields
  }
};

module.exports = { 
    mainMenuOptions,
    getSearchfield
};