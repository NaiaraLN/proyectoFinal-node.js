const fs = require('fs');
const path = __dirname+'/../helpers/';

class Products {

    constructor(name) {
        this.fileName = name
    };

    async getAll() {
        try {
            if(fs.existsSync(path+this.fileName)) {
                const json = await fs.promises.readFile(path+this.fileName, "utf-8");
                const allProducts = JSON.parse(json);
                return allProducts
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
                let allProducts = await this.getAll()
                let lastId = allProducts.reduce((acc, item) => item.id > acc ? acc = item.id : acc, 0)
                let newProduct = {
                    id: lastId + 1,
                    date: Date.now(),
                    ...product
                }
                allProducts.push(newProduct)
                await fs.promises.writeFile(path+this.fileName, JSON.stringify(allProducts, null, 2));
                return newProduct.id
            } else {
                let newProduct = {
                    id: 1,
                    date: Date.now(),
                    ...product
                }
                await fs.promises.writeFile(path+this.fileName, JSON.stringify([newProduct, null, 2]))
                return 1
            }
        } catch (error) {
            console.log({Error: error})
        }
    }

    async getByID(id) {
        try {
            if(fs.existsSync(path+this.fileName)){
                let allProducts = await this.getAll()
                let product = allProducts.find((el) => el.id === id)
                return product
            }
        } catch (error) {
            throw "No se encontró el producto" + error;
        }
    }
    async update(id, product) {
        try {
            let listProduct = await this.getAll();
            let index = listProduct.findIndex((prod) => prod.id == id);
            let newProduct = {
                id: id,
                date: Date.now(),
                ...product
            }
            if (index >= 0) {
                listProduct[index] = newProduct;
                await fs.promises.writeFile(path+this.fileName, JSON.stringify(listProduct, null, 2));
                return {status: "éxito", description: "el producto se modificó con éxito"}
            }
            
        } catch (error) {
            console.log({Error: error})
        }
    }
    async deleteByID(id){
        try {
            if(fs.existsSync(path+this.fileName)){
                let allProducts = await this.getAll()
                let product = allProducts.filter((el) => el.id !== id)
                await fs.promises.writeFile(path+this.fileName, JSON.stringify(product, null, 2));
                return product
            }
        } catch (error) {
            throw "No se encontró el producto" + error;
        }
    }

};


module.exports = Products;