import mongoose from "mongoose";
import User from "../models/usermodel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import BlacklistToken from "../models/blacklistmodel.js";
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log(username, email);

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }
        const isUserAlreadyExists = await User.findOne({
            $or: [{ username }, { email }]
        });
        if (isUserAlreadyExists) {
            return res.status(400).json({ message: "Account with this email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create
            ({
                username,
                email,
                password: hashedPassword
            });
        res.status(201).json({
            message: "User registered successfully", user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 60 * 60 * 1000
        });
        res.status(200).json({
            message: "User logged in successfully", user: {
                id: user._id,
                username: user.username,
                email: user.email
            }, token
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getuser = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({ message: "No token found" });
        }
        await BlacklistToken.create({ token });
        res.clearCookie("token");
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};