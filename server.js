require('dotenv').config()
const express = require('express');

//imports dao FileSystem
const {ProductsDaoFiles} = require('./src/daos/importsDao');
const {CartDaoFiles} = require('./src/daos/importsDao');
//imports dao MongoDB
const {ProductsDaoMongo} = require('./src/daos/importsDao');
const {CartDaoMongo} = require('./src/daos/importsDao');
//imports dao FireStore
const {ProdDaoFireS} = require('./src/daos/products/prodDaoFireS')
const {CartDaoFireS} = require('./src/daos/cart/cartDaoFireS')

//CONFIGURACION FIREBASE
const admin = require('firebase-admin');
const serviceAccount = require('./src/db/desafio-coder-861fd-firebase-adminsdk-evlvg-2c8f0fbe47.json')
let db = admin.firestore();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const PORT = process.env.PORT || 8080;

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

if (process.env.ENV==="MONGO") {
    const prodControllerMongo = new ProductsDaoMongo()
    const cartControllerMongo = new CartDaoMongo()
    server.use('/api/productos', prodControllerMongo.getRouter());
    server.use('/api/carrito', cartControllerMongo.getRouter());
} else if(process.env.ENV==="FS") {
    const prodControllerFS = new ProductsDaoFiles()
    const cartControllerFS = new CartDaoFiles()
    server.use('/api/productos', prodControllerFS.getRouter());
    server.use('/api/carrito', cartControllerFS.getRouter());
}else{
    const prodControllerFireS = new ProdDaoFireS(db);
    const cartControllerFireS = new CartDaoFireS(db);
    server.use('/api/productos', prodControllerFireS.getRouter());
    server.use('/api/carrito', cartControllerFireS.getRouter());
}

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});
server.on('error', (err) => {
    console.log(`Error en servidor ${err}`)
});
