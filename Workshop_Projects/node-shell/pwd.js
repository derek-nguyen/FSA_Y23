module.exports = function pwd() {
    process.stdout.write(process.cwd());
}