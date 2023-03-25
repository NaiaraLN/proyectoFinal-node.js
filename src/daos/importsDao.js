import ProductsDaoMongo from './products/prodDaoMongo'
import CartDaoMongo from './cart/cartDaoMongo'
import User from "./users/users"
import Orders from "./orders/ordersDao"

const userDB = new User()
const orderDao = new Orders()

export {
    ProductsDaoMongo,
    CartDaoMongo,
    userDB,
    orderDao 
}