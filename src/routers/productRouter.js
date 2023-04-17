import {Router} from 'express'
import {isAdmin, isAuth} from "../middleware/isAuth.js";
import productController from '../controllers/productController.js';

const productsRouter = Router()

productsRouter.get('/',isAuth, productController.get.bind(productController));

productsRouter.get('/formulario',isAuth,isAdmin, productController.getForm.bind(productController));

productsRouter.get('/:id',isAuth, productController.getById.bind(productController));

productsRouter.get('/categoria/:category', isAuth,productController.getByCategory.bind(productController));

productsRouter.get('/:id/actualizar',isAuth, isAdmin,productController.updateForm.bind(productController));

productsRouter.post('/',isAuth, isAdmin, productController.post.bind(productController));

productsRouter.put('/:id',isAuth, isAdmin, productController.put.bind(productController));

productsRouter.delete("/:id",isAuth, isAdmin, productController.delete.bind(productController));

export { productsRouter};