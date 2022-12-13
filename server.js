const express = require('express');
//imports dao FileSystem
const {ProductsDaoFiles} = require('./src/daos/importsDao');
const {CartDaoFiles} = require('./src/daos/importsDao');
//imports dao MongoDB
const {ProductsDaoMongo} = require('./src/daos/importsDao');
const {CartDaoMongo} = require('./src/daos/importsDao');

const PORT = process.env.PORT || 8080;

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

//routers de FileSystem
const prodControllerFS = new ProductsDaoFiles()
const cartControllerFS = new CartDaoFiles()
//routers de MongoDB
const prodControllerMongo = new ProductsDaoMongo()
const cartControllerMongo = new CartDaoMongo()
/* server.use('/api/productos', prodControllerFS.getRouter());
server.use('/api/carrito', cartControllerFS.getRouter()); */

server.use('/api/productos', prodControllerMongo.getRouter());
server.use('/api/carrito', cartControllerMongo.getRouter());

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});
server.on('error', (err) => {
    console.log(`Error en servidor ${err}`)
});
