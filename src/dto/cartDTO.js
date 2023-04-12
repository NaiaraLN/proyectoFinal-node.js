import ProductDTO from "./productDTO.js";

export default class CartDTO{
    constructor(cart){
        this.id= cart._id.toString();
        this.items= [...new ProductDTO(cart.products)];
    }
}