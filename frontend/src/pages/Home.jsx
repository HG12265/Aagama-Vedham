import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  
  const homamDetails =[
    { name: "Ganapathi Homam", icon: "🐘", desc: "Removes all obstacles and brings unparalleled success before starting any new venture or life event." },
    { name: "Navagraha Homam", icon: "🪐", desc: "Pacifies the nine planets to remove doshas, bringing immense peace, harmony, and prosperity in your life." },
    { name: "Sudharshana Homam", icon: "☸️", desc: "Destroys negative energies, evil eyes, and grants powerful protection and ultimate spiritual upliftment." },
    { name: "Grahapravesham", icon: "🏠", desc: "Purifies your new home, removes negative vibes, and invites positive, auspicious energies for a happy living." },
    { name: "Kalyanam", icon: "💍", desc: "Sacred Vedic marriage rituals performed to unite two souls with supreme divine blessings for a lifetime." },
    { name: "Punyarjanai", icon: "🌿", desc: "A powerful cleansing and purification ritual to invoke divine grace and deeply positive vibrations." },
    { name: "Kumbabeshegam", icon: "🛕", desc: "Consecration of a temple or deity, rejuvenating the spiritual power and absolute sanctity of the shrine." }
  ];

  return (
    <div className="w-full bg-[#FAFAFA] font-sans">
      
      {/* 1. ROYAL & CLEAN HERO SECTION (Height fixed for Mobile & Desktop Site) */}
      <section className="relative w-full py-16 md:py-24 lg:py-32 flex items-center justify-center bg-[#FFFBF5] px-4 border-b-8 border-orange-600">
        
        {/* Subtle Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
          <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-orange-100 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-yellow-100 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 text-center flex flex-col items-center max-w-4xl mx-auto">
          <div className="mb-6 inline-block">
            <span className="text-orange-700 font-bold tracking-[0.2em] uppercase text-sm border-b-2 border-orange-400 pb-1">
              Divine & Pure
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight font-serif">
            Welcome to <br className="hidden sm:block" /> 
            <span className="text-orange-600">Aagama Vedham</span> 🕉️
          </h1>
          
          <p className="text-lg md:text-xl text-gray-700 mb-10 font-medium leading-relaxed px-4 max-w-2xl">
            Experience the supreme blessings of the Almighty. Book authentic Homams, Poojas, and Vedic Rituals performed by expert Pandits.
          </p>
          
          <Link to="/book" className="px-10 py-4 bg-orange-600 text-white rounded-full text-xl font-bold shadow-[0_8px_20px_rgba(234,88,12,0.3)] hover:bg-orange-700 hover:shadow-[0_12px_25px_rgba(234,88,12,0.4)] transition-all transform hover:-translate-y-1 flex items-center gap-3">
            <span>Book Homam Now</span>
            <span className="text-2xl">🙏</span>
          </Link>
        </div>
      </section>

      {/* 2. HERITAGE SECTION (3 Uniform Cards - Perfect for both Views) */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 font-serif mb-4">Divine Heritage 🙏</h2>
          <div className="h-1.5 w-24 bg-orange-500 mx-auto rounded-full"></div>
        </div>
        
        {/* GRID LAYOUT: Side by side in Desktop (md:grid-cols-3), Stacked in Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* CARD 1: Gopuram */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-orange-100 flex flex-col group">
            <div className="h-64 md:h-72 w-full overflow-hidden">
              <img src="/temple2.jpg" alt="Temple Gopuram" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="p-6 text-center flex-1 flex flex-col justify-center">
              <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2 block">Majestic</span>
              <h3 className="text-2xl font-bold text-gray-900 font-serif mb-3">Temple Gopuram</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Reflecting the rich cultural heritage and spiritual grandeur with vibrant and divine sculptures.</p>
            </div>
          </div>

          {/* CARD 2: Pillars */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-orange-100 flex flex-col group">
            <div className="h-64 md:h-72 w-full overflow-hidden">
              <img src="/temple1.jpg" alt="Temple Corridor" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="p-6 text-center flex-1 flex flex-col justify-center">
              <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2 block">Architecture</span>
              <h3 className="text-2xl font-bold text-gray-900 font-serif mb-3">Sacred Pillars</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Experience the tranquility of ancient temple architecture and divine vibrations.</p>
            </div>
          </div>

          {/* CARD 3: Symbols */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-orange-100 flex flex-col group">
            <div className="h-64 md:h-72 w-full overflow-hidden bg-orange-50 p-6 flex items-center justify-center">
              <img src="/symbols.jpg" alt="Divine Symbols" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="p-6 text-center flex-1 flex flex-col justify-center">
              <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2 block">Auspicious</span>
              <h3 className="text-2xl font-bold text-gray-900 font-serif mb-3">Sacred Emblems</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Divine symbols invoking the supreme blessings of the Almighty, offering protection and peace.</p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. PREMIUM HOMAM SERVICES SLIDER */}
      <section className="bg-stone-900 py-20 border-t-8 border-orange-700">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <span className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-2 block">Vedic Rituals</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white font-serif">Our Divine Services ✨</h2>
            </div>
            <p className="text-gray-400 mt-4 md:mt-0 flex items-center gap-2">Swipe to explore <span className="animate-pulse">👉</span></p>
          </div>
          
          <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
            
            {homamDetails.map((homam, index) => (
              <div 
                key={index} 
                className="relative min-w-[300px] md:min-w-[350px] bg-white rounded-2xl shadow-xl p-8 snap-center flex flex-col justify-between border-b-8 border-orange-600 transform transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="relative z-10">
                  <div className="text-4xl mb-5 bg-orange-50 w-16 h-16 flex items-center justify-center rounded-xl shadow-sm border border-orange-100">
                    {homam.icon}
                  </div>
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-3 font-serif">{homam.name}</h3>
                  <p className="text-gray-600 font-medium leading-relaxed mb-6">{homam.desc}</p>
                </div>
                
                <Link to="/book" className="w-full text-center bg-orange-100 text-orange-700 font-bold py-3 px-4 rounded-xl hover:bg-orange-600 hover:text-white transition-colors duration-300 flex justify-center items-center gap-2">
                  <span>Book This Ritual</span>
                </Link>
              </div>
            ))}
            
          </div>
          
        </div>
      </section>

    </div>
  );
}