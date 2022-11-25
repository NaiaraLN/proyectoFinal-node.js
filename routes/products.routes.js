const { Router } = require('express');
const Products = require('../helpers/products');

const routerProducts = Router();

let file = new Products("productos.json")

routerProducts.get('/', async (req, res) => {
    const listProduct = await file.getAll();
    res.json(listProduct);
});

routerProducts.get('/:id', async (req, res) => {
    let id = parseInt(req.params.id);
    let product = await file.getByID(id);
    if(product) {
        res.json(product);
    }
    else {
        res.send({error : 'Producto no encontrado'})
    }
});

routerProducts.post('/', async (req, res) => {
    const product = req.body;
    await file.save(product);
    const listProduct = await file.getAll();
    res.json(listProduct);
});

routerProducts.put('/:id', async (req, res) => {
    let id = parseInt(req.params.id)
    let product = req.body
    let updateProd = await file.update(id, product);
    res.json(updateProd);
});

routerProducts.delete("/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    await file.deleteByID(id)
    let listProduct = await file.getAll();
    res.json(listProduct);    
});

module.exports = routerProducts; 

