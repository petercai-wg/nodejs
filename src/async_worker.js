const { Worker, isMainThread, parentPort } = require('worker_threads');

function runWorker() {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', { workerData: { inputNum: 40 } });
        worker.on('message', resolve);
        worker.on('error', reject);
    })
}

async function main() {
    console.log(`starting main () in thread ${process.pid}`);
    const result = await runWorker();
    console.log(`Result from worker: ${result}`);
}

main().catch(err => console.error(err));
console.log(`end of main ....`);