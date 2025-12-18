const crpyto = require('node:crypto');
const https = require('node:https');

process.env.UV_THREADPOOL_SIZE = 6;
const loop = 9;

const start = Date.now();
for (let i = 0; i < loop; i++) {


    https.request("https://www.google.com", (res) => {
        res.on("data", () => { });
        res.on("end", () => {
            const end = Date.now();
            console.log(`IO bound taken: ${i} is ${end - start} ms`);
        })
    }).end();



}