# Search engine
##  Introduction
Seach engine is a simple CLI application to search the data in json file and return the results in table format. This application doesn't support wildcard search. So please input exact value to get certain records.
You could search by one object in an array( such as tags:['a', 'b']).

## Prerequisites
  - Install [Node.js](https://nodejs.org/en/download/)
  - Install [yarn](https://yarnpkg.com/en/docs/install#windows-stable)
## Installation
1. Clone this repository
2. Navigate to your terminal and change your directory to the searchEngine.
3. Run `` yarn install `` to install node dependencies.
>Optional
4. Run yarn link to creates a symbolic link between project directory and executable command.

## Usage
1. start projet
In CLI type ```node start.js start``` (If you have run ```yarn link```, you can also start by ```startengine start```)
2. Search Data
2.1 select file/group and select search field
![START](https://github.com/AshleyCao/searchEngine/blob/master/screenshots/start.PNG "Logo Title Text 1")
