const path = require('path');
const express = require('express');
const routerProducts = require('./routes/products.routes');
const routerCart = require('./routes/cart.routes')

const PORT = process.env.PORT || 8080;

const server = express();

server.use(express.static(path.join(__dirname, "public")));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use('/api/productos', routerProducts);
server.use('/api/carrito', routerCart);

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});
server.on('error', (err) => {
    console.log(`Error en servidor ${err}`)
});
