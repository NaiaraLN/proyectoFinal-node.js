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
    if(req.user?.username === "admin"){
        next()
    }else{
        res.send(null)
    }
}

export {isAuth, isAdmin};