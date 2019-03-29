
const mainMenuOptions = [
    {
      type: 'list',
      name: 'Mainmenu',
      message: 'Welcome to search engine!\n Which table do you want to search first?',
      choices: [
        'tickets',
        'organizations',
        'users'
      ]
    }
];
  
const selectMenu = (selectItem)=>  {
    switch(selectItem){
        
    }
};
module.exports = { 
    mainMenuOptions,
    selectMenu
};