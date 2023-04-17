import ProductService from "../services/productService.js";
import deleteDuplicated from "../utils/deleteDuplicated.js";
import userDTO from "../dto/userDTO.js"
import ProductDTO from "../dto/productDTO.js";

let categories;
let user;
let admin;

class ProdController extends ProductService{
    async get(req,res){
        console.log('ProdController get')
        let products = await this.getAllProds()
        admin = req.user?.username === 'admin'
        user = req.user? new userDTO(req.user, admin) : null
        categories = deleteDuplicated(products)
        const prod = products.map(prod => new ProductDTO(prod))
        res.render('main', {products:prod, user, categories, admin:admin})
    }
    async getById(req,res){
        console.log('ProdController getById')
        let id = req.params.id;
        let product = await this.getProd(id)
        let prod = new ProductDTO(product)
        res.render('itemDetail', {product:prod, user:user, categories})
    }
    async getForm(_,res){
        console.log(' ProdController get form render')
        res.render('postProd', {user:user})
    }
    async updateForm(req,res){
        console.log('prodcontroller updateForm')
        let id = req.params.id;
        let product = await this.getProd(id)
        const prod = new ProductDTO(product)
        res.render('updateProd',{product:prod, user:user})
    }
    async getByCategory(req,res){
        console.log('prodController getByCategory')
        let category = req.params.category;
        let products = await this.getAllProds(category)
        const prod = products.map(prod => new ProductDTO(prod))
        res.render('category',{products:prod, user:user, categories, admin:admin})
    }
    async post(req,res){
        console.log(' prodController post')
        let product = await this.createProd(req.body)
        if(product){
            res.redirect('/productos');
        }
    }
    async put(req,res){
        console.log('prodController put')
        let id = req.params.id;
        let product = await this.updateProd(id,req.body)
        if(product){
            res.sendStatus(200)
        }else{
            console.log('error')
        }
    }
    async delete(req,res){
        console.log(' prodController delete')
        let id = req.params.id;
        let product = await this.deleteProd(id)
        if(product){
            res.sendStatus(200)
        }
    }
}
export default new ProdController()