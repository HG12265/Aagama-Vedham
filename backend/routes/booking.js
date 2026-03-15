const express = require('express');
const Booking = require('../models/Booking');
const User = require('../models/User'); // User email theda idhu thevai
const verifyToken = require('../middleware/authMiddleware');
const sendEmail = require('../utils/sendEmail'); // Namma puthu email utility

const router = express.Router();

// 1. HOMAM BOOK PANDRA API
router.post('/book', verifyToken, async (req, res) => {
    try {
        const { userName, phone, panditName, homamName, bookingDate, address, transactionId } = req.body;

        const newBooking = new Booking({
            userId: req.user.id, 
            userName, 
            phone, 
            panditName, 
            homamName,
            bookingDate,
            address,
            transactionId
        });

        await newBooking.save(); 

        // User-oda email id-ya database-la irundhu edukkrom
        const user = await User.findById(req.user.id);

        // ==========================================
        // ✉️ EMAIL 1: USER-KU ANUPPURA MAIL
        // ==========================================
        const userSubject = `Booking Confirmed: ${homamName} 🙏`;
        const userHtml = `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ffedd5; padding: 20px; border-radius: 10px;">
                <h2 style="color: #ea580c; text-align: center;">Aagama Vedham 🕉️</h2>
                <h3>Namaskaram ${userName},</h3>
                <p>Your booking for <b>${homamName}</b> has been successfully confirmed!</p>
                <div style="background-color: #fff7ed; padding: 15px; border-radius: 8px;">
                    <p><b>📅 Date:</b> ${bookingDate}</p>
                    <p><b>🙏 Pandit:</b> ${panditName}</p>
                    <p><b>📍 Address:</b> ${address}</p>
                </div>
                <p>Our team will contact you shortly to confirm the timings.</p>
                <p>May the divine blessings be with you! ✨</p>
                <br>
                <p>Regards,<br><b>Aagama Vedham Team</b></p>
            </div>
        `;
        await sendEmail(user.email, userSubject, userHtml);

        // ==========================================
        // ✉️ EMAIL 2: ADMIN / PANDIT-KU ANUPPURA MAIL
        // ==========================================
        const adminSubject = `New Homam Booking Alert: ${homamName} 🔔`;
        const adminHtml = `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ffedd5; padding: 20px; border-radius: 10px;">
                <h2 style="color: #dc2626; text-align: center;">New Booking Alert 🔔</h2>
                <h3>Namaskaram,</h3>
                <p>A new homam booking has been received. Here are the details:</p>
                <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px;">
                    <p><b>👤 Customer Name:</b> ${userName}</p>
                    <p><b>📞 Phone Number:</b> ${phone}</p>
                    <p><b>✉️ Email:</b> ${user.email}</p>
                    <hr>
                    <p><b>🕉️ Homam Name:</b> ${homamName}</p>
                    <p><b>🙏 Preferred Pandit:</b> ${panditName}</p>
                    <p><b>📅 Booking Date:</b> ${bookingDate}</p>
                    <p><b>📍 Address:</b> ${address}</p>
                </div>
                <p>Please contact the customer immediately to finalize the arrangements.</p>
            </div>
        `;
        // Admin-ku (Un official mail-ku) anuppudhu
        await sendEmail('aagamavedham@gmail.com', adminSubject, adminHtml);

        res.status(201).json({ message: "Homam Booked Successfully! 🙏 Email Alert Sent.", booking: newBooking });

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

router.get('/all-bookings', verifyToken, async (req, res) => {
    try {
        // Role 'admin' ah irundha mattum thaan data anuppuvom (Security)
        if (req.user.role !== 'admin') return res.status(403).json({ message: "Access Denied! Admins only ❌" });
        
        const allBookings = await Booking.find().sort({ createdAt: -1 });
        res.status(200).json(allBookings);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});

router.put('/update-status/:id', verifyToken, async (req, res) => {
    try {
        if (req.user.role !== 'admin') return res.status(403).json({ message: "Access Denied! Admins only ❌" });
        
        const { status } = req.body;
        const bookingId = req.params.id;

        // Database-la status-a update pandradhu
        const updatedBooking = await Booking.findByIdAndUpdate(bookingId, { status }, { new: true });
        
        if (!updatedBooking) return res.status(404).json({ message: "Booking not found!" });

        // Status update aana udane Customer-ku Email anuppura logic ✉️
        const user = await User.findById(updatedBooking.userId);
        if(user) {
            const statusColor = status === 'Confirmed' ? 'blue' : status === 'Completed' ? 'green' : 'red';
            const statusHtml = `
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ffedd5; border-radius: 10px;">
                    <h2 style="color: #ea580c;">Aagama Vedham 🕉️</h2>
                    <h3>Namaskaram ${updatedBooking.userName},</h3>
                    <p>The status of your booking for <b>${updatedBooking.homamName}</b> has been updated!</p>
                    <p>Current Status: <b style="color: ${statusColor}; font-size: 18px;">${status}</b></p>
                    <p>May the divine blessings be with you! ✨</p>
                </div>
            `;
            await sendEmail(user.email, `Booking Status Updated: ${status} 🙏`, statusHtml);
        }

        res.status(200).json({ message: `Status updated to ${status}! ✅`, booking: updatedBooking });
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});

module.exports = router;