const yargsParse = require('yargs/yargs');

const yargs = yargsParse(process.argv.slice(2))

const {port, mode} = yargs
    .boolean('debug')
    .alias({
        p: 'port',
        m:'mode'
    })
    .default({
        port: 8080,
        mode: 'FORK'
    })
    .argv

module.exports = {port, mode}