const fs = require('fs');



console.log('This is task  1');

setImmediate(() => {
    console.log('This is setImmediate task  2');
    process.nextTick(() => { console.log('This is next tick task  3'); });
});

setTimeout(() => { console.log('This is setTimeout task 4'); }, 5);

setTimeout(() => { console.log('This is setTimeout task 6'); }, 0);

fs.readFile(__filename, () => {
    console.log('This is fs.readFile task  7');
});

Promise.resolve().then(() => { console.log('This is Promise resolve task 8'); });

process.nextTick(() => { console.log('This is next tick task  9'); });


console.log('This is last task');




