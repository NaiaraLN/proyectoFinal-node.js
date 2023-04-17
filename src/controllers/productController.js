import ProductService from "../services/productService.js";
import deleteDuplicated from "../utils/deleteDuplicated.js";
import userDTO from "../dto/userDTO.js"
import ProductDTO from "../dto/productDTO.js";

let user;
let categories;

class ProdController extends ProductService{
    async get(req,res){
        let products = await this.getAllProds()
        let admin = req.user?.username === 'admin'
        user = req.user? new userDTO(req.user, admin) : null
        categories = deleteDuplicated(products)
        const prod = products.map(prod => new ProductDTO(prod))
        res.render('main', {products:prod, user, categories, admin:admin})
    }
    async getById(req,res){
        let id = req.params.id;
        let product = await this.getProd(id)
        let prod = new ProductDTO(product)
        res.render('itemDetail', {product:prod, user:user, categories})
    }
    async getForm(_,res){
        res.render('postProd', {user:user})
    }
    async updateForm(req,res){
        let id = req.params.id;
        let product = await this.getProd(id)
        const prod = new ProductDTO(product)
        res.render('updateProd',{product:prod, user:user})
    }
    async getByCategory(req,res){
        let category = req.params.category;
        let products = await this.getAllProds(category)
        const prod = products.map(prod => new ProductDTO(prod))
        res.render('category',{products:prod, user:user, categories, admin:user.admin})
    }
    async post(req,res){
        let product = await this.createProd(req.body)
        if(product){
            res.redirect('/productos');
        }
    }
    async put(req,res){
        let id = req.params.id;
        let product = await this.updateProd(id,req.body)
        if(product){
            res.sendStatus(200)
        }else{
            console.log('error')
        }
    }
    async delete(req,res){
        let id = req.params.id;
        let product = await this.deleteProd(id)
        if(product){
            res.sendStatus(200)
        }
    }
}
export default new ProdController()