import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-gray-300 py-4 border-t-4 border-orange-600 mt-auto">
      {/* Copyright Section */}
      <div className="text-center border-t border-gray-700 mt-8 pt-6 text-sm text-gray-500">
        © {new Date().getFullYear()} Aagama Vedham. All rights reserved. <br/>
        <span className="text-orange-400/50 mt-1 inline-block">Made with devotion ✨</span>
      </div>
    </footer>
  );
}