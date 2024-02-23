import UserRepository from "../db/userRepository";
import AuthService from "../service/authService";

const authService = new AuthService(new UserRepository());

export async function registerUser(req, res) {
    try {
        const newUser = authService.registerUser(req.body);
        res.status(201).json({
            message: "User registered successfully",
            user: newUser,
        });
    } catch (error) {
        res.status(400).json({ message: "Error registering user", error: error.toString() });
    }
}

export async function loginUser(req, res) {
    const { email, password } = req.body;
    try {
        const result = authService.loginUser(email, password);
        if (result.success) {
            res.status(200).json({ message: "Login successful", userId: result.userId });
        } else {
            res.status(401).json({ message: "Login failed" });
        }
    } catch (error) {
        res.status(400).json({ message: "Error logging in", error: error.toString() });
    }
}