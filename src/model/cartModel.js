import mongoose from 'mongoose';
import {productsSchema} from './productsModel'

const cartSchema = new mongoose.Schema({
    date:{ type: Date, required: true},
    products:[productsSchema]
})

const cartModel = mongoose.model('carts', cartSchema)
export {cartModel, cartSchema};