export default class UserService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }

    updateUser(userId, newUserData) {
        const userIndex = this.userRepo.users.findIndex(user => user.id === userId);
        if (userIndex !== -1) {
            this.userRepo.users[userIndex] = { ...this.userRepo.users[userIndex], ...newUserData };
            return this.userRepo.users[userIndex];
        }
        return null;
    }

    deleteUser(userId) {
        const userIndex = this.userRepo.users.findIndex(user => user.id === userId);
        if (userIndex !== -1) {
            this.userRepo.users.splice(userIndex, 1);
            return true;
        }
        return false;
    }

    getUserDetails(userId) {
        return this.userRepo.users.find(user => user.id === userId) || null;
    }
}