import React from "react";
import logo from '../assets/logo.png'
const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-red-600 to-red-900 text-white py-6 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Logo */}
        <img
          src={logo} // 🔁 Replace with your logo path
          alt="FLAVIFY Logo"
          className="w-16 h-16 rounded-full border border-white"
        />

        {/* Branding */}
        <p className="text-xl font-semibold text-center">© FLAVIFY Inc.</p>

        {/* Social Share Buttons */}
        <div className="flex gap-2 flex-wrap justify-center">
          <button className="bg-blue-400 hover:bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
            <i className="fab fa-telegram-plane"></i> Share
          </button>
          <button className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
            <i className="fab fa-facebook-messenger"></i> Share
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full text-sm">
            <i className="fab fa-whatsapp"></i> Share
          </button>
          <button className="bg-white text-black px-3 py-1 rounded-full text-sm">
            <i className="fas fa-envelope"></i> Share
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-sm">
            <i className="fab fa-facebook-f"></i> Share
          </button>
        </div>
      </div>

      <hr className="my-4 border-gray-300" />

      {/* Resource Links */}
      <div className="text-sm space-y-2 text-center md:text-left">
        <p>
          World Health Organization (WHO) - Dengue:{" "}
          <a
            href="https://www.who.int/health-topics/dengue"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 underline hover:text-blue-500"
          >
            WHO Dengue
          </a>
        </p>
        <p>
          Centers for Disease Control and Prevention (CDC) - Dengue:{" "}
          <a
            href="https://www.cdc.gov/dengue"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 underline hover:text-blue-500"
          >
            CDC Dengue
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
