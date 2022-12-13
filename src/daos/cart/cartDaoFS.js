const { Router } = require('express');
const ContainerFiles = require('../../containers/containerFiles');

class CartDaoFiles extends ContainerFiles {
  constructor(){
    super('cart.json')
    this.cartRouter = Router()

    this.cartRouter.get('/', async (req, res) => {
      super.getAll()
      .then((carts) => res.json(carts))
      .catch((err) => res.send({error: `hubo un error al traer los carritos ${err}`}))
    });
    this.cartRouter.get('/:id/productos', async (req, res) => {
      let id = parseInt(req.params.id)
      super.getByID(id)
      .then((cart) => res.json(cart.products))
      .catch((err) => res.send({error : `Carrito no encontrado ${err}`}))
  });

    this.cartRouter.post('/', async (req, res) => {
      const product = req.body;
      super.save(product)
      .then(() => {
          return super.getAll()
      })
      .then((carts) => res.json(carts))
      .catch((err) => res.send({error : `No se pudo guardar el producto ${err}`}))
    });

    this.cartRouter.post('/:id/productos', async (req, res) => {
      let product = req.body;
      let id = parseInt(req.params.id);
      super.getByID(id)
      .then((cart) => {
        cart.products.push(product)
        super.update(cart.id, cart)
        return res.json(cart)
      })
      .catch((err) => res.send({error: `no se pudo agregar el producto ${err}`}))
    })

    this.cartRouter.delete("/:id", async (req, res) => {
      let id = parseInt(req.params.id)
      super.deleteByID(id)
      .then((result) => res.send('carrito eliminado'))
      .catch((err) => res.send({error: `error al eliminar el carrito ${err}`}))
    });

    this.cartRouter.delete('/:id/productos/:id_prod', async (req, res) => {
      let cartId = parseInt(req.params.id)
      let prodId = parseInt(req.params.id_prod)
      super.getByID(cartId)
      .then((cart) => {
        cart.products = cart.products.filter((prod) => prod.id !== prodId)
        super.update(cartId,cart)
        return res.send('producto eliminado del carrito')
      })
      .catch((err) => res.send({error: `error al eliminar producto del carrito ${err}`}))
    })

  }

  getRouter = () => {
    return this.cartRouter
  }

}

module.exports = CartDaoFiles;