import { Router } from 'express';
import {cartDao} from '../daos/importsDao';
import {userDB} from '../daos/importsDao';
import {orderDao} from '../daos/importsDao';
import {getOrder} from '../services/nodemailer';
import {WHS, SMS} from '../services/twilio';
import {isAuth} from '../middleware/isAuth';
import logger from '../scripts/logger';


const cartRouter = Router();
cartRouter.get('/', isAuth ,async (req, res) => {
    try {
        const { url, method } = req
        logger.info(`Ruta ${method} ${url} implementada`)
        let allCarts = await cartDao.getAll('carts')
        res.json(allCarts)
    } catch (error) {
        logger.error(`Error al traer el carrito ${error}`)
        res.send({error: `hubo un error al traer los carritos ${error}`})
    }
});

cartRouter.get('/:id/productos', isAuth ,async (req, res) => {
    try {
        const { url, method } = req
        logger.info(`Ruta ${method} ${url} implementada`)
        let id = req.params.id;
        let cart = await cartDao.getByID('carts',id)
        res.json(cart)
    } catch (error) {
        logger.error(`Error: carrito no encontrado ${error}`)
        res.send({error : `Carrito no encontrado ${error}`})
    }

});

cartRouter.post('/',isAuth , async (req, res) => {
    try {
        const { url, method } = req
        logger.info(`Ruta ${method} ${url} implementada`)
        let cart = {
            date: Date.now(),
            products: {
                _id: req.body._id,
                date: Date.now(),
                name: req.body.name,
                description:req.body.description,
                code:req.body.code,
                thumbnail:req.body.thumbnail,
                price:req.body.price,
                stock:req.body.stock
            }
        }
        await cartDao.save('carts',cart)
        let carts = await cartDao.getAll('carts')
        res.json(carts)
    } catch (error) {
        logger.error(`No se pudo guardar el producto ${error}`)
        res.send({error : `No se pudo guardar el producto ${error}`})
    }
});

cartRouter.post('/:id/productos', isAuth ,async (req, res) => {
    try {
        const { url, method } = req
        logger.info(`Ruta ${method} ${url} implementada`)
        let product = {
            _id: req.body._id,
            date: Date.now(),
            name: req.body.name,
            description:req.body.description,
            code:req.body.code,
            thumbnail:req.body.thumbnail,
            price:req.body.price,
            stock:req.body.stock
        }
        let id = req.params.id;
        let cart = await cartDao.getByID('carts',id)
        cart.products.push(product)
        let newCart = await cartDao.update('carts',cart._id,product)
        res.json(newCart)
    } catch (error) {
        logger.error(`no se pudo agregar el producto ${error}`)
        res.send({error: `no se pudo agregar el producto ${error}`})
    }
    
})

cartRouter.post("/:id/checkout", isAuth ,async (req,res) => {
    try {
        const { url, method } = req
        logger.info(`Ruta ${method} ${url} implementada`)
        const cartId = req.params.id;
        const username = req.user.username;
        const user = await userDB.getUser(username);
        let cart = await cartDao.getByID('carts',cartId)
        const newOrder = {
            user:user,
            cart:cart
        }
        const saveOrder = await orderDao.save('orders', newOrder);
        const order = await orderDao.getByID('orders', saveOrder._id);
        await getOrder(order);
        await WHS(order);
        await SMS(user);
        res.json(order)
    } catch (error) {
        logger.error(`no se pudo agregar el producto ${error}`)
        res.send({error: `no se pudo agregar el producto ${error}`})
    }
    
})

cartRouter.delete("/:id", isAuth ,async (req, res) => {
    
    try {
        const { url, method } = req
        logger.info(`Ruta ${method} ${url} implementada`)
        let id = req.params.id;
        await cartDao.deleteByID('carts',id)
        res.send('carrito eliminado')
    } catch (error) {
        logger.error(`error al eliminar el carrito ${error}`)
        res.send({error: `error al eliminar el carrito ${error}`})
    }
});

cartRouter.delete('/:id/productos/:id_prod',isAuth , async (req, res) => {
    
    try {
        const { url, method } = req
        logger.info(`Ruta ${method} ${url} implementada`)
        let cartId = req.params.id;
        let prodId = req.params.id_prod
        let cart = await cartDao.getByID('carts',cartId)
        await cartDao.deleteProdCart(cartId,prodId,cart)
        res.send('producto eliminado del carrito')
    } catch (error) {
        logger.error(`error al eliminar producto del carrito ${error}`)
        res.send({error: `error al eliminar producto del carrito ${error}`})
    }
})

export {cartRouter};
