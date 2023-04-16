import mongoose from 'mongoose';
import ProductDao from './productDao.js'
import CartDao from './cartDao.js'
import UserDao from "./userDao.js";
import OrderDao from "./orderDao.js"
import MessagesDao from './messagesDao.js'
import logger from "../scripts/logger.js"
import { MONGO_URI } from '../config.js';

mongoose.set("strictQuery", false);

class MongoDao {
    constructor(connection){
        this.mongoose =  mongoose.connect(connection,{
            serverSelectionTimeoutMS: 5000,
            })
            .catch(err => {
                console.log(err)
                process.exit()
            })

        this.models = {
            [ProductDao.model]: mongoose.model(ProductDao.model,ProductDao.schema),
            [CartDao.model]: mongoose.model(CartDao.model,CartDao.schema),
            [OrderDao.model]: mongoose.model(OrderDao.model,OrderDao.schema),
            [UserDao.model]: mongoose.model(UserDao.model, UserDao.schema),
            [MessagesDao.model]: mongoose.model(MessagesDao.model, MessagesDao.schema)
        }
    }
    async getAll(collection, mail, type, category) {
        try {
            let array = await this.models[collection].find({$or:[{mail:mail}, {type:type},{category:category},{}]})
                return array
        } catch (error) {
            logger.error(`Error al obtener los datos de la colección ${collection}: ${error}`)
        }
    }

    async getByID(collection,id){
        try {
            let objId = mongoose.Types.ObjectId(id)
            let obj = await this.models[collection].findById({_id:objId})
            return obj
        } catch (error) {
            logger.error(`Error al obtener el objeto por id de la colección ${collection}: ${error}`)
        }
    }
    async getOne(collection,property){
        try {
            if(collection === 'users'){
                const user = await this.models[collection].findOne({username:property})
                return user
            }else{
                const cart = await this.models[collection].findOne({email:property})
                return cart
            }
            
        } catch (error) {
            logger.error(`Error al obtener el objeto de la colección ${collection}: ${error}`)
        }
    }
    async save(collection,object){
        try {
            let newObj = new this.models[collection](object)
            let save = await newObj.save()
            return save
        } catch (error) {
            logger.error(`Error al guardar el objecto en la colección ${collection}: ${error}`);
        }
        
    }
    async update(collection,id,product){
        try {
            let objId = mongoose.Types.ObjectId(id)
            if (collection === 'products') {
                let newProduct = await this.models[collection].updateOne({
                    '_id':objId
                },{$set:{
                    date:product.date,
                    name:product.name,
                    description:product.description,
                    code:product.code,
                    thumbnail:product.thumbnail,
                    price:product.price,
                    stock:product.stock
                }})
                return newProduct
            } else {
                if (product.length) {
                    let newCart = await this.models[collection].updateOne({
                        _id:objId
                    },{$set:{
                        'products':product
                    }})
                    return newCart
                }else{
                    let newCart = await this.models[collection].updateOne({
                        _id:objId
                    },{$push:{
                        'products':product
                    }})
                    return newCart
                }
                
            }
        } catch (error) {
            logger.error(`Error al actualizar el producto en la colección ${collection}: ${error}`);
        }
    }
    async deleteById(collection,id){
        try {
            let objId = mongoose.Types.ObjectId(id)
            let obj = await this.models[collection].deleteOne({_id:objId})
            return obj
        } catch (error) {
            logger.error(`Error al eliminar el objecto de la colección ${collection}: ${error}`);
        }
    }
    async deleteProdCart(collection,cartId,prodId, cart) {
        try {
            let objId = mongoose.Types.ObjectId(cartId)
            let prod = cart.products.find((prod) => prod._id.toString() === prodId)
            if (prod) {
                let newCart = await this.models[collection].updateOne({_id:objId}, {$pull:{products:prod}})
                return newCart
            }
        } catch (error) {
            logger.error(`Error al eliminar el producto del carrito ${error}`)
        }
    }

}

export default new MongoDao(MONGO_URI)

