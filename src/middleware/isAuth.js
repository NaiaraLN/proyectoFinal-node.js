const {userDB} = require('../daos/importsDao');

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