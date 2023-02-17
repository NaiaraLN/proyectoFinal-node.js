const {Router} = require("express");
const {isAuth} = require("../middleware/passport")
const passport = require("passport")
const {userDB} = require('../daos/importsDao')
const multer = require("multer");
const path = require("path")
const logger = require('../scripts/logger')

const passportRouter = Router()

let storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, path.join(__dirname, '../../public', 'img'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

passportRouter.get("/", isAuth, (req, res) => {
    const { url, method } = req
    logger.info(`Ruta ${method} ${url} implementada`)
    res.send("Welcome!")
})
passportRouter.get("/carrito", isAuth, (req,res) =>{
    const { url, method } = req
    logger.info(`Ruta ${method} ${url} implementada`)
    res.send("cart user")
})
passportRouter.get("/profile/:username", isAuth, async (req,res) => {
    const { url, method } = req
    logger.info(`Ruta ${method} ${url} implementada`)
    const username = req.params.username;
    const user = await userDB.getUser(username);
    res.json(user)
})

// REGISTER
passportRouter.get('/register', (req, res) =>{
    const { url, method } = req
    logger.info(`Ruta ${method} ${url} implementada`)
    res.render('register')
})
passportRouter.post('/register', upload.single("avatar"), passport.authenticate('register', {failureRedirect: '/failregister', successRedirect: '/'}))

passportRouter.get('/failregister', (req, res) =>{
    const { url, method } = req
    logger.info(`Ruta ${method} ${url} implementada`)
    logger.error('Error de registro de usuario')
    res.send("Error de registro de usuario")
})

// LOGIN
passportRouter.get('/login', (req, res) =>{
    const { url, method } = req
    logger.info(`Ruta ${method} ${url} implementada`)
    res.render('login')
})
passportRouter.post('/login', passport.authenticate('login', {failureRedirect: '/faillogin', successRedirect: '/'}))
passportRouter.get('/faillogin', (req,res) => {
    const { url, method } = req
    logger.info(`Ruta ${method} ${url} implementada`)
    logger.error('error de login')
    res.send("Error de login")
})

// LOGOUT
passportRouter.get('/logout', (req, res) =>{
    const { url, method } = req
    logger.info(`Ruta ${method} ${url} implementada`)
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/login');
    });
})

module.exports = passportRouter