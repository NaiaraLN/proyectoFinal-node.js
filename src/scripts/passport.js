import passport from "passport";
import {Strategy as LocalStrategy} from 'passport-local';
import MongoDao from "../model/mongoDao.js";
import bCrypt from 'bcrypt';
import {signup} from "../services/nodemailer.js"
import logger from './logger.js'

/* -------------PASSPORT-------------- */
passport.use('register', new LocalStrategy({
    passReqToCallback:true
}, async (req,username,password, done) => {
    try {
        const {mail,address,age,phone} = req.body;
        const file = req.file.originalname
        const userdb = await MongoDao.getUser('users',username)
        if (userdb ==! null || userdb ==! undefined) {
            return done('already registered')
        }
        const newUser = {
            username: username,
            mail: mail,
            password: createHash(password),
            address: address,
            age: age,
            phone: phone,
            avatar: file
        }
        await MongoDao.save('users',newUser)
        const user = await MongoDao.getUser('users',username)
        await signup(user)
        return done(null, user)
        
    } catch (error) {
        logger.error(`Error al registrar el usuario ${error}`)
    }
    
}));

passport.use('login', new LocalStrategy(async (username,password,done) => {
    try {
        console.log('passport configura login')
        const user = await MongoDao.getUser('users',username)
        if (!user) {
            return done(null, false)
        }
        const userPws = user.password
        if(!isValidPassword(userPws, password)){
            return done(null, false)
        }
        return done(null, user)
    } catch (error) {
        logger.error(`Error de login ${error}`)
    }
}));

function createHash(password) {
    return bCrypt.hashSync(
            password,
            bCrypt.genSaltSync(10),
            null);
}
function isValidPassword(userPsw, password) {
    return bCrypt.compareSync(password, userPsw);
}

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    MongoDao.models['users'].findById(id, done);
});

export default passport