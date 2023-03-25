import mongoose from 'mongoose';
import {productModel} from '../model/productsModel'
import {cartModel} from '../model/cartModel'
import {userModel} from "../model/userModel";
import orderModel from "../model/orderModel"
import logger from "../scripts/logger"

mongoose.set("strictQuery", false);

class ContainerMongoDB {
    constructor(connection){
        this.connection = connection
    }
    async startConnection() {
        await mongoose.connect(this.connection,{
        serverSelectionTimeoutMS: 5000,
        })
        return {status:'éxito', description:'base de datos conectada'}
    }
    async getAll(collection) {
        try {
            if (collection == 'products') {
                let allProducts = await productModel.find({})
                return allProducts
            } else {
                let allCarts = await cartModel.find({})
                return allCarts
            }
        } catch (error) {
            if (collection == 'products') {
                logger.error(`Error al obtener los productos ${error}`)
            } else {
                logger.error(`Error al obtener los carritos ${error}`)
            }
        }
    }

    async getByID(collection,id){
        let objId = mongoose.Types.ObjectId(id)
        try {
            if (collection == 'products') {
                let product = await productModel.findById({_id:objId})
                return product
            } else if(collection == 'carts'){
                let cart = await cartModel.findById({_id:objId},{products:1, date:1})
                return cart
            }else{
                let order = await orderModel.findById({_id:objId})
                return order
            }
        } catch (error) {
            if (collection == 'products') {
                logger.error(`Error al obtener el producto ${error}`)
            } else if(collection == 'carts'){
                logger.error(`Error al obtener el carrito ${error}`)
            }else{
                logger.error(`Error al obtener la orden ${error}`)
            }
        }
        
    }
    async getUser(username){
        try {
            const user = await userModel.findOne({username})
            return user
        } catch (error) {
            logger.error(`Error al obtener al usuario ${error}`)
        }
    }
    async save(collection,product){
        try {
            if (collection == 'products') {
                let newProduct = new productModel(product)
                let saveProduct = await newProduct.save()
                return saveProduct
            } else if(collection == 'carts') {
                let newCart = new cartModel(product)
                let saveCart = await newCart.save()
                return saveCart
            }else if(collection == 'orders'){
                let newOrder = new orderModel(product)
                let saveOrder = await newOrder.save()
                return saveOrder
            }else{
                const newuser = new userModel(newUser)
                let saveUser = await newuser.save()
                return saveUser
            }
        } catch (error) {
            if (collection == 'products') {
                logger.error(`Error al guardar el producto ${error}`);
            } else if(collection == 'carts'){
                logger.error(`Error al guardar el carrito ${error}`)
            }else if(collection == 'orders'){
                logger.error(`Error al guardar la orden ${error}`)
            }else{
                logger.error(`error al guardar el usuario ${error}`)
            }
            
        }
        
    }
    async update(collection,id,product){
        let objId = mongoose.Types.ObjectId(id)
        try {
            if (collection == 'products') {
                let newProduct = await productModel.updateOne({
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
                let newCart = await cartModel.updateOne({
                    _id:objId
                },{$push:{
                    'products':product
                }})
                return newCart
            }
        } catch (error) {
            if (collection == 'products') {
                logger.error(`Error al actualizar el producto ${error}`);
            } else {
                logger.error(`Error al actualizar el carrito ${error}`)
            }
            
        }
    }
    async deleteByID(collection,id){
        let objId = mongoose.Types.ObjectId(id)
        try {
            if (collection == 'products') {
                let prod = await productModel.deleteOne({_id:objId})
                return prod
            } else {
                let cart = await cartModel.deleteOne({_id:objId})
                return cart
            }
        } catch (error) {
            if (collection == 'products') {
                logger.error(`Error al eliminar el producto ${error}`);
            }else{
                logger.error(`Error al eliminar el carrito ${error}`)
            }
            
        }
    }
    async deleteProdCart(cartId,prodId, cart) {
        let objId = mongoose.Types.ObjectId(cartId)
        try {
            let prod = cart.products.find((prod) => prod._id.toString() === prodId)
            if (prod) {
                let newCart = await cartModel.updateOne({_id:objId}, {$pull:{products:prod}})
                return newCart
            }
        } catch (error) {
            logger.error(`Error al eliminar el producto del carrito ${error}`)
        }
    }

    async getConnection () {
        await this.startConnection()
    }
}

export default ContainerMongoDB;

