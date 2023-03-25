import dotenv from 'dotenv';
dotenv.config()
import yargsParse from "yargs/yargs"

const yargs = yargsParse(process.argv.slice(2))

const MONGO_USER = process.env.MONGODB_USER;
const MONGO_PASS = process.env.MONGODB_PASSWORD;
const ADMIN_MAIL = process.env.ADMIN_MAIL;
const ADMIN_PASS = process.env.ADMIN_PASS;
const ADMIN_NUMBER =process.env.ADMIN_NUMBER;
const TWILIO_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_TOKEN = process.env.TWILIO_ACCOUNT_TOKEN;

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
    MONGO_USER, 
    MONGO_PASS, 
    ADMIN_MAIL, 
    ADMIN_PASS,
    ADMIN_NUMBER,
    TWILIO_SID,
    TWILIO_TOKEN,
    port,
    mode
}