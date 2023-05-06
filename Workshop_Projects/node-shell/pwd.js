import { cwd } from 'node:process'

// process.stdout.write('prompt > ')

module.exports = function pwd() {
    process.stdout.write(cwd());
}