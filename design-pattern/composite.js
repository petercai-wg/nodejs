class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getUsers() {
        const users = await this.userRepository.getUsers();
        return users;
    }
    async addUser(user) {
        await this.userRepository.addUser(user);
    }
}

class UserRepository {
    async getUsers() {
        console.log('Fetching users from database...');
        return [{ name: "Alice", age: 30 }, { name: "Bob", age: 22 }];
    }
    async addUser(user) {
        console.log(`writing user ${user} to database...`);
        console.dir(user);

    }
}


// Creating instances of the classes
const userRepository = new UserRepository();

const userService = new UserService(userRepository);


userService.getUsers();
userService.addUser({ name: "John", age: 25 });