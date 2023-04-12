import { Router } from 'express';
import {isAuth} from '../middleware/isAuth.js';
import cartController from '../controllers/cartController.js';

const cartRouter = Router();
cartRouter.get('/', isAuth , cartController.get.bind(cartController));

cartRouter.post('/',isAuth , cartController.post.bind(cartController));

cartRouter.put('/:id', isAuth ,cartController.put.bind(cartController))

cartRouter.post("/checkout", isAuth ,cartController.postCheckout.bind(cartController))

cartRouter.delete("/", isAuth ,cartController.delete.bind(cartController));

cartRouter.delete('/:id',isAuth ,cartController.delProdCart.bind(cartController))

export {cartRouter};
