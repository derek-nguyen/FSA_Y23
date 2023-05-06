import pwd from './pwd.js'
// console.log(cwd())

// output a prompt
process.stdout.write('prompt > ')

// the stdin 'data' event fires after a user types in a line 
process.stdin.on('data', (data) => {
    const cmd = data.toString().trim(); //remove the new line 
    // const cmd = data; //remove the new line 

    if (cmd === 'pwd') {
        // process.stdout.write(cwd());
        process.stdout.write(pwd());
    }
    // process.stdout.write('You Typed: ' + cmd);
    process.stdout.write('\nprompt > ')
});

