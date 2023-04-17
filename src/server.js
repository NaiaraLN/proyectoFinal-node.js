import {MONGO_URI, port, mode} from "./config.js";
import express from 'express'
import handlebars from "express-handlebars";
import path from "path";
import passport from "passport";
import MongoStore from "connect-mongo";
import session from "express-session";
import logger from "./scripts/logger.js";
import {productsRouter} from './routers/productRouter.js';
import {cartRouter} from './routers/cartRouter.js';
import passportRouter from './routers/passportRouter.js';
import chatRouter from "./routers/chatRouter.js";
import cluster from 'cluster';
import os from 'os';
import { Server as HttpServer } from 'http';
import {Server as IOServer } from 'socket.io';
import {URL} from 'url'
import ChatSocket from "./scripts/socket.js";

// configuro dirname
const __dirname = decodeURI(new URL('.', import.meta.url).pathname)

const app = express();
// configuro socket.io
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

// Configuro views
const handlebarsConfig = {
    extname: '.hbs',
    helpers: {
        subTotal:function(price,quantity){
            return price*quantity;
        },
        totalPrice:function(cart){
            return cart.reduce((acc, product) => acc += (product.quantity * product.price), 0)
        }
    },
    partialsDir: __dirname + './views/partials',
    defaultLayout: 'index.hbs'
};

app.engine("hbs", handlebars.engine((handlebarsConfig)));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './views'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname + '../public')));

const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}
app.use(session({
    store: MongoStore.create({
        mongoUrl:MONGO_URI, 
        mongoOptions:advancedOptions,
        ttl:600
    }),
    secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    rolling:true
}))
app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next) => {
    const { url, method } = req
    logger.info(`Ruta ${method} ${url} implementada`)
    next()
})
app.use('/', passportRouter);
app.use('/productos', productsRouter);
app.use('/carrito', cartRouter);
app.use('/chat', chatRouter)


app.all('*', (req, res) => {
    const { url, method } = req
    logger.warn(`Ruta ${method} ${url} no implementada`)
    res.send(`Ruta ${method} ${url} no está implementada`)
})

/* INICIALIZO SOCKET.IO */

new ChatSocket(io)

const modoCluster = mode === 'CLUSTER'
if (modoCluster && cluster.isPrimary) {
    const numCPUs = os.cpus().length;
    logger.info(`PID Primario ${process.pid}`);
    
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
        
    }

    cluster.on('exit', worker => {
        logger.info('worker', worker.process.pid, 'died', new Date().toLocaleString())
        cluster.fork()
    })

}else{

    const server = httpServer.listen(port, () => {
        logger.info(`Servidor escuchando en el puerto ${server.address().port} - pid worker ${process.pid}`)
    })
    server.on('error', error => logger.error(`Error en servidor ${error}`))
}

