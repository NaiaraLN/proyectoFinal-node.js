//imports de daos de productos
const ProductsDaoFiles = require('./products/prodDaoFS')
const ProductsDaoMongo = require('./products/prodDaoMongo')
const ProductsDaoFireS = require('./products/prodDaoFireS')

//imports de daos de carrito
const CartDaoFiles = require('./cart/cartDaoFS')
const CartDaoMongo = require('./cart/cartDaoMongo')
const CartDaoFireS = require('./cart/cartDaoFireS')



module.exports = {
    ProductsDaoFiles,
    ProductsDaoMongo,
    ProductsDaoFireS,
    CartDaoFiles,
    CartDaoMongo,
    CartDaoFireS
}