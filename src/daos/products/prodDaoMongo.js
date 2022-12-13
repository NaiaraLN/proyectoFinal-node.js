const { Router } = require('express');
const ContainerMongoDB = require('../../containers/containerMongoDB');
require('dotenv').config()

class ProductsDaoMongo extends ContainerMongoDB{
    constructor(){
        super(`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@localhost:2017/ecommerce?authSource=admin`)
        this.productsRouter = Router()
        this.prodConnection = super.startConnection()

        this.productsRouter.get('/', async (req, res) => {
            try {
                let products = await super.getAll('products')
                return res.json(products)
            } catch (error) {
                return res.send({error: `hubo un error al traer los productos ${err}`})
            }
        });

        this.productsRouter.get('/:id', async (req, res) => {
            try {
                let id = req.params.id;
                let product = await super.getByID('products',id)
                return res.json(product)
            } catch (error) {
                return res.send({error : `Producto no encontrado ${err}`})
            }
        });

        this.productsRouter.post('/', async (req, res) => {
            try {
                const product = {
                    date: Date.now(),
                    name: req.body.name,
                    description:req.body.description,
                    code:req.body.code,
                    thumbnail:req.body.thumbnail,
                    price:req.body.price,
                    stock:req.body.stock
                };
                await super.save('products',product)
                let products = await super.getAll('products');
                return res.json(products)
            } catch (error) {
                return res.send({error : `No se pudo guardar el producto ${err}`})
            }
        });

        this.productsRouter.put('/:id', async (req, res) => {
            try {
                let id = req.params.id
                let product = {
                    _id:req.body._id,
                    date: Date.now(),
                    name: req.body.name,
                    description:req.body.description,
                    code:req.body.code,
                    thumbnail:req.body.thumbnail,
                    price:req.body.price,
                    stock:req.body.stock
                };
                await super.update('products',id,product)
                return res.send('producto actualizado')
            } catch (error) {
                return res.send({error: `error al actualizar producto ${err}`})
            }
        });

        this.productsRouter.delete("/:id", async (req, res) => {
            try {
                let id = req.params.id;
                let delProd = await super.deleteByID('products',id)
                return delProd
            } catch (error) {
                return res.send({error: `error al eliminar producto ${err}`})
            }
            
        });
    }

    getRouter = () => {
        return this.productsRouter
    }
    
}

module.exports = ProductsDaoMongo;