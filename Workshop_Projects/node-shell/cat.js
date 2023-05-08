const fs = require('node:fs')


const cat = (filePath) => {
    fs.readFile(`${filePath}`, 'utf-8',(err,data) => {
        if(err){
            console.error(err);
        }
    
        console.log(data);
    })
}

module.exports = cat;