class User {
    constructor(name) {
        this.name = name;
    }
    printStr() {
        console.log(`User: ${this.name}`);
    }
}

class DecoratedUser {
    constructor(user, street, city) {
        this.user = user;
        this.name = user.name; // Ensures interface stays the same
        this.street = street;
        this.city = city;
    }
    printStr() {
        console.log(`Decorated User: ${this.name}, ${this.street}, ${this.city}`);
    }
}

const user = new User("Kelly");
user.printStr();

const decorated = new DecoratedUser(user, "Broadway", "New York");
decorated.printStr();