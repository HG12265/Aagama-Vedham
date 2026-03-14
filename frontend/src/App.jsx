import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Puthusa add pannadhu
import Home from './pages/Home';
import Login from './pages/Login';
import BookHomam from './pages/BookHomam';
import MyBookings from './pages/MyBookings';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-orange-50 text-gray-800 font-sans">
        
        {/* Namma Puthu Navbar Inga irukku */}
        <Navbar />

        {/* Ingu thaan namma pages maarum */}
        <main className="max-w-7xl mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/book" element={<BookHomam />} />
            <Route path="/my-bookings" element={<MyBookings />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;