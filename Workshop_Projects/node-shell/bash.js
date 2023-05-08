const pwd = require('./pwd.js');
const ls = require('./ls.js')
const cat = require('./cat.js')



// output a prompt
process.stdout.write('prompt > ');

// the stdin 'data' event fires after a user types in a line 
process.stdin.on('data', (data) => {
    const cmd = data.toString().trim(); //remove the new line 

    if (cmd === 'pwd') {
        pwd();
    } else if (cmd === 'ls') {
        ls();
    } 
    else if (cmd.startsWith('cat ')){
        const filePath = cmd.split(' ')[1];
        cat(filePath);
    }

    process.stdout.write('\nprompt > ');
});

