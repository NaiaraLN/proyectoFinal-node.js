const ContainerMongoDB = require('../../containers/containerMongoDB');
const {MONGO_USER, MONGO_PASS} = require('../../config')

class Orders extends ContainerMongoDB{
    constructor(){
        super(`mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.1ezwxyq.mongodb.net/secondEcommerce?retryWrites=true&w=majority`)
    }
}

module.exports = Orders