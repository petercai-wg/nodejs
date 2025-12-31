
class Observable {

    constructor() {
        this.observers = {}
    }

    on(event, action) {
        if (!this.observers[event]) this.observers[event] = []
        this.observers[event].push(action)
    }

    triggerEvent(event, params) {
        this.observers[event].forEach(o => {
            o.apply(null, params)
        })
    }
}

class Server extends Observable {

    constructor() {
        super()
    }


    triggerError() {
        let errorObj = {
            errorCode: 500,
            message: 'Port already in use'
        }
        this.triggerEvent('error', [errorObj])
    }
}


const server = new Server();

server.on('error', () => {
    console.log("Sever Error occurred:");
});

server.on('error', (error) => {
    console.log(`Error: ${error.errorCode} - ${error.message}`);
});


// Simulate an error

server.triggerError();  