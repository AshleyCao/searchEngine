const jsonfile = require('jsonfile')
const Table = require('cli-table2');
const errorReport = './data/error.txt';
const fs = require('fs');
/**
 * All executions on data
 */
class BaseFuncations {
    /**
     * group: select among user, tickets and organizations
     * searchableField : list all fields for search
     * firstElement: for set up search fields
     * allData: all records in each json file
     * findResult: all found results
     * fileIndex: for creatign unique file name of export data file
     */
    constructor(group){
        this.group = group.toString();
        this.fileName = `./data/${this.group}.json`;
        this.searchableField = [];
        this.firstElement = null;
        this.allData = [];
        this.findResult = [];
        this.fileIndex =0;
    }
    /**
     * Get searchable fields
     * @param {*} firstObj 
     * @returns searchable fields
     */
    getAllSearchableField(firstObj){
        return Object.keys(firstObj);
    }
    
    /**
     * Initalise all varables
     */
    readInData(){
        let ifErrorExist = false;
        try { 
            const data =  jsonfile.readFileSync(this.fileName)
            this.firstElement = data[0];
            this.searchableField = Object.keys(this.firstElement);
            this.allData = data;
        } catch(e){
            ifErrorExist = true;
            console.error(`File error ${e}`);
            this.writeErrorReport('File error', e.toString());
        }

        return ifErrorExist;
    }

    /**
     * Search for desire items
     * @param {*} filed 
     * @param {*} value 
     * @returns searchResult
     */

    async seachItem(filed,value){
        let searchResult = null;
        value ? searchResult =   filterValue(this.allData, filed, value) : searchResult =  this.allData;
        
        if (searchResult.length == 0) {
        searchResult = "Sorry, there is no result";
        } else {
            this.findResult = searchResult;
            searchResult = await this.reformatSearchRes(searchResult);
        }
        return searchResult;
        /**
         * Find item via key and val
         * @param {*} obj 
         * @param {*} key 
         * @param {*} value 
         */
        function filterValue(obj, key, value) {
            return obj.filter((v)=>{ 
                // In 'tags' field, make user able to select by one value in tags array
                if(key === 'tags') {
                    if (v[key].toString().indexOf(value) !== -1){
                        return v[key].toString().indexOf(value) !== -1
                    }
                } else {
                return v[key] == value
            }
            });
          }
    }
    /**
     * Export search data
     * File is named by time, search group and file index
     */
    exportData(){
        try{
        const exportDate = new Date(Date.now()).toISOString().split('T')[0] + this.group.toString() + (++this.fileIndex);
        const exportfile = `./data/exportData/${exportDate}.json`;
        jsonfile.writeFileSync(exportfile, this.findResult, { spaces: 2, EOL: '\r\n' });
        console.log(`Please find export data file at ${exportfile}`);
        } catch (e) {
            console.error(`Export data error ${e}`);
            this.writeErrorReport('export file error', e.toString());
        }
    }
    /**
     * Record all error and write in error report
     * @param {*} errorType 
     * @param {*} error 
     */
    writeErrorReport(errorType, error){
        try{
            const occurTime = new Date(Date.now()).toISOString();
            const exportError =`time: ${occurTime}, type:${errorType}, info: ${error}` ;
            fs.appendFile(errorReport, `\n${exportError}`, (err) => {  
                if (err) throw err;
               
            }); 
        } catch (e) {
                console.error(`Fail to write error to error.josn due to ${e}`);
        }
    }
    
    /**
     * Set search result in more readable format
     * Use Vertical Table (npm) 
     * Table accepts Array of objects
     * @param {*} res 
     * @returns Formatted Data: string
     */
    reformatSearchRes(res){
        const dataInTableFormat = new Table();
        try{
        res.forEach((element, index) => {
            dataInTableFormat.push({Record: index+1})
            Object.keys(element).map((key) => {
              let newObj = {};
              //Each object val for Table must be string/plat format
              //change 'tags' value from array to string
              newObj[key]  = key === 'tags'? element[key].toString() : element[key];
              dataInTableFormat.push(newObj);
            });
        });
    } catch(e) {    
        console.error(`reformat error ${e}`);
        this.writeErrorReport('reformat error', e.toString());
    }
      
        return dataInTableFormat.toString(); 
    }
}

module.exports =  BaseFuncations;