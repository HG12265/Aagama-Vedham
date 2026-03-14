import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu open/close panna
  const navigate = useNavigate();
  
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsOpen(false); // Logout panna udane mobile menu close aagum
    navigate('/login');
  };

  const closeMenu = () => setIsOpen(false); // Link click panna udane menu close aagum

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b-4 border-orange-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo & Site Name */}
          <Link to="/" onClick={closeMenu} className="flex items-center gap-3">
            <img src="/logo.jpg" alt="Aagama Vedham Logo" className="h-14 w-14 object-contain rounded-full border border-orange-200 shadow-sm" />
            <span className="text-2xl md:text-3xl font-extrabold tracking-wide text-orange-800 drop-shadow-sm">
              Aagama Vedham
            </span>
          </Link>

          {/* DESKTOP MENU (Computer / Tab la mattum theriyum) */}
          <div className="hidden md:flex items-center gap-6 font-bold text-gray-700">
            <Link to="/" className="hover:text-orange-600 transition duration-300">Home</Link>
            
            {token ? (
              <>
                <Link to="/book" className="hover:text-orange-600 transition duration-300">Book Homam</Link>
                <Link to="/my-bookings" className="hover:text-orange-600 transition duration-300">My Bookings</Link>
                
                {/* Compact Logout Button with User Name */}
                <button 
                  onClick={handleLogout} 
                  className="bg-orange-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-orange-700 transition flex items-center gap-2 group"
                >
                  <span>Logout</span>
                  <span className="text-xs bg-orange-800 text-orange-100 px-2 py-0.5 rounded-full group-hover:bg-orange-900">
                    {user?.name}
                  </span>
                </button>
              </>
            ) : (
              <Link to="/login" className="bg-orange-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-orange-700 transition">
                Login / Register
              </Link>
            )}
          </div>

          {/* MOBILE MENU BUTTON (3 Lines - Mobile la mattum theriyum) */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-orange-700 hover:text-orange-800 focus:outline-none"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  /* Close Icon (X) */
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  /* Hamburger Icon (3 lines) */
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE DROPDOWN MENU (Button click panna mela irundhu varum) */}
      {isOpen && (
        <div className="md:hidden bg-orange-50 border-t border-orange-200 absolute w-full shadow-lg transition-all duration-300">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link to="/" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-bold text-gray-800 hover:bg-orange-200 hover:text-orange-800">
              Home
            </Link>
            
            {token ? (
              <>
                <Link to="/book" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-bold text-gray-800 hover:bg-orange-200 hover:text-orange-800">
                  Book Homam
                </Link>
                <Link to="/my-bookings" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-bold text-gray-800 hover:bg-orange-200 hover:text-orange-800">
                  My Bookings
                </Link>
                
                {/* Mobile Logout Button */}
                <button 
                  onClick={handleLogout} 
                  className="w-full text-left flex justify-between items-center px-3 py-2 rounded-md text-base font-bold bg-orange-600 text-white shadow-sm mt-2"
                >
                  <span>Logout</span>
                  <span className="text-xs bg-orange-800 text-orange-100 px-2 py-1 rounded-full">
                    {user?.name}
                  </span>
                </button>
              </>
            ) : (
              <Link to="/login" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-bold bg-orange-600 text-white text-center shadow-sm mt-2">
                Login / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}