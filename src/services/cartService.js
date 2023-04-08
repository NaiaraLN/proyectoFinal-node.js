import MongoDao from '../model/mongoDao.js'
import {getOrder} from './nodemailer.js';
import {WHS, SMS} from './twilio.js';
import logger from '../scripts/logger.js';

export default class CartService{
    async getAllCarts(){
        try {
            let allCarts = await MongoDao.getAll('carts')
            return allCarts
        } catch (error) {
            logger.error(`Error al traer el carrito ${error}`)
        }
    }
    async getCart(id){
        try {
            let cart = await MongoDao.getByID('carts',id)
            return cart
        } catch (error) {
            logger.error(`Error: carrito no encontrado ${error}`)
        }
    }
    async createCart({_id,name,description,code,thumbnail,price,quantity},username){
        try {
            let user = await MongoDao.getUser(username)
            let cart = {
                email: user.mail,
                date: Date.now(),
                address:user.address,
                products: {
                    _id: _id,
                    date: Date.now(),
                    name: name,
                    description:description,
                    code:code,
                    thumbnail:thumbnail,
                    price:price,
                    quantity:quantity
                }
            }
            let saveCart = await MongoDao.save('carts',cart)
            if(saveCart){return {status:200,description:'El carrito se guardó con éxito'}}
        } catch (error) {
            logger.error(`No se pudo guardar el producto ${error}`)
        }
    }
    async updateCart(id,{_id,name,description,code,thumbnail,price,stock,quantity}){
        try {
            let product = {
                _id:_id,
                date: Date.now(),
                name: name,
                description:description,
                code:code,
                thumbnail:thumbnail,
                price:price,
                quantity:quantity
            }
            let cart = await this.getCart(id)
            let prods = cart.products.find((prod) => prod._id === product._id)
            let newCart = [...cart.products]
            let index = cart.products.indexOf(prods)
            if (prods) {
                prods.quantity = prods.quantity + product.quantity
                // cart.products.push(prods)
                newCart = await MongoDao.update('carts',cart._id,prods)
            } else {
                // cart.products.push(product)
                newCart = await MongoDao.update('carts',cart._id,product)
            } 
            return newCart
        } catch (error) {
            logger.error(`no se pudo agregar el producto ${error}`)
        }
        
    }
    async createOrder(id,username){
        let cart = await this.getCart(id)
        const user = await MongoDao.getUser('users',username);
        const newOrder = {
            date:Date.now(),
            user:user,
            cart:cart,
            status:'Generada',
            number:1
        }
        const saveOrder = await MongoDao.save('orders', newOrder);
        const order = await MongoDao.getByID('orders', saveOrder._id);
        await getOrder(order);
        await WHS(order);
        await SMS(user.phone);
    }
    async deleteCart(id){
        try {
            const cart = await MongoDao.deleteByID('carts',id)
            return cart
        } catch (error) {
            logger.error(`error al eliminar el carrito ${error}`)
        }
    }
    async deleteProd(id,prodId){
        try {
            let cart = await MongoDao.getByID('carts',id)
            let newCart = await MongoDao.deleteProdCart('carts',id,prodId,cart)
            return newCart
        } catch (error) {
            logger.error(`error al eliminar producto del carrito ${error}`)
        }
    }
}

