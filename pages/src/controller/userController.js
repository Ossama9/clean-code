import UserService from "../service/userService";
import AuthService from "../service/authService";
import UserRepository from "../db/userRepository";

const authService = new AuthService();
const userService = new UserService(new UserRepository());


export async function updateUser(req, res) {
    const { userId } = req.params;
    const { userData } = req.body;
    try {
        const updatedUser = userService.updateUser(userId, userData);
        if (updatedUser) {
            res.status(200).json({ message: "User updated successfully", user: updatedUser });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error: error.toString() });
    }
}

export async function deleteUser(req, res) {
    const { userId } = req.params;
    try {
        const success = userService.deleteUser(userId);
        if (success) {
            res.status(200).json({ message: "User deleted successfully" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error.toString() });
    }
}

export async function getUserDetails(req, res) {
    const { userId } = req.params;
    try {
        const userDetails = userService.getUserDetails(userId);
        if (userDetails) {
            res.status(200).json({ message: "User details retrieved successfully", user: userDetails });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error retrieving user details", error: error.toString() });
    }
}

module.exports = { updateUser, deleteUser, getUserDetails };