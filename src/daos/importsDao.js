const ProductsDaoMongo = require('./products/prodDaoMongo')
const CartDaoMongo = require('./cart/cartDaoMongo')
const User = require("./users/users")

const productsDao = new ProductsDaoMongo();
const cartDao = new CartDaoMongo();
const userDB = new User()

module.exports = {
    productsDao,
    cartDao,
    userDB
}