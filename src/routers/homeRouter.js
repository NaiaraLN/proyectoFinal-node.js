import {Router} from 'express';
import {isAuth} from '../middleware/isAuth.js'
import authJwt from '../middleware/authJwt.js';
import generateAuthToken from '../scripts/jwt.js';
import passport from '../scripts/passport.js'
import upload from '../middleware/multer.js'
import passportController from '../controllers/passportController.js';

const passportRouter = Router()

passportRouter.get("/", authJwt,passportController.getHome.bind(passportController))

passportRouter.get("/carrito", isAuth,passportController.getCart.bind(passportController))

passportRouter.get("/profile/:username", isAuth, passportController.getProfile.bind(passportController))

// REGISTER
passportRouter.get('/register', passportController.getRegister.bind(passportController))
passportRouter.post('/register', upload.single("avatar"), passport.authenticate('register', {failureRedirect: '/failregister'}), function(req,res) {
    const accessToken = generateAuthToken(req.user.username)
    res.json(accessToken)
})

passportRouter.get('/failregister',passportController.failRegister.bind(passportController))

// LOGIN
passportRouter.get('/login', passportController.getLogin.bind(passportController))

passportRouter.post('/login', passport.authenticate('login'), 
function(req,res) {
    console.log('llega aca')
    const accessToken = generateAuthToken(req.user.username)
    console.log(accessToken)
    res.json({accessToken})
})

passportRouter.get('/faillogin', passportController.failLogin.bind(passportController))

// LOGOUT
passportRouter.get('/logout', passportController.getLogout.bind(passportController))

export default passportRouter