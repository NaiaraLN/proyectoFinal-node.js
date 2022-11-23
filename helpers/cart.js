const fs = require('fs');
const path = require('path')

class Cart {

    static file = path.join(__dirname, 'cart.json');

    static async getAll() {
        try {
        if(fs.existsSync(Cart.file)) {
            const json = await fs.promises.readFile(Cart.file, "utf-8");
            const data = JSON.parse(json);
            return data
        } else {
            await fs.promises.writeFile(Cart.file, "[]", 'utf-8');
            console.log({ Msg: "Created file" });
            return []
        }
        } catch (error) {
        console.log({Error: error});
        }
    };

    constructor(date, products) {
        this.date = date;
        this.products = products;
        this.id;
    };

    async save(product) {
        try {
        const data = await Cart.getAll();
        this.id = data.length + 1;
        this.products.push(product);
        data.push(this);
        await fs.promises.writeFile(Cart.file, JSON.stringify(data, null, 2), 'utf-8');
        return this.id
        } catch (error) {
        console.log({Error: error})
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
    deleteAll = async (id) => {
        if(fs.existsSync(this.fileName)){
            let allCarts = await this.getAll()
            let cart = allCarts.filter((el) => el.id !== id)
            await fs.promises.writeFile(this.fileName, JSON.stringify(cart));
            return product
        }
        console.log('El contenido fue eliminado')
    }
};

module.exports = Cart;