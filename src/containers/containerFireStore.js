class ContainerFireStore {
    constructor(coll,db){
        this.collName = coll
        this.collection = db.collection(this.collName)
    }

    async getAll(collection) {
        try {
            if (this.collName === 'products' && collection === 'products') {
                const snapshot = await this.collection.get();
                snapshot.forEach((doc) => {
                    let product = {
                        id:doc.id,
                        ...doc.data()
                    }
                    return product
                })
                return snapshot
            } else {
                const snapshot = await this.collection.get();
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
            if (this.collName === 'products' && collection === 'products') {
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
            if (this.collName === 'products' && collection === 'products') {
                console.log(`No se pudo obtener el producto ${error}`);
            } else {
                console.log(`No se pudo obtener el carrito ${error}`);
            }
            
        }
    }

    async save(collection, product){
        try {
            if (this.collName === 'products' && collection === 'products') {
                let products = await this.collection.add(product)
                return products
            } else {
                let carts = await this.collection.add(product)
                return carts
            }
        } catch (error) {
            if (this.collName === 'products' && collection === 'products') {
                console.log(`Error al guardar el producto ${error}`);
            } else {
                console.log(`Error al guardar el carrito ${error}`);
            }
            
        }
    }

    async update(collection,id,product){
        try {
            if (this.collName === 'products' && collection === 'products') {
                const newProducts = await this.collection.doc(id).update({
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
            if (this.collName === 'products' && collection === 'products') {
                console.log(`Error al actualizar el producto ${error}`);
            } else {
                console.log(`Error al actualizar el carrito ${error}`);
            }
        }
    }

    async deleteByID(collection,id){
        try {
            if (this.collName === 'products' && collection === 'products') {
                let prod = await this.getByID(collection,id)
                await this.collection.doc(prod).delete()
                return prod
            } else {
                let cart = await this.getByID(collection,id)
                await this.collection.doc(cart).delete()
                return cart
            }
        } catch (error) {
            if (this.collName === 'products' && collection === 'products') {
                console.log(`Error al eliminar el producto ${error}`);
            } else {
                console.log(`Error al eliminar el carrito ${error}`);
            }
        }
    }

    async deleteProdCart(cartId,prodId){
        try {
            let cart = await this.getByID('carts', cartId)
            let newCart = await cart.update({products:FieldValue.arrayRemove(prodId)})
            return newCart
        } catch (error) {
            console.log(`Error al eliminar el producto del carrito ${error}`);
        }
    }
}

module.exports = ContainerFireStore;
