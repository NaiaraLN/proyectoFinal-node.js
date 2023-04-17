import CartService from "../services/cartService.js";
import CartDTO from "../dto/cartDTO.js"
import UserDTO from "../dto/userDTO.js"

let user;
class CartController extends CartService{
    async get(req,res){
        let mail = req.user.mail;        
        let cart = await this.getCart(mail)
        let cartDto = cart? new CartDTO(cart) : null
        let admin = req.user?.username === 'admin';
        user = req.user? new UserDTO(req.user,admin) : null;
        res.render('cart', {cart:cartDto, user:user})
    }
    async post(req,res){
        let username= req.user.username
        let cart = await this.postCart(req.body,username)
        if(cart){
            res.redirect('/productos')
        }
    }
    async put(req,res){
        let id = req.params.id;
        let mail = req.user.mail;
        let cart = await this.updateCart(id,req.body, mail)
        if(cart){
            res.sendStatus(200)
        }
    }
    async postCheckout(req,res){
        const mail = req.user.mail;
        const username = req.user.username;
        let order = await this.createOrder(mail,username)
        if(order){
            res.render('checkout',{user:user})
        }
    }
    async delete(req,res){
        let mail = req.user.mail;
        const response = await this.deleteCart(mail)
        if(response){
            res.sendStatus(200);
        }
    }
    async delProdCart(req,res){
        let prodId = req.params.id;
        let mail = req.user.mail;
        let cart = await this.deleteProd(mail,prodId)
        if(cart){
            res.sendStatus(200)
        }
    }
}
export default new CartController()