const {getFirestore} = require('firebase-admin/firestore')
let admin = require("firebase-admin");

let serviceAccount = require("../db/data.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

//AGREGAR carts.add({object})
/* LISTAR
    const snapshot = await carts.get();
    snapshot.forEach((doc) => {
        let cart = {
            id:doc.id,
            ...doc.data()
        }
    })

    snapshot.forEach((doc) => {
        let cart = {
            id:doc.id,
            products:doc.products
        }
    })
*/

/* MODIFICAR
    await carts.doc(cartId.id).update({products:products})
    con productos:
    await products.doc(prod.id).update({
        id:product.id,
        date:product.date,
        name:product.name,
        description:product.description,
        code:product.code,
        thumbnail:product.thumbnail,
        price:product.price,
        stock:product.stock
    })
*/

/* ELIMINAR UN DOCUMENTO
    await carts.doc(cart.id).delete()
*/



class ContainerFireStore {
    constructor(){
        this.carts = db.collection('carts'),
        this.products = db.collection('products')
    }

    async getAll(collection) {
        try {
            if (collection == 'products') {
                const snapshot = await this.products.get();
                snapshot.forEach((doc) => {
                    let product = {
                        id:doc.id,
                        ...doc.data()
                    }
                    return product
                })
                return snapshot
            } else {
                const snapshot = await this.carts.get();
                snapshot.forEach((doc) => {
                    let cart = {
                        id:doc.id,
                        ...doc.data()
                    }
                    return cart
                })
                console.log(snapshot)
                return snapshot
            }
        } catch (error) {
            console.log(`No se obtuvieron los documentos ${error}`)
        }
    }

    async getByID(collection,id){
        try {
            if (collection == 'products') {
                const snapshot = this.products.doc(id)
                let doc = await snapshot.get()
                let product = {
                    id:doc.id,
                    ...doc.data()
                }
                console.log(product)
                return product
            } else {
                let snapshot = this.carts.doc(id)
                let doc = await snapshot.get()
                let cart = {
                    id:doc.id,
                    ...doc.data()
                }
                console.log(cart)
                return cart
            }
        } catch (error) {
            if (collection == 'products') {
                console.log(`No se pudo obtener el producto ${error}`);
            } else {
                console.log(`No se pudo obtener el carrito ${error}`);
            }
            
        }
    }

    async save(collection, product){
        try {
            if (collection == 'products') {
                let products = await this.products.add(product)
                return products
            } else {
                let carts = await this.carts.add(product)
                return carts
            }
        } catch (error) {
            if (collection == 'products') {
                console.log(`Error al guardar el producto ${error}`);
            } else {
                console.log(`Error al guardar el carrito ${error}`);
            }
            
        }
    }

    async update(collection,id,product){
        try {
            if (collection == 'products') {
                const newProducts = await products.doc(id).update({
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
                const newCart = await carts.doc(id).update({products:product})
                return newCart
            }
        } catch (error) {
            if (collection == 'products') {
                console.log(`Error al actualizar el producto ${error}`);
            } else {
                console.log(`Error al actualizar el carrito ${error}`);
            }
        }
    }

    async deleteByID(collection,id){
        try {
            
        } catch (error) {
            if (collection == 'products') {
                console.log(`Error al eliminar el producto ${error}`);
            } else {
                console.log(`Error al eliminar el carrito ${error}`);
            }
        }
    }
}

module.exports = ContainerFireStore;
