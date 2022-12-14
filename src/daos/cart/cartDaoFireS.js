const { Router } = require('express');
const ContainerFireStore = require('../../containers/containerFireStore');

class CartDaoFireS extends ContainerFireStore {
    constructor(){
        super.collName('carts')
        super.collection(db)
        this.cartRouter = Router()

        this.cartRouter.get('/', async (req,res) => {
            try {
                let allCarts = await super.getAll('carts')
                return res.json(allCarts)
            } catch (error) {
                return res.send({error: `hubo un error al traer los carritos ${err}`})
            }
        })

        this.cartRouter.get('/:id/productos', async (req,res) =>{
            try {
                let id = req.params.id;
                let cart = await super.getByID('carts',id)
                return res.json(cart)
            } catch (error) {
                return res.send({error : `Carrito no encontrado ${err}`})
            }
        })

        this.cartRouter.post('/', async (req,res) =>{
            try {
                let cart ={
                    date: Date.now(),
                    products: [
                        {   
                            id: req.body.id,
                            date: Date.now(),
                            name: req.body.name,
                            description:req.body.description,
                            code:req.body.code,
                            thumbnail:req.body.thumbnail,
                            price:req.body.price,
                            stock:req.body.stock
                        }
                    ]
                }
                await super.save('carts', cart)
                let carts = await super.getAll('carts')
                return res.json(carts)
            } catch (error) {
                return res.send({error : `No se pudo guardar el producto ${err}`})
            }
        })

        this.cartRouter.post('/:id/productos/', async (req,res) => {
            try {
                let product = {
                    id: req.body.id,
                    date: Date.now(),
                    name: req.body.name,
                    description:req.body.description,
                    code:req.body.code,
                    thumbnail:req.body.thumbnail,
                    price:req.body.price,
                    stock:req.body.stock
                }
                let id = req.params.id;
                let newCart = await super.update('carts',id,product)
                return res.json(newCart)
            } catch (error) {
                return res.send({error: `no se pudo agregar el producto ${err}`})
            }
        })

        this.cartRouter.delete('/:id', async (req,res) => {
            try {
                let id = req.params.id;
                await super.deleteByID('carts', id)
                return res.send('carrito eliminado')
            } catch (error) {
                return res.send({error: `error al eliminar el carrito ${err}`})
            }
        })

        this.cartRouter.delete('/:id/productos/:id_prod', async (req,res) => {
            try {
                let cartId = req.params.id;
                let prodId = req.params.id_prod;
                let newCart = await super.deleteProdCart(cartId,prodId)
                return res.json(newCart)
            } catch (error) {
                return res.send({error: `error al eliminar producto del carrito ${err}`})
            }
        })
    }

    getRouter = () => {
        return this.cartRouter
    }
}

module.exports = CartDaoFireS;
