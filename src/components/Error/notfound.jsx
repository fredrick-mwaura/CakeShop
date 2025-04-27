import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-slate-50"
      style={{
        backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
    >
      <div
        data-aos="fade-up"
        className="text-center bg-white p-10 rounded-xl shadow-lg w-11/12 max-w-md"
      >
        <svg
          viewBox="0 0 500 500"
          xmlns="http://www.w3.org/2000/svg"
          className="w-72 h-72 mx-auto mb-8"
        >
          <circle cx="250" cy="250" r="200" fill="#f1f5f9" />
          <path
            d="M196 155c-15-10-35 5-30 20l40 150c2 8 8 15 16 17 8 3 17 0 23-7l110-140c12-15-3-35-20-30l-139 40z"
            fill="#1e293b"
          />
          <circle cx="320" cy="230" r="20" fill="#cbd5e1" />
          <circle cx="180" cy="270" r="20" fill="#cbd5e1" />
          <path
            d="M220 320c30 20 60 20 90 0"
            stroke="#cbd5e1"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        <h1 className="text-4xl font-bold text-slate-800 mb-2">Oops!</h1>
        <p className="text-slate-500 text-lg mb-6">
          The page you're looking for seems to have wandered off. Let's get you back on track!
        </p>
        <button
          onClick={handleHomeClick}
          className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 rounded text-lg transition-colors"
        >
          Back to home
        </button>
      </div>
    </div>
  );
};

export default NotFound;