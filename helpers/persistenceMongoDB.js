const mongoose = require('mongoose');

//CREO SCHEMAS Y MODELS PARA PRODUCTOS Y CARRITO
const productsSchema = new mongoose.Schema({
    date:{ type: Date, required: true},
    name:{type: String, required:true},
    description:{type: String, required:true},
    code:{type: Number, required:true, unique: true},
    thumbnail:{type: String, required:true},
    price:{type: Number, required:true},
    stock:{type: Number, required:true}
})
const cartSchema = new mongoose.Schema({
    date:{ type: Date, required: true},
    products:{type: Array, required:true}
})

const productModel = mongoose.model('products', productsSchema)
const cartModel = mongoose.model('cart', cartSchema)

class PersistenceMongoDB {
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
            console.log(`No se obtuvieron los productos ${error}`);
        }
    }

    async getByID(collection,id){
        let objId = mongoose.Types.ObjectId(id)
        try {
            if (collection == 'products') {
                let product = await productModel.find({_id:objId})
                return product
            } else {
                let cart = await cartModel.find({_id:objId})
                return cart
            }
        } catch (error) {
            console.log(`No se pudo obtener el producto ${error}`);
        }
        
    }
    async save(collection,product){
        try {
            if (collection == 'products') {
                let newProduct = new model.productModel(product)
                let saveProduct = await newProduct.save()
                return saveProduct
            } else {
                let newCart = new model.cartModel(product)
                let saveCart = await newCart.save()
                return saveCart
            }
        } catch (error) {
            console.log(`Error al guardar el producto ${error}`);
        }
        
    }
    async update(collection,id,product){
        let objId = mongoose.Types.ObjectId(id)
        try {
            if (collection == 'products') {
                let newProduct = await productModel.updateOne({
                    _id:objId
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
                },{$set:{
                    date:product.date,
                    products:product.products
                }})
                return newCart
            }
        } catch (error) {
            console.log(`Error al actualizar producto${error}`);
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
            console.log(`Error al eliminar producto${error}`);
        }
    }
    async closeConnection(){
        return await mongoose.disconnect();
    }


}

module.exports = PersistenceMongoDB;

