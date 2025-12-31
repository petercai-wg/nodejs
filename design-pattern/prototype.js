
const cachePrototype = {
    data: {},
    getData: function (key) {
        return this.data[key]
    },
    setData: function (key, value) {
        this.data[key] = value
    },
    clone: function () {
        const cache = Object.create(this)
        cache.data = Object.create(this.data)
        return cache
    }
}



const cache = cachePrototype.clone()

cache.setData('key1', 'value1')
cache.setData('key2', 'value2')
cache.setData('key3', 'value3')

const anotherCache = cachePrototype.clone()

console.log(anotherCache.getData('key1')) // undefined

const newCache = cache.clone()
console.log(newCache.getData('key1'))

newCache.setData('key2', 'new value')

console.log(cache.getData('key2'))

console.log(newCache.getData('key2')) 