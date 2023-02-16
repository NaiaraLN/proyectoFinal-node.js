require('dotenv').config()

const MONGO_USER = process.env.MONGODB_USER;
const MONGO_PASS = process.env.MONGODB_PASSWORD;
const ADMIN_MAIL = process.env.ADMIN_MAIL;
const ADMIN_PASS = process.env.ADMIN_PASS;


module.exports = {MONGO_USER, MONGO_PASS, ADMIN_MAIL, ADMIN_PASS}