const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },     // Puthusa add pannadhu
    phone: { type: String, required: true },        // Puthusa add pannadhu
    panditName: { type: String, required: true },   // Puthusa add pannadhu
    homamName: { type: String, required: true },
    bookingDate: { type: String, required: true },
    address: { type: String, required: true },
    status: { type: String, default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);