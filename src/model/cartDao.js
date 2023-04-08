import mongoose from 'mongoose';
import ProductDao from './productDao.js'

export default class CartDao{
    static get schema(){
        return new mongoose.Schema({
            email:{type:String, required:true},
            date:{ type: Date, required: true},
            address:{type:String, required:true},
            products:[ProductDao.schema]
        })
    }
    static get model(){
        return 'carts'
    }
}
