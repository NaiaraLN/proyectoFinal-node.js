const { Router } = require('express');
const Cart = require('../helpers/cart');

const routerCart = Router();
let cart = new Cart("cart.json")

routerCart.get('/', async (req, res) => {
  let carts = await cart.getAll();
  res.json(carts);
});

routerCart.get('/:id/productos', async (req, res) => {
  let id = parseInt(req.params.id)
  let cartID = await cart.getByID(id);
  res.json(cartID.products);
});

routerCart.post('/', async (req, res) => {
    let product = req.body;
    let newCart = await cart.save(product)
    res.json(newCart);
})

routerCart.post('/:id/productos', async (req, res) => {
  let product = req.body;
  let id = parseInt(req.params.id);
  let cartID = await cart.getByID(id)
  cartID.products.push(product)
  let newCart = await cart.update(cartID.id, cartID)
  res.json(newCart);
})

routerCart.delete('/:id', async (req, res) => {
  let id = parseInt(req.params.id)
  await cart.deleteByID(id)
  res.send('Carrito eliminado')
})

routerCart.delete('/:id/productos/:id_prod', async (req, res) => {
  let cartId = parseInt(req.params.id)
  let prodId = parseInt(req.params.id_prod)
  let Cart = await cart.getByID(cartId)
  Cart.products = Cart.products.filter((prod) => prod.id !== prodId)
  await cart.update(cartId, Cart)
  res.send('Producto eliminado del carrito')
})

module.exports = routerCart;