const admin = require('firebase-admin');
const { ProductsDaoFiles } = require('../daos/importsDao');
const serviceAccount = require('../db/desafio-coder-861fd-firebase-adminsdk-evlvg-2c8f0fbe47.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://desafio-coder-861fd.firebaseio.com'
})
let db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

class ContainerFireStore {
    constructor(coll){
        this.coll = coll
        this.collection = db.collection(this.coll)
    }
    async getAll(collection) {
        try {
            if (collection === 'products' && this.coll == 'products') {
                const result = []
                const snapshot = await this.collection.get();
                snapshot.forEach((doc) => {
                    let product = {
                        id:doc.id,
                        ...doc.data()
                    }
                    result.push(product)
                })
                return result
            } else {
                const result = []
                const snapshot = await this.collection.get();
                snapshot.forEach((doc) => {
                    let cart = {
                        id:doc.id,
                        ...doc.data()
                    }
                    result.push(cart)
                })
                return result
            }
        } catch (error) {
            console.log(`No se obtuvieron los documentos ${error}`)
        }
    }

    async getByID(collection,id){
        try {
            if (collection === 'products' && this.coll == 'products') {
                const snapshot = this.collection.doc(id)
                let doc = await snapshot.get()
                let product = {
                    id:doc.id,
                    ...doc.data()
                }
                console.log(product)
                return product
            } else {
                let snapshot = this.collection.doc(id)
                let doc = await snapshot.get()
                let cart = {
                    id:doc.id,
                    ...doc.data()
                }
                console.log(cart)
                return cart
            }
        } catch (error) {
            if (collection === 'products') {
                console.log(`No se pudo obtener el producto ${error}`);
            } else {
                console.log(`No se pudo obtener el carrito ${error}`);
            }
            
        }
    }

    async save(collection, product){
        try {
            if (collection === 'products' && this.coll == 'products') {
                let products = await this.collection.add(product)
                return products
            } else {
                let carts = await this.collection.add(product)
                return carts
            }
        } catch (error) {
            if (collection === 'products') {
                console.log(`Error al guardar el producto ${error}`);
            } else {
                console.log(`Error al guardar el carrito ${error}`);
            }
            
        }
    }

    async update(collection,id,product){
        try {
            if (collection === 'products' && this.coll == 'products') {
                const newProducts = await this.collection.doc(id).update({
                    id:product.id,
                    date:product.date,
                    name:product.name,
                    description:product.description,
                    code:product.code,
                    thumbnail:product.thumbnail,
                    price:product.price,
                    stock:product.stock
                })
                return newProducts
            } else {
                const newCart = await this.collection.doc(id).update({products:FieldValue.arrayUnion(product)})
                return newCart
            }
        } catch (error) {
            if (collection === 'products') {
                console.log(`Error al actualizar el producto ${error}`);
            } else {
                console.log(`Error al actualizar el carrito ${error}`);
            }
        }
    }

    async deleteByID(collection,id){
        try {
            if (collection === 'products' && this.coll == 'products') {
                await this.collection.doc(id).delete()
                return {status: 'exito', description: 'producto eliminado'}
            } else {
                await this.collection.doc(id).delete()
                return {status: 'exito', description: 'carrito eliminado'}
            }
        } catch (error) {
            if (collection === 'products') {
                console.log(`Error al eliminar el producto ${error}`);
            } else {
                console.log(`Error al eliminar el carrito ${error}`);
            }
        }
    }

    async deleteProdCart(cartId,prodId){
        try {
            let cart = await this.getByID('carts', cartId)
            cart.products = cart.products.filter((prod) => prod.id !== prodId)
            let newCart = await this.collection.doc(cartId).update({products:cart.products})
            return newCart
        } catch (error) {
            console.log(`Error al eliminar el producto del carrito ${error}`);
        }
    }
}


module.exports = ContainerFireStore;
