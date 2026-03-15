import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    const fetchAllBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/bookings/all-bookings`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch all bookings");
        setLoading(false);
      }
    };
    fetchAllBookings();
  }, [navigate]);

  // STATUS UPDATE FUNCTION ✨
  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${import.meta.env.VITE_API_URL}/api/bookings/update-status/${bookingId}`, 
        { status: newStatus }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // UI-la udane status update aaga
      setBookings(bookings.map(b => b._id === bookingId ? { ...b, status: newStatus } : b));
      alert(`Status changed to ${newStatus}! Customer notified via email. 📧✅`);
    } catch (err) {
      alert("Failed to update status ❌");
    }
  };

  if (loading) return <div className="text-center mt-32 text-2xl font-bold text-orange-600">Loading Admin Dashboard... 👑</div>;

  return (
    <div className="min-h-screen bg-[#FAFAFA] px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-2 font-serif">
          Admin Dashboard 👑
        </h2>
        <p className="text-center text-gray-500 mb-10 font-medium">Manage all customer homam bookings</p>

        <div className="overflow-x-auto bg-white rounded-2xl shadow-xl border border-orange-100">
          <table className="min-w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-orange-600 text-white text-sm uppercase tracking-wider">
                <th className="p-5 border-b font-bold">Customer Details</th>
                <th className="p-5 border-b font-bold">Homam & Pandit</th>
                <th className="p-5 border-b font-bold">Date & Address</th>
                <th className="p-5 border-b font-bold">Update Status ✨</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {bookings.map((booking, index) => (
                <tr key={index} className="border-b hover:bg-orange-50 transition-colors">
                  <td className="p-5">
                    <p className="font-extrabold text-gray-900 text-base">{booking.userName}</p>
                    <p className="text-sm mt-1 text-gray-600">📞 {booking.phone}</p>
                  </td>
                  <td className="p-5">
                    <p className="font-bold text-orange-700 text-base">{booking.homamName}</p>
                    <p className="text-sm mt-1 text-gray-600">🙏 {booking.panditName}</p>
                  </td>
                  <td className="p-5">
                    <p className="font-bold text-gray-800">{booking.bookingDate}</p>
                    <p className="text-xs mt-1 text-gray-500 whitespace-normal min-w-[200px]">{booking.address}</p>
                  </td>
                  <td className="p-5">
                    {/* DYNAMIC STATUS DROPDOWN ✨ */}
                    <select 
                      value={booking.status} 
                      onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                      className={`text-xs font-bold px-3 py-2 rounded-full shadow-sm cursor-pointer outline-none border transition-all
                        ${booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' : 
                          booking.status === 'Confirmed' ? 'bg-blue-100 text-blue-800 border-blue-300' : 
                          booking.status === 'Completed' ? 'bg-green-100 text-green-800 border-green-300' : 
                          'bg-red-100 text-red-800 border-red-300'}`}
                    >
                      <option value="Pending">🕒 Pending</option>
                      <option value="Confirmed">👍 Confirmed</option>
                      <option value="Completed">✅ Completed</option>
                      <option value="Cancelled">❌ Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-10 text-center text-gray-500 font-bold text-lg">No bookings found yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}