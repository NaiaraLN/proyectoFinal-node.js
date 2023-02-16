const {MONGO_USER, MONGO_PASS} = require("../../config")
const ContainerMongoDB = require("../../containers/containerMongoDB");
const userModel = require("../../model/userModel");

class User extends ContainerMongoDB{
    constructor(){
        super(`mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.1ezwxyq.mongodb.net/secondEcommerce?retryWrites=true&w=majority`)
        this.model = userModel;
    }
}

module.exports = User