const {Router} = require('express')
const {productsDao} = require('../daos/importsDao')

const productsRouter = Router()

productsRouter.get('/', async (__, res) => {
    try {
        let products = await productsDao.getAll('products')
        return res.json(products)
    } catch (error) {
        return res.send({error: `hubo un error al traer los productos ${err}`})
    }
});

productsRouter.get('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let product = await productsDao.getByID('products',id)
        return res.json(product)
    } catch (error) {
        return res.send({error : `Producto no encontrado ${err}`})
    }
});

productsRouter.post('/', async (req, res) => {
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
        await productsDao.save('products',product)
        let products = await productsDao.getAll('products');
        return res.json(products)
    } catch (error) {
        return res.send({error : `No se pudo guardar el producto ${err}`})
    }
});

productsRouter.put('/:id', async (req, res) => {
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
        await productsDao.update('products',id,product)
        return res.send('producto actualizado')
    } catch (error) {
        return res.send({error: `error al actualizar producto ${err}`})
    }
});

productsRouter.delete("/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let delProd = await productsDao.deleteByID('products',id)
        return res.json(delProd)
    } catch (error) {
        return res.send({error: `error al eliminar producto ${err}`})
    }
    
});

module.exports ={ productsRouter};