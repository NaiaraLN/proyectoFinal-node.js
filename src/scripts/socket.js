import ChatService from "../services/chatService.js"
import mongoDao from "../model/mongoDao.js"
import logger from "./logger.js"

export default class ChatSocket{
    constructor(io){
        this.messages = []
        this.connection = io.on('connection', async (socket) =>{
            logger.info(`Un usuario esta conectado ${socket.id}`)
            await this.sendMessages(socket)
            await this.newMessages(socket, io)
        })
    }
    getAll(){
        return [...this.messages]
    }
    async sendMessages(socket){
            /* let mail = socket.user.mail
            let type;
            socket.user?.username === 'asistente' ? type = 'system' : type = 'user'; */
            // const messages = await ChatService.getAllMessages()
            const messages = this.getAll()
            socket.emit('messages', messages)
    }

    async newMessages(socket, io){
            socket.on('newMessage', async (message) => {
                let mail = message.userMail;
                /* const user = mongoDao.getUser(mail)
                let type;
                user.username === 'asistente' ? type = 'system' : type = 'user';
                const save = await ChatService.saveMessages(message,type) */
                this.messages.push(message)
                /* if (save) {
                    const messages = await ChatService.getAllMessages(mail,type)
                    io.emit('messages', messages)
                } */
                const messages = this.getAll()
                io.emit('messages', messages)
            })
    }
}
