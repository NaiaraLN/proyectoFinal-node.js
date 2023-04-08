import ChatService from "../services/chatService.js";

class ChatController{
    async getAll(req,res){
        let email = req.user?.mail;
        res.render('chat', {email})
    }
    async getUserMsg(req,res){
        let type
        req.user?.username === 'asistente' ? type='system' : type='user'
        let email = req.params.email
        const messages = await ChatService.getByType(email, type)
        res.render('myMsg', {messages})
    }
}

export default new ChatController()