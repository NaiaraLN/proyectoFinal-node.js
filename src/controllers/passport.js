const passport = require("passport");
const {Strategy: LocalStrategy} = require('passport-local');
const {userDB} = require('../daos/importsDao');
const bCrypt = require('bcrypt');
const {signup} = require("../services/nodemailer")
const logger = require('../scripts/logger')

/* -------------PASSPORT-------------- */
passport.use('register', new LocalStrategy({
    passReqToCallback:true
}, async (req,username,password, done) => {
    try {
        const {mail,address,age,phone} = req.body;
        const file = req.file.originalname
        const userdb = await userDB.getUser(username)
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
        await userDB.saveUser(newUser)
        const user = await userDB.getUser(username)
        await signup(user)
        return done(null, user)
    } catch (error) {
        logger.error(`Error al registrar el usuario ${error}`)
    }
    
}));

passport.use('login', new LocalStrategy(async (username,password,done) => {
    try {
        const user = await userDB.getUser(username)
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
    userDB.model.findById(id, done);
});

/* ---AUTH--- */
function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }
}

/* --isAdmin-- */
async function isAdmin(req,res,next){
    const user = await userDB.getUser(req.user.username);
    if(user.username === "admin"){
        next()
    }else{
        res.send(null)
    }
}

module.exports = {isAuth, isAdmin};