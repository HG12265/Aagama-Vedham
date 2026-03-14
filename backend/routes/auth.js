const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// 1. REGISTER API (Puthu account create panna)
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        // User already irukkangala nu check panna
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists! ❌" });

        // Password-a encrypt panna (Hashing)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Puthu user-a database-la save panna
        user = new User({ name, email, password: hashedPassword, phone });
        await user.save();

        res.status(201).json({ message: "User registered successfully! 🙏" });
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});

// 2. LOGIN API (Ulla nuzhaiya)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Email correct-ah nu check panna
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid email or password! ❌" });

        // Password correct-ah nu check panna
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password! ❌" });

        // Login success aana Token create panna (ID card maathiri)
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(200).json({ 
            message: "Login successful! 🙏", 
            token, 
            user: { id: user._id, name: user.name, email: user.email } 
        });
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});

module.exports = router;