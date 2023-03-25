import {MONGO_USER, MONGO_PASS} from "./config.js";
import express from 'express'
import handlebars from "express-handlebars";
import path from "path";
import {productsRouter} from './routers/productRouter';
import {cartRouter} from './routers/cartRouter';
import passportRouter from './routers/passportRouter';
import cluster from 'cluster';
import os from 'os';
import {port, mode} from './config'
import passport from "passport";
import MongoStore from "connect-mongo";
import session from "express-session";
import logger from "./scripts/logger";


const app = express();

// Configuro views
const handlebarsConfig = {
    extname: '.hbs',
    defaultLayout: 'index.hbs'
};
app.engine("hbs", handlebars.engine((handlebarsConfig)));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '../public'));

const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}
app.use(session({
    store: MongoStore.create({
        mongoUrl:`mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.1ezwxyq.mongodb.net/secondEcommerce?retryWrites=true&w=majority`, 
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

app.use('/api/productos', productsRouter);
app.use('/api/carrito', cartRouter);
app.use('/', passportRouter);

app.all('*', (req, res) => {
    const { url, method } = req
    logger.warn(`Ruta ${method} ${url} no implementada`)
    res.send(`Ruta ${method} ${url} no está implementada`)
})

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

    const server = app.listen(port, () => {
        logger.info(`Servidor escuchando en el puerto ${server.address().port} - pid worker ${process.pid}`)
    })
    server.on('error', error => logger.error(`Error en servidor ${error}`))
}

