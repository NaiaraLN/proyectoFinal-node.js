import mongoose from 'mongoose';

export default class ProductDao{
    static get schema(){
        return new mongoose.Schema({
            date:{ type: Date, required: true},
            name:{type: String, required:true},
            description:{type: String, required:true},
            code:{type: Number, required:true, unique: true},
            thumbnail:{type: String, required:true},
            price:{type: Number, required:true},
            category:{type:String, required:true},
            quantity:{type:Number}
        })
    }
    static get model(){
        return 'products'
    }
}
