import CartService from "../services/cartService.js";

class CartController extends CartService{
    async getAll(_,res){
        let carts = await this.getAllCarts()
        res.json(carts)
    }
    async get(req,res){
        let id = req.params.id;
        let cart = await this.getCart(id)
        res.json(cart)
    }
    async post(req,res){
        let username= req.user.username
        let cart = await this.createCart(req,body,username)
        res.json(cart)
    }
    async put(req,res){
        let id = req.params.id;
        let cart = await this.updateCart(id,req.body)
        res.json(cart)
    }
    async postCheckout(req,res){
        const cartId = req.params.id;
        const username = req.user.username;
        let order = await this.createOrder(cartId,username)
        res.json(order)
    }
    async delete(req,res){
        let id = req.params.id;
        await this.deleteCart(id)
        res.json('carrito eliminado')
    }
    async delProdCart(req,res){
        let cartId = req.params.id;
        let prodId = req.params.id_prod
        let cart = await this.deleteProd(cartId,prodId)
        res.json(cart)
    }
}
export default new CartController()