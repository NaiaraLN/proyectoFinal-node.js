import ProductService from "../services/productService.js";

class ProdController extends ProductService{
    async get(_,res){
        let products = await this.getAllProds()
        res.json(products)
    }
    async getById(req,res){
        let id = req.params.id;
        let product = await this.getProd(id)
        res.json(product)
    }
    async getByCategory(req,res){
        let category = req.params.category;
        let products = await this.getAllProds(category)
        res.json(products)
    }
    async post(req,res){
        let product = await this.createProd(req.body)
        res.json(product)
    }
    async put(req,res){
        let id = req.params.id;
        let product = await this.updateProd(id,req.body)
        res.json(product)
    }
    async delete(req,res){
        let id = req.params.id;
        let product = await this.deleteProd(id)
        res.json(product)
    }
}
export default new ProdController()