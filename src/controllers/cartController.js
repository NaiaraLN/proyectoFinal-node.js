import CartService from "../services/cartService.js";

class CartController extends CartService{
    async get(req,res){
        let mail = req.user.mail;
        let cart = await this.getCart(mail)
        res.json(cart)
    }
    async post(req,res){
        let username= req.user.username
        let cart = await this.postCart(req.body,username)
        res.json(cart)
    }
    async put(req,res){
        let id = req.params.id;
        let mail = req.user.mail;
        let cart = await this.updateCart(id,req.body, mail)
        res.json(cart)
    }
    async postCheckout(req,res){
        const mail = req.user.mail;
        const username = req.user.username;
        let order = await this.createOrder(mail,username)
        res.json(order)
    }
    async delete(req,res){
        let mail = req.user.mail;
        await this.deleteCart(mail)
        res.json('carrito eliminado')
    }
    async delProdCart(req,res){
        let prodId = req.params.id;
        let mail = req.user.mail;
        let cart = await this.deleteProd(mail,prodId)
        res.json(cart)
    }
}
export default new CartController()