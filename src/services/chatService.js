import MongoDao from "../model/mongoDao.js";
import logger from "../scripts/logger.js";

class ChatService{
    async getAllMessages(){
        try {
            const chat = await MongoDao.getAll('messages')
            return chat
            
        } catch (error) {
            logger.error(`error al traer los mensajes: ${error}`)
        }
    }
    async getByType(email,type){
        try {
            if(type === 'system'){
                const messages = await MongoDao.getAll('messages', type)
                return messages
            }else{
                const messages = await MongoDao.getAll('messages', email,type)
                return messages
            }
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
            const save = await MongoDao.save('messages', message)
            if(save){
                return {status:200}
            }
        } catch (error) {
            logger.error(`error al guardar los mensajes: ${error}`)
        }
    }
}
export default new ChatService()