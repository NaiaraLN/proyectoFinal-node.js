const {ADMIN_MAIL, ADMIN_PASS} = require('../config')
const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')
const logger = require("../scripts/logger")

const signup = async (user) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: ADMIN_MAIL,
            pass: ADMIN_PASS
        }
    });
    let Mailgenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Golden Bookshop",
            link: "http://localhost:8080/"
        }
    })

    let response = {
        body: {
            intro: "El usuario registrado es:",
            table: {
                data: [
                    {
                        id:user._id.toString(),
                        username:user.username,
                        mail:user.mail,
                        age:user.age
                    }
                ]
            },
            outro:"Usuario agregado en la base de datos con éxito"
        }
    }

    let mail = Mailgenerator.generate(response)
    const message = {
        from: ADMIN_MAIL,
        to: ADMIN_MAIL,
        subject: 'Nuevo Registro',
        html: mail
    }
    try {
        const info = await transporter.sendMail(message)
        return({ 
            message: 'Email sent successfully... ',
            preview: nodemailer.getTestMessageUrl(info)
        })
    } catch (error) {
        logger.error(`Error al enviar mail de nuevo registro ${error}`)
    }
}

const getOrder = async (order) => {
    let cart = order.cart
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: ADMIN_MAIL,
            pass: ADMIN_PASS
        }
    });
    
    let Mailgenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Golden Bookshop",
            link: "http://localhost:8080/"
        }
    })

    let products = cart.products.map(({name, description,code,price}) => {
        return {
            item:name,
            description:description,
            code:code,
            price:price
        }
    })
    let response = {
        body: {
            intro: "Nueva orden de compra",
            table: [
                {
                    data: [
                        {
                            idOrder:order._id.toString(),
                            user:order.user.username,
                            mail:order.user.mail,
                            age:order.user.age
                        }
                    ]
                },
                {
                    data: products
                }
        ],
            outro: "Orden guardada en la base de datos"
        }
    }

    let mail = Mailgenerator.generate(response)

    const mailOptions = {
        from: ADMIN_MAIL,
        to: ADMIN_MAIL,
        subject: 'Nueva orden de pedido',
        html: mail
    }
    
    try {
        const info = await transporter.sendMail(mailOptions)
        return({ 
            message: 'Get order successfully... ',
            preview: nodemailer.getTestMessageUrl(info)
        })
    } catch (error) {
        logger.error(`Error al enviar mail de orden de pedido ${error}`)
    }
    
}

module.exports = {
    signup, getOrder
}