const express = require('express');

//imports dao MongoDB
const {productsRouter} = require('./routers/productRouter');
const {cartRouter} = require('./routers/cartRouter');

const cluster = require('cluster');
const os = require('os')
const {port, mode} = require('./yargs-config')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/productos', productsRouter);
app.use('/api/carrito', cartRouter);

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

