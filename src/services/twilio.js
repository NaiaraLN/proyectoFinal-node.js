const twilio = require("twilio")
const {TWILIO_SID, TWILIO_TOKEN, ADMIN_NUMBER} = require("../config")
const logger = require("../scripts/logger")

const client = twilio(TWILIO_SID, TWILIO_TOKEN)

const SMS = async (user) =>{
    try {
        await client.messages.create({
            body: 'Gracias por confiar en Golden Bookshop! Su orden está en proceso.',
            from: '+12185957892',
            to: `+${user.phone}`
        })
        return {status:'success', description:'Mensaje enviado!'}
    } catch (error) {
        logger.error(`Error al enviar sms al usuario ${error}`)
    }
}

const WHS = async (order) => {
    try {
        const cart = order.cart
        const products = cart.products.map(({name, price}) => {
            return`\n item: ${name} \n precio: ${price}`
        })
        const message = await client.messages.create({
            from: 'whatsapp:+14155238886',  
            body: `Nueva orden registrada \n Datos de usuario: \n id: ${order.user._id} \n nombre: ${order.user.username} \n order: ${order.user.mail} \n order: ${order.user.age} \n Productos: \n ${products.join('\n')}`,  
            to: `whatsapp:${ADMIN_NUMBER}` 
        }) 
        console.log(message.sid)
    } catch (error) {
        logger.error(`Error al enviar whatsapp de la orden ${error}`)
    }
}

module.exports = {SMS, WHS}