import { Router } from 'express';
import {isAuth} from '../middleware/isAuth.js';
import cartController from '../controllers/cartController.js';

const cartRouter = Router();
cartRouter.get('/', isAuth , cartController.getAll.bind(cartController));

cartRouter.get('/:id/productos', isAuth ,cartController.get.bind(cartController));

cartRouter.post('/',isAuth , cartController.post.bind(cartController));

cartRouter.post('/:id/productos', isAuth ,cartController.put.bind(cartController))

cartRouter.post("/:id/checkout", isAuth ,cartController.postCheckout.bind(cartController))

cartRouter.delete("/:id", isAuth ,cartController.delete.bind(cartController));

cartRouter.delete('/:id/productos/:id_prod',isAuth ,cartController.delProdCart.bind(cartController))

export {cartRouter};
