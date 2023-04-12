import MongoDao from '../model/mongoDao.js'
import logger from '../scripts/logger.js'

export default class ProductService{
    async getAllProds(category){
        try {
            let products = await MongoDao.getAll('products', null,null,category)
            return products
        } catch (error) {
            logger.error(`hubo un error al traer los productos ${error}`)
        }
    }
    async getProd(id){
        try {
            let product = await MongoDao.getByID('products',id)
            return product
        } catch (error) {
            logger.error(`Producto no encontrado ${error}`)
        }
    }
    async createProd({name,description,code,thumbnail,price}){
        try {
            const product = {
                date: Date.now(),
                name: name,
                description:description,
                code:code,
                thumbnail:thumbnail,
                price:price
            };
            let saveProd = await MongoDao.save('products',product)
            if(saveProd){return {status:'success',description:'El producto se guardó con éxito'}}
        } catch (error) {
            logger.error(`No se pudo guardar el producto ${error}`)
        }
    }
    async updateProd(id,{_id,name,description,code,thumbnail,price}){
        try {
            let product = {
                _id:_id,
                date: Date.now(),
                name: name,
                description:description,
                code:code,
                thumbnail:thumbnail,
                price:price
            };
            let newProd = await MongoDao.update('products',id,product)
            return newProd  
        } catch (error) {
            logger.error(`error al actualizar producto ${error}`)
        }
    }
    async deleteProd(id){
        try {
            let delProd = await MongoDao.deleteById('products',id)
            return delProd
        } catch (error) {
            logger.error(`error al eliminar producto ${error}`)
        }
    }

}