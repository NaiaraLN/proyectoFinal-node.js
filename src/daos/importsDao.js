const ProductsDaoMongo = require('./products/prodDaoMongo')
const CartDaoMongo = require('./cart/cartDaoMongo')

const productsDao = new ProductsDaoMongo();
const cartDao = new CartDaoMongo();

module.exports = {
    productsDao,
    cartDao
}