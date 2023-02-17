const {Router} = require('express')
const {productsDao} = require('../daos/importsDao')
const {isAdmin} = require("../controllers/passport");
const logger = require('../scripts/logger')

const productsRouter = Router()

productsRouter.get('/', async (req, res) => {
    try {
        const { url, method } = req
        logger.info(`Ruta ${method} ${url} implementada`)
        let products = await productsDao.getAll('products')
        return res.json(products)
    } catch (error) {
        logger.error(`hubo un error al traer los productos ${error}`)
    }
});

productsRouter.get('/:id', async (req, res) => {
    try {
        const { url, method } = req
        logger.info(`Ruta ${method} ${url} implementada`)
        let id = req.params.id;
        let product = await productsDao.getByID('products',id)
        return res.json(product)
    } catch (error) {
        logger.error(`Producto no encontrado ${error}`)
    }
});

productsRouter.post('/', isAdmin, async (req, res) => {
    try {
        const { url, method } = req
        logger.info(`Ruta ${method} ${url} implementada`)
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
        logger.error(`No se pudo guardar el producto ${error}`)
    }
});

productsRouter.put('/:id', isAdmin, async (req, res) => {
    try {
        const { url, method } = req
        logger.info(`Ruta ${method} ${url} implementada`)
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
        logger.error(`error al actualizar producto ${error}`)
    }
});

productsRouter.delete("/:id", isAdmin, async (req, res) => {
    try {
        const { url, method } = req
        logger.info(`Ruta ${method} ${url} implementada`)
        let id = req.params.id;
        let delProd = await productsDao.deleteByID('products',id)
        return res.json(delProd)
    } catch (error) {
        logger.error(`error al eliminar producto ${error}`)
    }
    
});

module.exports ={ productsRouter};