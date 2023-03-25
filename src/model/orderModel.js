import mongoose from "mongoose";
import {userSchema} from "./userModel"
import {cartSchema} from "./cartModel"

const orderSchema = new mongoose.Schema({
    user:userSchema,
    cart:cartSchema
})

const orderModel = mongoose.model('orders', orderSchema)
export default orderModel;