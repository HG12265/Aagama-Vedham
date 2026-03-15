import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const[isLogin, setIsLogin] = useState(true); // Login or Register nu matha
  const[formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const[message, setMessage] = useState(''); // Error/Success message kaata
  const navigate = useNavigate();

  // Input type pannum podhu state-a update panna
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form submit pannum podhu backend-ku data anuppa
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      if (isLogin) {
        // LOGIN API CALL
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
          email: formData.email,
          password: formData.password
        });
        
        setMessage(res.data.message);
        // Token-a browser-la save panni vachikrom (Idhu thaan ID Card)
        localStorage.setItem('token', res.data.token); 
        localStorage.setItem('user', JSON.stringify(res.data.user));
        
        // Login success aana udane Booking page-ku anuppidrom
        setTimeout(() => navigate('/book'), 1000); 

      } else {
        // REGISTER API CALL
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, formData);
        setMessage(res.data.message);
        setTimeout(() => setIsLogin(true), 1500); // Register aanadhum Login page-ku mathidrom
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong! ❌");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border-t-4 border-orange-500">
        
        <h2 className="text-3xl font-extrabold text-center text-orange-600 mb-6">
          {isLogin ? 'Login 🙏' : 'Register 🕉️'}
        </h2>

        {/* Message kaata */}
        {message && (
          <div className={`p-3 mb-4 text-center rounded-lg font-semibold ${message.includes('❌') ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* Register-ku mattum Name & Phone thevai */}
          {!isLogin && (
            <>
              <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />
              <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} required className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </>
          )}

          {/* Rendu kummume Email & Password thevai */}
          <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />

          <button type="submit" className="bg-orange-600 text-white font-bold py-3 rounded-lg hover:bg-orange-700 transition mt-2 shadow-md">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        {/* Toggle Button */}
        <p className="text-center mt-6 text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-orange-600 font-bold hover:underline">
            {isLogin ? 'Register Here' : 'Login Here'}
          </button>
        </p>

      </div>
    </div>
  );
}