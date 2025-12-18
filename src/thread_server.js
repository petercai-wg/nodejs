const http = require('http');
const { Worker, isMainThread, parentPort } = require('worker_threads');



function runWorker() {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', { workerData: { inputNum: 50 } });
        worker.on('message', resolve);
        worker.on('error', reject);
    })
}



async function processCalc(req, res) {

    try {

        const hash = await runWorker();
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(`This page return a hash: ${hash}`);
    } catch (error) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end(`error: ${error.message}`);
    }
}

const server = http.createServer((req, res) => {
    if (req.url === "/non-blocking") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("This page is non-blocking");
    } else if (req.url === "/calc") {
        processCalc(req, res)

    } else {
        res.writeHead(404);
        res.end("Page not found");
    }
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});