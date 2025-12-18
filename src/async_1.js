
const fs = require('fs/promises');

async function readFiles() {
    console.log('start readFiles () ...');

    const data = await fs.readFile('input.txt', 'utf8');
    console.log('File 1 Contents:', data);

}

readFiles().catch(err => console.error(err));

console.log('end ....');
