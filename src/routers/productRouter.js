import {Router} from 'express'
import {isAdmin} from "../middleware/isAuth.js";
import prodController from '../controllers/productController.js';

const productsRouter = Router()

productsRouter.get('/', prodController.get.bind(prodController));

productsRouter.get('/:id', prodController.getById.bind(prodController));

productsRouter.get('/:category', prodController.getByCategory.bind(prodController));

productsRouter.post('/', isAdmin, prodController.post.bind(prodController));

productsRouter.put('/:id', isAdmin, prodController.put.bind(prodController));

productsRouter.delete("/:id", isAdmin, prodController.delete.bind(prodController));

export { productsRouter};