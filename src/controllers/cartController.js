import CartService from "../services/cartService.js";
import CartDTO from "../dto/cartDTO.js"
import UserDTO from "../dto/userDTO.js"

class CartController extends CartService{
    async get(req,res){
        console.log('CartController get')
        let mail = req.user.mail;
        let user = req.user? new UserDTO(req.user) : null;
        let cart = await this.getCart(mail)
        let cartDto = cart? new CartDTO(cart) : null
        res.render('cart', {cart:cartDto, user:user})
    }
    async post(req,res){
        console.log('CartController post')
        console.log(req.body.category)
        let username= req.user.username
        let cart = await this.postCart(req.body,username)
        if(cart){
            res.redirect('/productos')
        }
    }
    async put(req,res){
        console.log('CartController put')
        let id = req.params.id;
        let mail = req.user.mail;
        let cart = await this.updateCart(id,req.body, mail)
        if(cart){
            res.sendStatus(200)
        }
    }
    async postCheckout(req,res){
        console.log('CartController postCheckout')
        const mail = req.user.mail;
        const username = req.user.username;
        let user = req.user? new UserDTO(req.user) : null;
        let order = await this.createOrder(mail,username)
        if(order){
            res.render('checkout',{user:user})
        }
    }
    async delete(req,res){
        console.log('CartController delete')
        let mail = req.user.mail;
        const response = await this.deleteCart(mail)
        if(response){
            res.sendStatus(200);
        }
    }
    async delProdCart(req,res){
        console.log('CartController delProdCart')
        let prodId = req.params.id;
        let mail = req.user.mail;
        let cart = await this.deleteProd(mail,prodId)
        if(cart){
            res.sendStatus(200)
        }
    }
}
export default new CartController()