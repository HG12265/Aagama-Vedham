import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function BookHomam() {
  const [formData, setFormData] = useState({
    userName: '', phone: '', panditName: '', homamName: '', bookingDate: '', address: ''
  });
  
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (!token) {
      alert("Please login to book a Homam! 🙏");
      navigate('/login');
    } else if (user) setFormData((prev) => ({ ...prev, userName: user.name }));
  }, [navigate]);

  const handleChange = (e) => setFormData({ ...formData,[e.target.name]: e.target.value });

  // DIRECT SUBMIT (No Payment)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    
    try {
      const token = localStorage.getItem('token'); 
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/bookings/book`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setMessage({ type: 'success', text: res.data.message });
      setFormData({ userName: '', phone: '', panditName: '', homamName: '', bookingDate: '', address: '' });
      
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || "Booking Failed! ❌" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-12 px-4 flex justify-center items-center">
      
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row border border-orange-100">
        
        {/* Left Side Banner */}
        <div className="md:w-2/5 bg-gradient-to-br from-orange-600 to-orange-800 p-10 text-white flex flex-col justify-center relative overflow-hidden hidden md:flex">
          <div className="absolute top-[-20%] left-[-20%] w-64 h-64 bg-orange-400 rounded-full blur-3xl opacity-30"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-serif font-bold mb-4">Sacred Rituals 🙏</h2>
            <p className="text-orange-100 text-lg leading-relaxed mb-8">
              Book experienced Vedic Pandits for your spiritual ceremonies. We bring divine blessings to your doorstep.
            </p>
            <div className="space-y-4 text-orange-200 text-sm font-medium">
              <p className="flex items-center gap-2">✨ 100% Authentic Poojas</p>
              <p className="flex items-center gap-2">🕉️ Experienced Pandits</p>
              <p className="flex items-center gap-2">🌿 Sacred Samagri Included</p>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="md:w-3/5 p-8 md:p-12">
          <div className="text-center md:text-left mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 font-serif">Book a Homam ✨</h2>
            <p className="text-gray-500 mt-2">Fill in your details to schedule a divine ceremony</p>
          </div>

          {message && (
            <div className={`p-4 mb-6 text-center rounded-xl font-bold ${message.type === 'error' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-700 font-bold text-sm">Full Name</label>
                <input type="text" name="userName" value={formData.userName} onChange={handleChange} required placeholder="Enter your name" className="p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-700 font-bold text-sm">Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="WhatsApp number" className="p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-gray-700 font-bold text-sm">Select Homam</label>
              <select name="homamName" value={formData.homamName} onChange={handleChange} required className="p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all cursor-pointer">
                <option value="" disabled>-- Choose a Sacred Ritual --</option>
                <option value="Ganapathi Homam">Ganapathi Homam 🐘</option>
                <option value="Navagraha Homam">Navagraha Homam 🪐</option>
                <option value="Sudharshana Homam">Sudharshana Homam ☸️</option>
                <option value="Grahapravesham">Grahapravesham 🏠</option>
                <option value="Kalyanam">Kalyanam 💍</option>
                <option value="Punyarjanai">Punyarjanai 🌿</option>
                <option value="Kumbabeshegam">Kumbabeshegam 🛕</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-gray-700 font-bold text-sm">Select Vedic Pandit</label>
              <select name="panditName" value={formData.panditName} onChange={handleChange} required className="p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all cursor-pointer">
                <option value="" disabled>-- Choose a Pandit --</option>
                <option value="Ajai Pattahchariyar">Ajai Pattachariyar</option>
                <option value="Rajasekaran Iyengar">Rajasekaran Iyengar</option>
                <option value="Murali Shivachareyar">Murali Shivachareyar</option>
                <option value="Babu Iyer">Babu Iyer</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-gray-700 font-bold text-sm">Preferred Date</label>
              <input type="date" name="bookingDate" value={formData.bookingDate} onChange={handleChange} required className="p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all cursor-pointer" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-gray-700 font-bold text-sm">Full Address</label>
              <textarea name="address" value={formData.address} onChange={handleChange} required rows="3" placeholder="Enter complete address with pincode..." className="p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all resize-none"></textarea>
            </div>

            <button type="submit" disabled={loading} className={`w-full text-white font-bold py-3.5 rounded-xl shadow-lg transition-all transform mt-4 flex justify-center items-center gap-2 ${loading ? 'bg-orange-400 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700 hover:-translate-y-1 hover:shadow-orange-500/30'}`}>
              {loading ? 'Booking...' : 'Confirm Divine Booking 🙏'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}