import {Router} from 'express';
import {isAuth} from '../middleware/isAuth.js'
import passport from '../scripts/passport.js'
import upload from '../middleware/multer.js'
import passportController from '../controllers/passportController.js';

const passportRouter = Router()

passportRouter.get("/", isAuth,passportController.getHome.bind(passportController))

passportRouter.get("/profile/:username", isAuth, passportController.getProfile.bind(passportController))

// REGISTER
passportRouter.get('/register', passportController.getRegister.bind(passportController))

passportRouter.post('/register', upload.single("avatar"), passport.authenticate('register', {failureRedirect: '/failregister', successRedirect:'/'}))

passportRouter.get('/failregister',passportController.failRegister.bind(passportController))

// LOGIN
passportRouter.get('/login', passportController.getLogin.bind(passportController))

passportRouter.post('/login', passport.authenticate('login', {failureRedirect: '/faillogin', successRedirect: '/productos' }))

passportRouter.get('/faillogin', passportController.failLogin.bind(passportController))

// LOGOUT
passportRouter.get('/logout', passportController.getLogout.bind(passportController))

export default passportRouter