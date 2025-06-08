
import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// Import your images
import mosquito1 from "../assets/mosquito.jpg";
import mosquito2 from "../assets/mosquitoImage.jpg";
import mosquito3 from "../assets/Awareness.png";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Swiper Image Slider Section */}
      <div className="w-full h-[70vh]">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          loop={true}
          className="w-full h-full"
        >
          <SwiperSlide>
            <img src={mosquito1} alt="Mosquito 1" className="w-full h-full object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={mosquito2} alt="Mosquito 2" className="w-full h-full object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={mosquito3} alt="Mosquito 3" className="w-full h-full object-cover" />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Red Welcome Section */}
      <div className="bg-red-700 text-white text-center py-12 px-4">
        <h1 className="text-6xl font-bold mb-4 tracking-wide">
          Welcome To FLAVIFY !
        </h1>
        <p className="max-w-3xl mx-auto text-lg">
          At FLAVIFY, we are committed to providing reliable information and
          resources for the early detection and management of Dengue Fever. Our
          goal is to help you stay informed and healthy.
        </p>
        <button
          className="mt-6 bg-white text-black font-semibold px-6 py-2 rounded shadow hover:bg-gray-100"
          onClick={() => navigate("/Login")}
        >
          Get Started - It's FREE
        </button>
      </div>
    </div>
  );
}
