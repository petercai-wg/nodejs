const myModule = (function () {
    // Private variables and functions
    let privateVar = "I am private!";

    function privateFunction() {
        console.log("This is a private function.");
    }

    // Public API (exported)
    return {
        publicVar: "I am public!",
        publicFunction() {
            console.log(`This is a public function. showing privateVar: ${privateVar}`);
            console.log("calling private function from public function.");
            privateFunction();
        },
    };
})();


console.log(myModule.publicVar);  // "I am public!"
myModule.publicFunction();  // "This is a public function." 

console.log('--- Accessing private members ---');

console.log(myModule.privateVar);  // undefined
myModule.privateFunction();  // Error: myModule.privateFunction is not a function

