const {CartDaoMongo} = require('../daos/importsDao');
const logger = require('../scripts/logger')

class CartService extends CartDaoMongo{
    async getCart(){
        try {
            let allCarts = await this.getAll('carts')
            return allCarts
        } catch (error) {
            logger.error(`Error al traer el carrito ${error}`)
        }
    }
    async getProducts(id){
        try {
            let cart = await this.getByID('carts',id)
            return cart
        } catch (error) {
            
        }
    }

}

module.exports = CartService