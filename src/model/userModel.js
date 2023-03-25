import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{type:String, required: true},
    mail:{type:String, required:true},
    password:{type:String, required:true},
    address:{type:String, required:true},
    age:{type:Number, required:true},
    phone:{type:Number, required:true},
    avatar:{type:Buffer, required:true}
})

const userModel = mongoose.model('users', userSchema)
export {userModel, userSchema};