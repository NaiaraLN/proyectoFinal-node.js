import {Router} from 'express'
import {isAdmin} from "../middleware/isAuth.js";
import productController from '../controllers/productController.js';

const productsRouter = Router()

productsRouter.get('/', productController.get.bind(productController));

productsRouter.get('/formulario',isAdmin, productController.getForm.bind(productController));

productsRouter.get('/:id', productController.getById.bind(productController));

productsRouter.get('/categoria/:category', productController.getByCategory.bind(productController));

productsRouter.get('/:id/actualizar', isAdmin,productController.updateForm.bind(productController));

productsRouter.post('/', isAdmin, productController.post.bind(productController));

productsRouter.put('/:id', isAdmin, productController.put.bind(productController));

productsRouter.delete("/:id", isAdmin, productController.delete.bind(productController));

export { productsRouter};