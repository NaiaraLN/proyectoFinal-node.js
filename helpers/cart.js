const fs = require('fs');
const path = __dirname+'/../helpers/';

class Cart {
    constructor(name) {
        this.fileName = name
    };
    
    async getAll() {
        try {
        if(fs.existsSync(path+this.fileName)) {
            const json = await fs.promises.readFile(path+this.fileName, "utf-8");
            const carts = JSON.parse(json);
            return carts
        } else {
            await fs.promises.writeFile(path+this.fileName, "[]", 'utf-8');
            console.log({ Msg: "Created file" });
            return []
        }
        } catch (error) {
        console.log({Error: error});
        }
    };
    async save(product){
        try {
            if (fs.existsSync(path+this.fileName)) {
                let allCarts = await this.getAll()
                let lastId = allCarts.reduce((acc, item) => item.id > acc ? acc = item.id : acc, 0)
                let newCart = {
                    id: lastId + 1,
                    date: Date.now(),
                    products: product
                }
                allCarts.push(newCart)
                await fs.promises.writeFile(path+this.fileName, JSON.stringify(allCarts, null, 2));
                return newCart.id
            } else {
                let newCart = {
                    id: 1,
                    date: Date.now(),
                    products: product
                }
                await fs.promises.writeFile(path+this.fileName, JSON.stringify([newCart, null, 2]))
                return 1
            }
        } catch (error) {
            console.log({Error: error})
        }
    }
    async getByID(id) {
        try {
            if(fs.existsSync(path+this.fileName)){
                let allCarts = await this.getAll()
                let cart = allCarts.find((prod) => prod.id === id)
                return cart
            }
        } catch (error) {
            throw "No se encontró el producto" + error;
        }
    }
    async update(id, product) {
        try {
            let allCarts = await this.getAll();
            let index = allCarts.findIndex((prod) => prod.id == id);
            if (index >= 0) {
                allCarts[index] = product;
                await fs.promises.writeFile(path+this.fileName, JSON.stringify(allCarts, null, 2));
                return {status: "éxito", description: "el producto se modificó con éxito"}
            }
            
        } catch (error) {
            console.log({Error: error})
        }
    }
    async deleteByID(id){
        try {
            if(fs.existsSync(path+this.fileName)){
                let allCarts = await this.getAll()
                let product = allCarts.filter((el) => el.id !== id)
                await fs.promises.writeFile(path+this.fileName, JSON.stringify(product, null, 2));
                return product
            }
        } catch (error) {
            throw "No se encontró el producto" + error;
        }
    }
};

module.exports = Cart;