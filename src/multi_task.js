
const { Worker } = require('worker_threads');
const path = require('path');


const tasks = [10, 20, 30, 40];

function runTask(inputNum) {
    console.log(`Starting runTask ${inputNum}`);
    return new Promise((resolve, reject) => {
        const worker = new Worker(path.resolve(__dirname, 'worker.js'), {
            workerData: { inputNum }
        });

        worker.once('message', (result) => {
            console.log(`Task ${inputNum} resolved with ${result}`);
            resolve(result);
        });

        worker.once('error', (err) => {
            console.error(`Task ${inputNum} error:`, err);
            reject(err);
        });

        worker.once('exit', (code) => {
            if (code !== 0) {
                const err = new Error(`Worker stopped with exit code ${code}`);
                console.error(`Task ${inputNum} exit error:`, err);
                reject(err);
            }
        });
    });
}

(async function main() {
    try {
        // Run all tasks in parallel (one worker per task here)
        const results = await Promise.all(tasks.map(n => runTask(n)));
        console.log('Results:', results);
    } catch (err) {
        console.error('Error while running tasks:', err);
    }
})();