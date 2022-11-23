const { Router } = require('express');
const Cart = require('../helpers/cart');

const routerCart = Router();

routerCart.get('/', async (req, res) => {
  const products = await Cart.getAll();
  res.json(products);
});

routerCart.post('/productos', async (req, res) => {
  const product = req.body;
    const date = Date.now()
    const newProduct = new Cart(date, product)
    await newProduct.save()
    res.json(newProduct);
})

routerCart.delete('/:id', async (req, res) => {
  Cart.deleteAll()
  res.send('carrito eliminado')
})

module.exports = routerCart;