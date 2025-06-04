// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');

// exports.signup = (req, res) => {
//     const { name, email, password, address } = req.body;
//     const id = `nu${Math.floor(Math.random() * 90000) + 10000}`;
//     bcrypt.hash(password, 10, (err, hash) => {
//         if (err) return res.status(500).json({ message: 'Error encrypting password' });
        
//         User.create([id, name, email, hash, address, 'user'], (error) => {
//             if (error) return res.status(500).json({ message: 'Database error' });
//             res.json({ message: 'User registered successfully.', user: { id, name, email, role: 'user' } });
//         });
//     });
// };

// exports.login = (req, res) => {
//     const { email, password } = req.body;
//     User.findByEmail(email, (err, results) => {
//         if (err || results.length === 0) return res.status(400).json({ message: 'Invalid credentials' });
        
//         bcrypt.compare(password, results[0].password, (err, valid) => {
//             if (!valid) return res.status(400).json({ message: 'Invalid credentials' });
            
//             const token = jwt.sign({ id: results[0].id, role: results[0].role }, process.env.JWT_SECRET, { expiresIn: '1h' });
//             res.json({ message: 'Login successful.', token, user: { id: results[0].id, name: results[0].name, role: results[0].role } });
//         });
//     });
// };

//v1
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// const { v4: uuidv4 } = require("uuid");

const generateCustomId = (prefix) => `${prefix}${Math.floor(100 + Math.random() * 900)}`;

const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );
};

/**
 * @desc User Signup (Normal User)
 * @route POST /auth/signup
 */
exports.signup = async (req, res) => {
    try {
        const { name, email, password, address } = req.body;

        if (!name || !email || !password || !address) {
            return res.status(400).json({ message: "All fields are required." });
        }

        if (name.length < 20) {
            console.log("Name must be at least 20 characters long.")
            return res.status(400).json({ message: "Name must be at least 20 characters long." });
        }

        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            console.log("Email already exists." );
            return res.status(400).json({ message: "Email already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = generateCustomId("nu");

        await User.create(userId, name, email, hashedPassword, address, "normal");

        res.status(201).json({
            message: "User registered successfully.",
            user: { id: userId, name, email, role: "normal" }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
};

/**
 * @desc User Login (All Users)
 * @route POST /auth/login
 */
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const token = generateToken(user);
        res.status(200).json({
            message: "Login successful.",
            token,
            user: { id: user.id, name: user.name, role: user.role }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
};

/**
 * @desc User Logout
 * @route POST /auth/logout
 */
exports.logout = async (req, res) => {
    res.status(200).json({ message: "Logout successful." });
};
