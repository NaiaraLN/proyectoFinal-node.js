import {Router} from "express";
import InfoController from "../controllers/infoController.js";

const infoRouter = Router()

infoRouter.get('/', InfoController.getInfo.bind(InfoController));

export default infoRouter;