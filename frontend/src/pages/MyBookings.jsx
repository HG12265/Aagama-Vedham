import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function MyBookings() {
  const[bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/bookings/my-bookings`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch bookings");
        setLoading(false);
      }
    };
    fetchBookings();
  },[]);

  if (loading) return <div className="text-center mt-20 text-xl font-bold text-orange-600">Loading your bookings... 🙏</div>;

  return (
    <div className="min-h-[80vh] px-4 py-8 max-w-5xl mx-auto">
      <h2 className="text-3xl font-extrabold text-center text-orange-700 mb-8">
        My Bookings 📜
      </h2>

      {bookings.length === 0 ? (
        <div className="text-center bg-white p-10 rounded-xl shadow-md border-t-4 border-orange-500">
          <p className="text-xl text-gray-600 mb-4">You haven't booked any homams yet.</p>
          <Link to="/book" className="bg-orange-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-orange-700 transition">
            Book Now ✨
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((booking, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500 hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{booking.homamName}</h3>
              <p className="text-gray-600"><strong>📅 Date:</strong> {booking.bookingDate}</p>
              <p className="text-gray-600 mt-1"><strong>📍 Address:</strong> {booking.address}</p>
              <p className="mt-3">
                <strong>Status:</strong> 
                <span className="ml-2 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-bold">
                  {booking.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}