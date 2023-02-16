const {Router} = require("express");
const {isAuth} = require("../scripts/passport")
const passport = require("passport")
const {userDB} = require('../daos/importsDao')
const multer = require("multer");
const path = require("path")


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
    res.send("Welcome!")
})
passportRouter.get("/carrito", isAuth, (req,res) =>{
    res.send("cart user")
})
passportRouter.get("/profile/:username", isAuth, (req,res) => {
    const username = res.params.username;
    const user = userDB.getUser(username);
    res.send({user})
})

// REGISTER
passportRouter.get('/register', (req, res) =>{
    res.render('register')
})
passportRouter.post('/register', upload.single("avatar"), passport.authenticate('register', {failureRedirect: '/failregister', successRedirect: '/'}))

passportRouter.get('/failregister', (req, res) =>{
    res.send("Error de registro de usuario")
})

// LOGIN
passportRouter.get('/login', (req, res) =>{
    res.send("Ingrese sus datos")
})
passportRouter.post('/login', passport.authenticate('login', {failureRedirect: '/faillogin', successRedirect: '/'}))
passportRouter.get('/faillogin', (req,res) => {
    res.send("Error de login")
})

// LOGOUT
passportRouter.get('/logout', (req, res) =>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/login');
    });
})

module.exports = passportRouter