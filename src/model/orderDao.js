import mongoose from "mongoose";
import ProductDao from "./productDao.js"

export default class OrderDao{
    static get schema(){
        return new mongoose.Schema({
            date:{ type: Date, required: true},
            email:{type:String, required:true},
            items:[ProductDao.schema],
            status:{type:String, required:true},
            number:{type:Number, required:true}
        })
    }
    static get model(){
        return 'orders'
    }
}
