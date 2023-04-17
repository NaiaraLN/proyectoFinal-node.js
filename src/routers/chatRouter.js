import { Router } from "express";
import ChatController from "../controllers/chatController.js"
import { isAuth } from "../middleware/isAuth.js";
const chatRouter = Router()

chatRouter.get('/',isAuth, ChatController.getAll.bind(ChatController));
chatRouter.get('/:email',isAuth, ChatController.getUserMsg.bind(ChatController))

export default chatRouter