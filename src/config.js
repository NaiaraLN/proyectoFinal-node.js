import dotenv from 'dotenv';
dotenv.config()
import yargsParse from "yargs/yargs"

const yargs = yargsParse(process.argv.slice(2))

const MONGO_URI = process.env.MONGO_URI;
const ADMIN_MAIL = process.env.ADMIN_MAIL;
const ADMIN_PASS = process.env.ADMIN_PASS;

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
    

export {
    MONGO_URI,
    ADMIN_MAIL, 
    ADMIN_PASS,
    port,
    mode
}