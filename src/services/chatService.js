import MongoDao from "../model/mongoDao.js";
import logger from "../scripts/logger.js";

class ChatService{
    async getAllMessages(email,type){
        try {
            if (type === 'system') {
                const chat = await MongoDao.getAll('messages',email, type)
                return chat
            } else {
                const chat = await MongoDao.getAll('messages', email)
                return chat
            }
            
        } catch (error) {
            logger.error(`error al traer los mensajes: ${error}`)
        }
    }
    async getByType(email,type){
        try {
            const messages = await MongoDao.getAll('messages', email, type)
            return messages
        } catch (error) {
            logger.error(`error al traer los mensajes del usuario: ${error}`)
        }
    }
    async saveMessages({text, mail}, type){
        try {
            let message = {
                mail: mail,
                type: type,
                date: Date.now(),
                message: text
            }
            return await MongoDao.save('messages', message)
        } catch (error) {
            logger.error(`error al guardar los mensajes: ${error}`)
        }
    }
}
export default new ChatService()