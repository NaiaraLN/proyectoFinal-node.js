import ChatService from "../services/chatService.js"
import logger from "./logger.js"

export default class ChatSocket{
    constructor(io){
        this.connection = io.of('/chat').on('connection', async (socket) =>{
            logger.info(`Un usuario esta conectado ${socket.id}`)
            await this.sendMessages(socket)
            await this.newMessages(socket)
        })
    }
    async sendMessages(socket){
            const messages = await ChatService.getAllMessages();
            socket.emit('messages', messages)
    }

    async newMessages(socket){
            socket.on('newMessage', async (message) => {
                let username = socket.handshake.auth.username;
                let type
                username === 'admin' ? type='system' : type='user';
                const save = await ChatService.saveMessages(message,type)
                if (save) {
                    const messages = await ChatService.getAllMessages();
                    socket.emit('messages', messages)
                }
            })
    }
}
