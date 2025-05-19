import React from 'react';
import mosquitoImage from '../assets/mosquito.jpg';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Top Image Section */}
      <div className="w-full h-[70vh]">
        <img
          src={mosquitoImage}
          alt="Mosquito"
          className="w-full h-full "
         />
      </div>
      {/* Red Welcome Section */}
      <div className="bg-red-700 text-white text-center py-12 px-4">
        <h1 className="text-6xl font-bold mb-4 tracking-wide">Welcome To FLAVIFY !</h1>
        <p className="max-w-3xl mx-auto text-lg">
          At FLAVIFY, we are committed to providing reliable information and resources for the early detection and management of Dengue Fever. Our goal is to help you stay informed and healthy.
        </p>
        <button className="mt-6 bg-white text-black font-semibold px-6 py-2 rounded shadow hover:bg-gray-100">
          Get Started - It's FREE
        </button>
      </div>

     
     
    </div>
  );
}
