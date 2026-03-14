const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true // Oru email-ku oru account thaan create panna mudiyum
    },
    password: { 
        type: String, 
        required: true 
    },
    phone: { 
        type: String, 
        required: true 
    }
}, { timestamps: true }); // timestamps pota eppo create aachu nu automatic-a time save aagum

module.exports = mongoose.model('User', userSchema);