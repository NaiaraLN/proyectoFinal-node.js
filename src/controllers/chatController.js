import ChatService from "../services/chatService.js";
import MessageDTO from "../dto/messageDTO.js";
import UserDTO from "../dto/userDTO.js";

class ChatController{
    async getAll(req,res){
        let email = req.user?.mail;
        let admin = req.user?.username === 'admin'
        let user = req.user? new UserDTO(req.user,admin) : null
        res.render('chat', {email, user:user})
    }
    async getUserMsg(req,res){
        let type
        req.user?.username === 'admin' ? type='system' : type='user'
        let email = req.params.email
        let admin = req.user?.username === 'admin'
        let user = req.user? new UserDTO(req.user,admin) : null
        const msgs = await ChatService.getByType(email, type)
        let messages = msgs.map(msg => new MessageDTO(msg,user.username))
        res.render('myMsg', {messages, user})
    }
}

export default new ChatController()