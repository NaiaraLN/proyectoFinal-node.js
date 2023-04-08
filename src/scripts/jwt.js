import jwt from "jsonwebtoken";

const PRIVATE_KEY = "myprivatekey";

function generateAuthToken(username) {
    const token = jwt.sign({ username }, PRIVATE_KEY, { expiresIn: '600s' });
    return token;
}


export default generateAuthToken