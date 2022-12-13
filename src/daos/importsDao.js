//imports de daos de productos
const ProductsDaoFiles = require('./products/prodDaoFS')
const ProductsDaoMongo = require('./products/prodDaoMongo')

//imports de daos de carrito
const CartDaoFiles = require('./cart/cartDaoFS')
const CartDaoMongo = require('./cart/cartDaoMongo')



module.exports = {
    ProductsDaoFiles,
    ProductsDaoMongo,
    CartDaoFiles,
    CartDaoMongo
}