const { Router } = require('express');
const {cartDao} = require('../daos/importsDao');
const {userDB} = require('../daos/importsDao')

const cartRouter = Router();
cartRouter.get('/', async (req, res) => {
    try {
        let allCarts = await cartDao.getAll('carts')
        return res.json(allCarts)
    } catch (error) {
        return res.send({error: `hubo un error al traer los carritos ${err}`})
    }
});

cartRouter.get('/:id/productos', async (req, res) => {
    let id = req.params.id;
    try {
        let cart = await cartDao.getByID('carts',id)
        return res.json(cart)
    } catch (error) {
        return res.send({error : `Carrito no encontrado ${err}`})
    }

});

cartRouter.post('/', async (req, res) => {
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
    try {
        await cartDao.save('carts',cart)
        let carts = await cartDao.getAll('carts')
        return res.json(carts)
    } catch (error) {
        return res.send({error : `No se pudo guardar el producto ${err}`})
    }
});

cartRouter.post('/:id/productos', async (req, res) => {
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
    try {
        let cart = await cartDao.getByID('carts',id)
        cart.products.push(product)
        let newCart = await cartDao.update('carts',cart._id,product)
        return res.json(newCart)
    } catch (error) {
        return res.send({error: `no se pudo agregar el producto ${err}`})
    }
    
})

cartRouter.post("/:id/checkout", async (req,res) => {
    const cartId = req.params.id;
    const username = req.user.username;
    const user = userDB.getUser(username);
    let cart = await cartDao.getByID('carts',cartId)
    const order = {
        user:{...user},
        cart:{...cart}
    }
    const newOrder = {
        user,
        cart
    }
    console.log(order)
    console.log(newOrder)
    res.json(order)
})

cartRouter.delete("/:id", async (req, res) => {
    let id = req.params.id;
    try {
        await cartDao.deleteByID('carts',id)
        return res.send('carrito eliminado')
    } catch (error) {
        return res.send({error: `error al eliminar el carrito ${err}`})
    }
});

cartRouter.delete('/:id/productos/:id_prod', async (req, res) => {
    let cartId = req.params.id;
    let prodId = req.params.id_prod
    try {
        let cart = await cartDao.getByID('carts',cartId)
        await cartDao.deleteProdCart(cartId,prodId,cart)
        return res.send('producto eliminado del carrito')
    } catch (error) {
        return res.send({error: `error al eliminar producto del carrito ${err}`})
    }
})

module.exports = {cartRouter};
