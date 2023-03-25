import ContainerMongoDB from '../../containers/containerMongoDB';
import {MONGO_USER, MONGO_PASS} from '../../config'

class CartDaoMongo extends ContainerMongoDB{
    constructor(){
        super(`mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.1ezwxyq.mongodb.net/secondEcommerce?retryWrites=true&w=majority`)
        super.getConnection()
    }
}

export default CartDaoMongo;