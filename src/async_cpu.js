const crpyto = require('node:crypto');

process.env.UV_THREADPOOL_SIZE = 6;
const loop = 9;

const start = Date.now();
for (let i = 0; i < loop; i++) {
    crpyto.pbkdf2("password", "salt", 10000, 512, "sha512", () => {
        const end = Date.now();
        console.log(`CPU intensive taken: ${i} is ${end - start} ms`);
    });



}