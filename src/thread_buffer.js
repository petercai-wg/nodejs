const { Worker, isMainThread, workerData, threadId } = require('worker_threads');


if (isMainThread) {

    console.log('Main thread creating SharedArrayBuffer');
    const threadBuffer = new SharedArrayBuffer(1);

    new Worker(__filename, { workerData: threadBuffer });

    new Worker(__filename, { workerData: threadBuffer });

    new Worker(__filename, { workerData: threadBuffer });

    new Worker(__filename, { workerData: threadBuffer });

} else {
    const typedArray = new Int8Array(workerData);
    typedArray[0] = threadId;
    console.log(`Worker process ${process.pid} thread ${threadId} updated sharedBuffer value:`, typedArray[0]);



}
