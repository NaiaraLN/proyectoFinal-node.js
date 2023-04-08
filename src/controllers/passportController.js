import logger from "../scripts/logger.js";
import mongoDao from "../model/mongoDao.js";
import {URL} from 'url'
import path from "path";

// configuro dirname
const __dirname = decodeURI(new URL('.', import.meta.url).pathname)

class PassportController{
    getHome(req,res){
        const user = req.user.username
        res.render('main',{user})}
    getCart(_,res){res.send("user's cart")}
    async getProfile(req,res){
        const username = req.params.username;
        const user = await mongoDao.getUser('users',username)
        res.json(user)
    }
    getRegister(_,res){res.render('register')}

    getLogin(_,res){res.render('login')}
    
    failRegister(_,res){
        logger.error(`Error en registro de usuario`)
        res.send("Error de registro de usuario")
    }

    failLogin(_,res){
        logger.error(`Error en login de usuario`)
        res.send("Error de login")
    }

    getLogout(req,res, next){
        req.logout(function(err) {
            if (err) { return next(err); }
            res.redirect('/login');
        });
    }
}
export default new PassportController()