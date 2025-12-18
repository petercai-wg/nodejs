const { parentPort, workerData } = require('worker_threads');
console.log(`Worker thread ${process.pid} started`);

// Simulate some CPU-intensive task
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

const result = fibonacci(workerData.inputNum); // Adjust the number for more/less intensity

parentPort.postMessage(result);
console.log(`Worker thread ${process.pid} finished computation`);