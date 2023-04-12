export default class ProductDTO{
    constructor(products){
        this.id= products._id.toString();
        this.name= products.name;
        this.thumbnail= products.thumbnail;
        this.price= products.price;
        this.category= products.category;
        this.description = products.description;
        this.code= products.code;
        this.quantity= products.quantity
    }
}