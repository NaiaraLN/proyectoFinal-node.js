const express = require('express');
const {ProductsDaoFiles} = require('./daos/importsDao');
const {CartDaoFiles} = require('./daos/importsDao')

const PORT = process.env.PORT || 8080;

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

const prodControllerFS = new ProductsDaoFiles()
const cartControllerFS = new CartDaoFiles()

server.use('/api/productos', prodControllerFS.getRouter());
server.use('/api/carrito', cartControllerFS.getRouter());

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});
server.on('error', (err) => {
    console.log(`Error en servidor ${err}`)
});
