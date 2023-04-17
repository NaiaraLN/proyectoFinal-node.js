import MongoDao from '../model/mongoDao.js'
import {getOrder} from './nodemailer.js';
import logger from '../scripts/logger.js';

export default class CartService{
    async getCart(email){
        try {
            let cart = await MongoDao.getOne('carts',email)
            return cart
        } catch (error) {
            logger.error(`Error: carrito no encontrado ${error}`)
        }
    }
    async postCart({_id,name,category,description,code,thumbnail,price,quantity}, username){
        try {
            let user = await MongoDao.getOne('users',username)
            const cart = await MongoDao.getOne('carts', user.mail)
            if (cart) {
                return await this.updateCart(_id,{_id,name,category,description,code,thumbnail,price,quantity},user.mail)
            }else{
                return await this.createCart({_id,name,category,description,code,thumbnail,price,quantity}, username)
            }
        } catch (error) {
            logger.error(`Error: no se pudo crear o actualizar el carrito: ${error}`)
        }
    }
    async createCart({_id,name,category,description,code,thumbnail,price,quantity},username){
        try {
            console.log(category)
            let user = await MongoDao.getOne('users',username)
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
                    category:category,
                    quantity:quantity
                }
            }
            console.log(cart)
            let saveCart = await MongoDao.save('carts',cart)
            if(saveCart){return {status:200,description:'El carrito se guardó con éxito'}}
        } catch (error) {
            logger.error(`No se pudo guardar el producto ${error}`)
        }
    }
    async updateCart(id,{_id,name,description,code,thumbnail,price,category,quantity},mail){
        try {
            let product = {
                _id:_id,
                date: Date.now(),
                name: name,
                description:description,
                code:code,
                thumbnail:thumbnail,
                price:price,
                category:category,
                quantity:quantity
            }
            let cart = await this.getCart(mail)
            let prod = cart.products.find((prod) => prod._id.toString() === id)
            if (prod) {
                let products = cart.products;
                let index = cart.products.indexOf(prod);
                let newCart = [...products];
                newCart[index].quantity += Number(quantity);
                let update = await MongoDao.update('carts', cart._id, newCart)
                return update
            } else {
                let update = await MongoDao.update('carts',cart._id,product)
                return update
            } 
        } catch (error) {
            logger.error(`no se pudo agregar el producto ${error}`)
        }
        
    }
    async createOrder(mail,username){
        try {
            let cart = await this.getCart(mail)
            const user = await MongoDao.getOne('users',username);
            let orders = await MongoDao.getAll('orders')
            if (orders.length > 0) {
                let lastOrder = orders.reduce((acc, item) => item.id > acc ? acc = item.id : acc, 0)
                const newOrder = {
                    date:Date.now(),
                    email:user.mail,
                    items:cart.products,
                    status:'Generada',
                    number:lastOrder + 1
                }
                const saveOrder = await MongoDao.save('orders', newOrder);
                const order = await MongoDao.getByID('orders', saveOrder._id);
                await getOrder(order);
                return order;
            }else{
                const newOrder = {
                    date:Date.now(),
                    email:user.mail,
                    items:cart.products,
                    status:'Generada',
                    number:1
                }
                const saveOrder = await MongoDao.save('orders', newOrder);
                const order = await MongoDao.getByID('orders', saveOrder._id);
                await getOrder(order);
                return order
            }
            
        } catch (error) {
            logger.error(`error al guardar la orden ${error}`)
        }
    }
    async deleteCart(mail){
        try {
            const cart = await this.getCart(mail)
            const delCart = await MongoDao.deleteById('carts',cart._id)
            return delCart
        } catch (error) {
            logger.error(`error al eliminar el carrito ${error}`)
        }
    }
    async deleteProd(mail,prodId){
        try {
            let cart = await this.getCart(mail)
            let newCart = await MongoDao.deleteProdCart('carts',cart._id,prodId,cart)
            return newCart
        } catch (error) {
            logger.error(`error al eliminar producto del carrito ${error}`)
        }
    }
}

