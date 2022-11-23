const { Router } = require('express');
const Products = require('../helpers/products');

const routerProducts = Router();

routerProducts.get('/', async (req, res) => {
    const listProduct = await Products.getAll();
    res.json(listProduct);
});

routerProducts.get('/:id', async (req, res) => {
    let id = parseInt(req.params.id)
        if(id >= 1) {
            let product = await Products.getByID(id)
            res.json(product);
        }
        else {
            res.send({error : 'Producto no encontrado'})
        }
});

routerProducts.post('/', async (req, res) => {
    const {name, description, code, thumbnail, price, stock} = req.body;
    const date = Date.now()
    const newProduct = new Products(date, name, description, code, thumbnail, price, stock)
    await newProduct.save()
    res.json(newProduct);
});

routerProducts.put('/:id', async (req, res) => {
    let id = parseInt(req.params.id)
    let listProduct = await Products.getAll()
    let product = await Products.getByID(id)
    let newProduct = req.body;
    product = newProduct;
    res.json(listProduct);
});

routerProducts.delete("/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    Products.deleteByID(id)
    let listProduct = await Products.getAll();
    res.json(listProduct);    
});

module.exports = routerProducts; 

