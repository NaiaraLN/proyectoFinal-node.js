import mongoose from "mongoose";
import UserDao from "./userDao.js"
import CartDao from "./cartDao.js"

export default class OrderDao{
    static get schema(){
        return new mongoose.Schema({
            date:{ type: Date, required: true},
            user:UserDao.schema,
            cart:CartDao.schema,
            status:{type:String, required:true},
            number:{type:Number, required:true}
        })
    }
    static get model(){
        return 'orders'
    }
}
