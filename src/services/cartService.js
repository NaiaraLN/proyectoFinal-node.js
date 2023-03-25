import {CartDaoMongo} from '../daos/importsDao';
import {orderDao} from '../daos/importsDao';
import {userDB} from '../daos/importsDao';
import logger from '../scripts/logger';

class CartService extends CartDaoMongo{
    async getCarts(){
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
            logger.error(`Error: carrito no encontrado ${error}`)
        }
    }
    async postCart({_id,name,description,code,thumbnail,price,stock,quantity},address){
        try {
            let cart = {
                date: Date.now(),
                address:address,
                products: {
                    _id: _id,
                    date: Date.now(),
                    name: name,
                    description:description,
                    code:code,
                    thumbnail:thumbnail,
                    price:price,
                    stock:stock,
                    quantity:quantity
                }
            }
            let saveCart = await this.save('carts',cart)
            if(saveCart){return {status:'success',description:'El carrito se guardó con éxito'}}
        } catch (error) {
            logger.error(`No se pudo guardar el producto ${error}`)
        }
    }
    async postProd({id,_id,name,description,code,thumbnail,price,stock,quantity}){
        try {
            let product = {
                _id:_id,
                date: Date.now(),
                name: name,
                description:description,
                code:code,
                thumbnail:thumbnail,
                price:price,
                stock:stock,
                quantity:quantity
            }
            let cart = await this.getProducts(id)
            cart.products.push(product)
            let newCart = await this.update('carts',cart._id,product)
            return newCart
        } catch (error) {
            logger.error(`no se pudo agregar el producto ${error}`)
        }
        
    }
    async postOrder(id,username){
        let cart = await this.getProducts(id)
        const user = await userDB.getUser(username);
        const newOrder = {
            date:Date.now(),
            user:user,
            cart:cart,
            status:'Generada'
        }
        const saveOrder = await orderDao.save('orders', newOrder);
        const order = await orderDao.getByID('orders', saveOrder._id);
        await getOrder(order);
        await WHS(order);
        await SMS(user.phone);
    }
    async deleteCart(id){
        try {
            const cart = await this.deleteByID('carts',id)
            return cart
        } catch (error) {
            logger.error(`error al eliminar el carrito ${error}`)
        }
    }
    async deleteProd(id,prodId){
        try {
            let cart = await cartDao.getByID('carts',id)
            let newCart = await cartDao.deleteProdCart(id,prodId,cart)
            return newCart
        } catch (error) {
            logger.error(`error al eliminar producto del carrito ${error}`)
        }
    }
}

export default new CartService()