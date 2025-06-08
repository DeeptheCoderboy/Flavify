import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [username, setUsername] = useState(null);

  useEffect(() => {
    const syncUser = () => {
      const storedUsername = localStorage.getItem("username");
      setUsername(storedUsername);
    };

    syncUser();
    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage", syncUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("username");
    setUsername(null);
    navigate("/login");
  };

  const scrollToSection = (id) => {
    if (location.pathname === "/") {
      const section = document.getElementById(id);
      section?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <nav className="bg-red-700 text-white px-6 py-4 flex justify-between items-center shadow sticky top-0 z-50">
      <div className="flex items-center space-x-3">
        <img src={logo} alt="FLAVIFY Logo" className="h-10 w-10 rounded-full" />
        <span className="text-xl font-bold tracking-wide">FLAVIFY</span>
      </div>

      <div className="space-x-6 font-medium hidden md:flex items-center">
        <button onClick={() => scrollToSection("home")} className="hover:underline">
          Home
        </button>
        <button onClick={() => scrollToSection("about")} className="hover:underline">
          About FLAVIFY
        </button>
        <Link to="/detection" className="hover:underline">
          Detection
        </Link>

        {username ? (
          <>
            <Link to="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <span className="text-white font-semibold">Hi, {username}</span>
            <button
              onClick={handleLogout}
              className="bg-white text-red-700 px-3 py-1 rounded hover:bg-gray-200"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Log In
            </Link>
            <Link to="/signup" className="hover:underline">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
