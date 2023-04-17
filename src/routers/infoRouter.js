import {Router} from "express";
import InfoController from "../controllers/infoController.js";
import { isAdmin, isAuth } from "../middleware/isAuth.js";
const infoRouter = Router()

infoRouter.get('/',isAuth,isAdmin, InfoController.getInfo.bind(InfoController));

export default infoRouter;