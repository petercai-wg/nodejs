const os = require('os');
const http = require('http');
const cluster = require('cluster');

const numCPUs = os.cpus().length;

/*
* A single process can create a listening socket and then fork child processes, 
* which inherit the socket file descriptor, called shared Sockets
* */


if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running, CPU #${numCPUs}  `);


    // Fork workers.
    for (let i = 1; i < numCPUs; i++) {
        cluster.fork();
    }

} else {

    const server = http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello World\n');
    });

    server.listen(8000, () => { console.log(`Worker ${process.pid} running at port 8000`); });
}