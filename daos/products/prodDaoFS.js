const { Router } = require('express');
const PersistenceFiles = require('../../helpers/persistenceFiles');

class ProductsDaoFiles extends PersistenceFiles{
    constructor(){
        super('products.json')
        this.productsRouter = Router()

        this.productsRouter.get('/', async (req, res) => {
            super.getAll()
            .then((products) => res.json(products))
            .catch((err) => res.send({error: `hubo un error al traer los productos ${err}`}))
            
        });

        this.productsRouter.get('/:id', async (req, res) => {
            let id = parseInt(req.params.id);
            super.getByID(id)
            .then((product) => res.json(product))
            .catch((err) => res.send({error : `Producto no encontrado ${err}`}))
        });

        this.productsRouter.post('/', async (req, res) => {
            const product = req.body;
            super.save(product)
            .then(() => {
                return super.getAll()
            })
            .then((prods) => res.json(prods))
            .catch((err) => res.send({error : `No se pudo guardar el producto ${err}`}))
        });

        this.productsRouter.put('/:id', async (req, res) => {
            let id = parseInt(req.params.id)
            let product = req.body
            super.update(id,product)
            .then((result) => res.json(result))
            .catch((err) => res.send({error: `error al actualizar producto ${err}`}))
        });

        this.productsRouter.delete("/:id", async (req, res) => {
            let id = parseInt(req.params.id)
            super.deleteByID(id)
            .then((result) => res.json(result))
            .catch((err) => res.send({error: `error al eliminar producto ${err}`}))
        });
    }

    getRouter = () => {
        return this.productsRouter
    }

}
module.exports = ProductsDaoFiles; 

