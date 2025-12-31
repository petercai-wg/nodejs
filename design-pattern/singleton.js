class DbCache {
    constructor() {

        this.hashtable = {}
        this.hashtable.put = function (key, value) {
            this[key] = value;
        }
        this.hashtable.get = function (key) {
            return this[key];
        }
    }

    static getInstance() {
        if (!DbCache.instance) {
            DbCache.instance = new DbCache();
            console.log('DbCache established.');
        }
        return DbCache.instance;
    }
}


const cacheInstance1 = DbCache.getInstance();

const cacheInstance2 = DbCache.getInstance();


// Example query:get
cacheInstance1.hashtable.put('user', "John Doe");

const results = cacheInstance2.hashtable.get('user');
console.log(results);