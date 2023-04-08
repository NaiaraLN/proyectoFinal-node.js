import jwt from "jsonwebtoken";

const PRIVATE_KEY = "myprivatekey";

function authJwt(req, res, next) {
    try {
        const authHeader = req.headers["authorization"] || req.headers["Authorization"] || '';
        console.log(`este es el header ${authHeader}`)
        const token = authHeader.split(' ')[1]
        const originalObj = jwt.verify(token, PRIVATE_KEY);
        console.log(originalObj)
        req.userjwt = originalObj
        next()
    } catch (err) {
        console.log(err)
        return res.status(403).json({
        error: 'token invalido',
        detalle: 'nivel de acceso insuficiente para el recurso solicitado'
        })
    }
}

export default authJwt