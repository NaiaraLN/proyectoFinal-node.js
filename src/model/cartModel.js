const mongoose = require('mongoose');
const {productsSchema} = require('./productsModel')

const cartSchema = new mongoose.Schema({
    date:{ type: Date, required: true},
    products:[productsSchema]
})

const cartModel = mongoose.model('carts', cartSchema)
module.exports = {cartModel, cartSchema};