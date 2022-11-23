const fs = require('fs');
const path = require('path')

class Products {

    static file = path.join(__dirname, 'products.json');

    static async getAll() {
        try {
        if(fs.existsSync(Products.file)) {
            const json = await fs.promises.readFile(Products.file, "utf-8");
            const data = JSON.parse(json);
            return data
        } else {
            await fs.promises.writeFile(Products.file, "[]", 'utf-8');
            console.log({ Msg: "Created file" });
            return []
        }
        } catch (error) {
        console.log({Error: error});
        }
    };

    constructor(date, name, description, code, thumbnail, price, stock) {
        this.date = date;
        this.name = name;
        this.description = description;
        this.code = code;
        this.thumbnail = thumbnail;
        this.price = price;
        this.stock = stock;
        this.id;
    };

    async save() {
        try {
        const data = await Products.getAll();
        this.id = data.length + 1;
        data.push(this);
        await fs.promises.writeFile(Products.file, JSON.stringify(data, null, 2), 'utf-8');
        } catch (error) {
        console.log({Error: error})
        }
    }

    getByID = async (id) => {
        try {
            if(fs.existsSync(this.fileName)){
                let allProducts = await this.getAll()
                let product = allProducts.find((el) => el.id === id)
                return product
            }
        } catch (error) {
            throw "No se encontró el producto" + error;
        }
    }
    deleteByID = async (id) => {
        try {
            if(fs.existsSync(this.fileName)){
                let allProducts = await this.getAll()
                let product = allProducts.filter((el) => el.id !== id)
                await fs.promises.writeFile(this.fileName, JSON.stringify(product));
                return product
            }
        } catch (error) {
            throw "No se encontró el producto" + error;
        }
    }

};


module.exports = Products;