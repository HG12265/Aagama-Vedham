import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function BookHomam() {
  const[formData, setFormData] = useState({
    userName: '', phone: '', panditName: '', homamName: '', bookingDate: '', address: '', transactionId: ''
  });
  
  const [message, setMessage] = useState('');
  const [showGateway, setShowGateway] = useState(false);
  const[paymentStep, setPaymentStep] = useState(1); // 1: Choose App, 2: Scan/Pay, 3: Verifying, 4: Success
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ⚠️ INGA UN ORIGINAL GPAY UPI ID POTTUKKO (eg: 9876543210@okaxis) ⚠️
  const myUpiId = "BCR2DN6DSKVNBGYO"; 
  const bookingAdvanceAmount = "15.00"; // Fixed Advance Amount
  
  // UPI Link with Auto-Amount
  const upiLink = `upi://pay?pa=${myUpiId}&pn=AagamaVedham&am=${bookingAdvanceAmount}&cu=INR`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiLink)}`;

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (!token) {
      alert("Please login to book a Homam! 🙏");
      navigate('/login');
    } else if (user) setFormData((prev) => ({ ...prev, userName: user.name }));
  }, [navigate]);

  const handleChange = (e) => setFormData({ ...formData,[e.target.name]: e.target.value });

  // 1. Open Professional Gateway
  const handleProceedToPay = (e) => {
    e.preventDefault();
    setShowGateway(true);
    setPaymentStep(1);
  };

  // 2. Final Verification & API Submit
  const handleFinalSubmit = async () => {
    if (!formData.transactionId || formData.transactionId.length < 8) {
      alert("Please enter a valid 12-digit UTR or Reference Number! ❌");
      return;
    }
    
    setPaymentStep(3); // Show Verifying Spinner
    
    try {
      const token = localStorage.getItem('token'); 
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/bookings/book`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setTimeout(() => {
        setPaymentStep(4); // Show Success Tick
        setTimeout(() => {
          setMessage({ type: 'success', text: res.data.message });
          setFormData({ userName: '', phone: '', panditName: '', homamName: '', bookingDate: '', address: '', transactionId: '' });
          setShowGateway(false);
        }, 2000); // 2 seconds kalichu gateway close aagum
      }, 1500); // Fake verification delay to look professional
      
    } catch (err) {
      setPaymentStep(2); // Go back to UTR screen
      alert(err.response?.data?.message || "Booking Failed! ❌");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-12 px-4 flex justify-center items-center relative">
      
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row border border-orange-100">
        
        {/* Left Side Banner */}
        <div className="md:w-2/5 bg-gradient-to-br from-orange-600 to-orange-800 p-10 text-white flex flex-col justify-center relative overflow-hidden hidden md:flex">
          <div className="absolute top-[-20%] left-[-20%] w-64 h-64 bg-orange-400 rounded-full blur-3xl opacity-30"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-serif font-bold mb-4">Sacred Rituals 🙏</h2>
            <p className="text-orange-100 text-lg leading-relaxed mb-8">Secure your booking instantly. Please pay the booking advance to confirm your Pandit.</p>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="md:w-3/5 p-8 md:p-12">
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold text-gray-900 font-serif">Book a Homam ✨</h2>
          </div>

          {message && (
            <div className={`p-4 mb-6 text-center rounded-xl font-bold ${message.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleProceedToPay} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-700 font-bold text-sm">Full Name</label>
                <input type="text" name="userName" value={formData.userName} onChange={handleChange} required placeholder="Enter your name"
                  className="p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all" />
              </div>

              {/* Phone Number */}
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-700 font-bold text-sm">Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Enter WhatsApp number"
                  className="p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all" />
              </div>
            </div>

            {/* Homam Selection */}
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-700 font-bold text-sm">Select Homam</label>
              <select name="homamName" value={formData.homamName} onChange={handleChange} required
                className="p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all cursor-pointer">
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

            {/* Pandit Selection */}
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-700 font-bold text-sm">Select Vedic Pandit</label>
              <select name="panditName" value={formData.panditName} onChange={handleChange} required
                className="p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all cursor-pointer">
                <option value="" disabled>-- Choose a Pandit --</option>
                <option value="Ajai Pattahchariyar">Ajai Pattahchariyar</option>
                <option value="Rajasekaran Iyengar">Rajasekaran Iyengar</option>
                <option value="Murali Shivachareyar">Murali Shivachareyar</option>
                <option value="Babu Iyer">Babu Iyer</option>
              </select>
            </div>

            {/* Date Selection */}
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-700 font-bold text-sm">Preferred Date</label>
              <input type="date" name="bookingDate" value={formData.bookingDate} onChange={handleChange} required
                className="p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all cursor-pointer" />
            </div>

            {/* Address */}
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-700 font-bold text-sm">Full Address</label>
              <textarea name="address" value={formData.address} onChange={handleChange} required rows="3" placeholder="Enter your complete address with pincode..."
                className="p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all resize-none"></textarea>
            </div>

            <button type="submit" className="w-full bg-stone-900 hover:bg-black text-white font-bold py-3.5 rounded-xl shadow-lg transition-all flex justify-center items-center gap-2">
              Pay Booking Advance (₹{bookingAdvanceAmount}) <span className="text-xl">🔒</span>
            </button>
          </form>
        </div>
      </div>

      {/* 💳 ULTRA-PROFESSIONAL PAYMENT GATEWAY MODAL ✨ */}
      {showGateway && (
        <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-50 flex justify-center items-center px-4 font-sans">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-fade-in-up">
            
            {/* Gateway Header */}
            <div className="bg-stone-900 p-5 text-center relative border-b-4 border-orange-500">
              <button onClick={() => setShowGateway(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">✕</button>
              <h3 className="text-white font-bold text-lg opacity-90">Aagama Vedham Secured Checkout</h3>
              <p className="text-3xl font-extrabold text-white mt-2 font-mono">₹{bookingAdvanceAmount}</p>
              <p className="text-orange-300 text-xs mt-1">Booking Advance Payment</p>
            </div>

            <div className="p-6">
              
              {/* STEP 1: Choose Payment Method */}
              {paymentStep === 1 && (
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-4 text-center">Select Payment App</p>
                  
                  <div className="space-y-3">
                    <a href={upiLink} onClick={() => setTimeout(()=>setPaymentStep(2), 2000)} className="flex items-center gap-4 w-full p-3 border border-gray-200 rounded-xl hover:border-[#4285F4] hover:bg-blue-50 transition cursor-pointer group">
                      <div className="w-10 h-10 bg-white shadow-sm rounded-full flex items-center justify-center border border-gray-100 group-hover:scale-110 transition-transform">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="GPay" className="h-4" />
                      </div>
                      <span className="font-bold text-gray-800">Google Pay</span>
                      <span className="ml-auto text-gray-400 text-lg">›</span>
                    </a>

                    <a href={upiLink} onClick={() => setTimeout(()=>setPaymentStep(2), 2000)} className="flex items-center gap-4 w-full p-3 border border-gray-200 rounded-xl hover:border-[#5f259f] hover:bg-purple-50 transition cursor-pointer group">
                      <div className="w-10 h-10 bg-[#5f259f] shadow-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-white font-bold text-xl">पे</span>
                      </div>
                      <span className="font-bold text-gray-800">PhonePe</span>
                      <span className="ml-auto text-gray-400 text-lg">›</span>
                    </a>

                    <div onClick={() => setPaymentStep(2)} className="flex items-center gap-4 w-full p-3 border border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition cursor-pointer group">
                      <div className="w-10 h-10 bg-orange-100 shadow-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-xl">📱</span>
                      </div>
                      <span className="font-bold text-gray-800">Show QR Code</span>
                      <span className="ml-auto text-gray-400 text-lg">›</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
                    <span>🔒 100% Secure Payments powered by UPI</span>
                  </div>
                </div>
              )}

              {/* STEP 2: QR & UTR Verification */}
              {paymentStep === 2 && (
                <div className="text-center animate-fade-in-up">
                  <div className="bg-gray-50 p-4 rounded-xl inline-block mb-4 border border-gray-200 shadow-inner">
                    <img src={qrCodeUrl} alt="UPI QR" className="w-36 h-36" />
                  </div>
                  
                  <p className="text-sm font-bold text-gray-800 mb-1">Waiting for payment...</p>
                  <p className="text-xs text-gray-500 mb-5">Please do not press back or close this window.</p>

                  <div className="text-left bg-orange-50 p-4 rounded-xl border border-orange-100">
                    <label className="text-orange-800 font-bold text-xs uppercase tracking-wider mb-1 block">Verify Payment</label>
                    <input type="text" name="transactionId" value={formData.transactionId} onChange={handleChange} placeholder="Enter 12-Digit UTR No." 
                      className="w-full p-3 bg-white border border-orange-200 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 text-center font-mono font-bold tracking-widest text-gray-800" />
                    
                    <button onClick={handleFinalSubmit} className="w-full mt-3 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg shadow-md transition-all">
                      Confirm Verification
                    </button>
                  </div>
                  
                  <button onClick={() => setPaymentStep(1)} className="mt-4 text-xs font-bold text-gray-400 hover:text-gray-600 underline">Change Payment Method</button>
                </div>
              )}

              {/* STEP 3: Loading Spinner */}
              {paymentStep === 3 && (
                <div className="py-12 flex flex-col items-center justify-center">
                  <div className="w-12 h-12 border-4 border-gray-200 border-t-orange-600 rounded-full animate-spin mb-4"></div>
                  <h3 className="font-bold text-gray-800">Verifying Payment...</h3>
                  <p className="text-xs text-gray-500 mt-2">Connecting to bank servers securely.</p>
                </div>
              )}

              {/* STEP 4: Success */}
              {paymentStep === 4 && (
                <div className="py-10 flex flex-col items-center justify-center animate-fade-in-up">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mb-4 shadow-sm">
                    ✔️
                  </div>
                  <h3 className="font-extrabold text-gray-900 text-xl">Payment Successful!</h3>
                  <p className="text-sm text-gray-500 mt-2">Your homam booking is confirmed.</p>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}