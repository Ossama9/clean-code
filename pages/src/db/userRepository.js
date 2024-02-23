const { v4: uuidv4 } = require('uuid');

export default class UserRepository {
    constructor() {
        this.users = []; // Ici, nous allons stocker les utilisateurs en mémoire
    }

    createUser(userData) {
        const newUser = { id: uuidv4(), ...userData };
        this.users.push(newUser);
        return newUser;
    }

    findUserByEmail(email) {
        return this.users.find(user => user.email === email);
    }
}