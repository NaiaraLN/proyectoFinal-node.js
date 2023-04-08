import mongoose from "mongoose";

export default class MessagesDao{
    static get schema(){
        return new mongoose.Schema({
            mail:{type:String, required:true},
            type:{type:String, required:true},
            date:{type:Date, required:true},
            message:{type:String, required:true}
        })
    }
    static get model(){
        return 'messages'
    }
}