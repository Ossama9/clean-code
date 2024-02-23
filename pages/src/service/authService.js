export default class AuthService {
    constructor(userRepo) {
        this.sessions = {};
        this.userRepo = userRepo;
    }


    createToken(userId) {
        const token = uuidv4();
        this.sessions[token] = userId;
        return token;
    }

    verifyToken(token) {
        return this.sessions[token] ? this.sessions[token] : null;
    }


    registerUser(userData) {
        return this.userRepo.createUser(userData);
    }

    loginUser(email, password) {
        const user = this.userRepo.findUserByEmail(email);
        if (user && user.password === password) {
            return { success: true, userId: user.id };
        } else {
            return { success: false };
        }
    }
}