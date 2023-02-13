require('dotenv').config()

const MONGO_USER = process.env.MONGODB_USER;
const MONGO_PASS = process.env.MONGODB_PASSWORD;


module.exports = {MONGO_USER, MONGO_PASS}