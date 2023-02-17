const mongoose = require("mongoose");
const {userSchema} = require("./userModel")
const {cartSchema} = require("./cartModel")

const orderSchema = new mongoose.Schema({
    user:userSchema,
    cart:cartSchema
})

const orderModel = mongoose.model('orders', orderSchema)
module.exports = orderModel;