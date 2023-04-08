import { Router } from "express";
import ChatController from "../controllers/chatController.js"

const chatRouter = Router()

chatRouter.get('/', ChatController.getAll.bind(ChatController));
chatRouter.get('/:email', ChatController.getUserMsg.bind(ChatController))

export default chatRouter