const ProductsDaoMongo = require('./products/prodDaoMongo')
const CartDaoMongo = require('./cart/cartDaoMongo')
const User = require("./users/users")
const Orders = require("./orders/ordersDao")
/* 
const productsDao = new ProductsDaoMongo();
const cartDao = new CartDaoMongo();
const userDB = new User()
const orderDao = new Orders()
 */
module.exports = {
    ProductsDaoMongo,
    CartDaoMongo,
    User,
    Orders
}