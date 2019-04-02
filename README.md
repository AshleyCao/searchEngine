# Search engine
##  Introduction
Seach engine is a simple CLI application to search the data in json file and return the results in ***table format***. This application doesn't support wildcard search. So please input exact value to get certain records.
You could search by one object in an array( such as tags:['a', 'b']).

## Prerequisites
  - Install [Node.js](https://nodejs.org/en/download/)
  - Install [yarn](https://yarnpkg.com/en/docs/install#windows-stable)

## Installation
1. Clone this repository
2. Navigate to your terminal and change your directory to the searchEngine.
3. Run `` yarn install `` to install node dependencies.
>Optional
4. Run ``yarn link`` to creates a symbolic link between project directory and executable command.

## Usage
1. start projet
In CLI type ```node start.js start``` (If you have run ```yarn link```, you can also start by ```startengine start```)
2. Search Data
2.1 select file/group and select search field
![START](https://github.com/AshleyCao/searchEngine/blob/master/screenshots/start.PNG "Logo Title Text 1")
2.1 Input search value to get result, please input exact data, no wildcard search supported here.
You can search by one object in tags. 
![GETRESULT](https://github.com/AshleyCao/searchEngine/blob/master/screenshots/select%26search.PNG "Logo Title Text 1")
3. User can also export search result to new json file
![EXPORTDATA](https://github.com/AshleyCao/searchEngine/blob/master/screenshots/exportdata.PNG)
4. User can search again in the same file/different files or just exit
![RECUISIVEMENU](https://github.com/AshleyCao/searchEngine/blob/master/screenshots/recusive.PNG)

## About errors
All catch error will be written in error.txt automatically

## About testing
Search Engine uses [Jest](https://jestjs.io/) as testing framework and there are five testing cases in baseFunctions.test.js.
Run ```yarn test``` to get test suit.

## Plugins
Search Engine is currently extended with the following plugins.

| Plugin | README |
| ------ | ------ |
| commander | [README.md](https://github.com/tj/commander.js/blob/master/Readme.md) |
| inquirer | [README.md](https://github.com/SBoudrias/Inquirer.js/blob/master/README.md) |
| jsonfile | [README.md](https://github.com/jprichardson/node-jsonfile/blob/master/README.md) |
|cli-table2 | [README.md](https://github.com/jamestalmage/cli-table2/blob/master/README.md) |
| jest | [README.md](https://github.com/facebook/jest/blob/master/README.md) |

## Some attempts 
- Typescript

Tried to use typescript with Node.js. 
As a develoepr with object oriented background(Thanks! Java), typescript is a better option for me. Tried to set up once, but there is something wrong with the configuration. Given time frame and scope of this project(ts is more suitable for large application). I chose to stay with Js.

- Mongodb

I was thinking to manage data in json files with Mongodb. That was how I started as well. However, after gave it a second thought, I realized I may make this project complicated. So...no mongdb.

- Error.txt

Error report was in json format. My origin design was to create one error.json file which recorded error occur time, error type and error info. But I couldn't fix appending problem. Tried solution in [this](https://github.com/jprichardson/node-jsonfile/issues/67), but "read in data --> Object.assign --> write new data " would result block issue. As a result, I replaced json with plain txt
