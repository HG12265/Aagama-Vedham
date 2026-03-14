const express = require('express');
const Booking = require('../models/Booking');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

// 1. HOMAM BOOK PANDRA API
router.post('/book', verifyToken, async (req, res) => {
    try {
        const { userName, phone, panditName, homamName, bookingDate, address } = req.body;

        const newBooking = new Booking({
            userId: req.user.id, 
            userName, 
            phone, 
            panditName, 
            homamName,
            bookingDate,
            address
        });

        await newBooking.save(); 
        res.status(201).json({ message: "Homam Booked Successfully! 🙏", booking: newBooking });

    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});

// 2. USER-ODA BOOKINGS-A PAAKRA API
router.get('/my-bookings', verifyToken, async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});

module.exports = router;