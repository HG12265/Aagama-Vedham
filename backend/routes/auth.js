const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// 1. REGISTER API
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists! ❌" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ name, email, password: hashedPassword, phone });
        await user.save();
        res.status(201).json({ message: "User registered successfully! 🙏" });
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});

// 2. LOGIN API (Admin logic added 👑)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 👑 ADMIN LOGIN BYPASS
        if (email === 'aagamavedham@gmail.com' && password === 'aagamavedham123') {
            // Admin-ku nu thaniya 'role: admin' nu oru token tharom
            const token = jwt.sign({ id: 'admin_id', role: 'admin' }, process.env.JWT_SECRET, { expiresIn: "7d" });
            return res.status(200).json({ 
                message: "Welcome Admin! 👑", 
                token, 
                user: { id: 'admin', name: 'Admin', email: 'aagamavedham@gmail.com', role: 'admin' } 
            });
        }

        // NORMAL USER LOGIN
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid email or password! ❌" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password! ❌" });

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