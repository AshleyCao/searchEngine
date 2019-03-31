const jsonfile = require('jsonfile')
const Table = require('cli-table2');

class BaseFuncations {
    /**
     * searchableField : list all fields for search
     * firstElement: for set up search fields
     * @param {*} group  
     */
    constructor(group){
        this.fileName = `./data/${this.group}.json`;
        this.searchableField = [];
        this.firstElement = null;
        this.allData = [];
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
        try { 
            const data =  jsonfile.readFileSync(this.fileName)
            this.firstElement = data[0];
            this.searchableField = Object.keys(this.firstElement);
            this.allData = data;
        } catch(e){
            console.error(e);
        }
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
            return obj.filter((v)=>{ return v[key] == value});
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
      
        return dataInTableFormat.toString(); 
    }
}

module.exports =  BaseFuncations;