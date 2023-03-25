import {MONGO_USER, MONGO_PASS} from "../../config"
import ContainerMongoDB from "../../containers/containerMongoDB";
import {userModel} from "../../model/userModel";

class User extends ContainerMongoDB{
    constructor(){
        super(`mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.1ezwxyq.mongodb.net/secondEcommerce?retryWrites=true&w=majority`)
        this.model = userModel;
    }
}

export default User