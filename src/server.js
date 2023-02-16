const {MONGO_USER, MONGO_PASS} = require("./config")
const express = require('express');
const handlebars = require("express-handlebars");
const path = require("path")
const {productsRouter} = require('./routers/productRouter');
const {cartRouter} = require('./routers/cartRouter');
const passportRouter = require('./routers/passportRouter')
const cluster = require('cluster');
const os = require('os')
const {port, mode} = require('./yargs-config')
const passport = require("passport");
const MongoStore = require("connect-mongo");
const session = require("express-session");


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


app.use('/api/productos', productsRouter);
app.use('/api/carrito', cartRouter);
app.use('/', passportRouter);

const modoCluster = mode === 'CLUSTER'
if (modoCluster && cluster.isPrimary) {
    const numCPUs = os.cpus().length;
    console.log(numCPUs)
    console.log(`PID Primario ${process.pid}`);
    
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
        
    }

    cluster.on('exit', worker => {
        console.log('worker', worker.process.pid, 'died', new Date().toLocaleString())
        cluster.fork()
    })

}else{

    const server = app.listen(port, () => {
        console.log(`Servidor escuchando en el puerto ${server.address().port} - pid worker ${process.pid}`)
    })
    server.on('error', error => console.log(`Error en servidor ${error}`))
}

