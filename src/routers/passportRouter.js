import {Router} from 'express';
import {isAuth} from '../middleware/isAuth'
import passport from 'passport'
import {userDB} from '../daos/importsDao'
import logger from '../scripts/logger'
import upload from '../middleware/multer'

const passportRouter = Router()

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

export default passportRouter