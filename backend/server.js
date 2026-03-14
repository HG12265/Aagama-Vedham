const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Setup environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes Connect pandradhu
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const bookingRoutes = require('./routes/booking'); // Puthusa add pannadhu
app.use('/api/bookings', bookingRoutes); // Puthusa add pannadhu

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected Successfully! 🙏'))
    .catch((err) => console.log('MongoDB Connection Error ❌', err));

// Test Route
app.get('/', (req, res) => {
    res.send('Aagama Vedham Backend is Running successfully! 🙏 Om Namah Shivaya!');
});

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 🔥`);
});