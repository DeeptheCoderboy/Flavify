import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import girl from "../assets/girl.png";
import logo from "../assets/logo.png";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!username || !email || !phone || !password) {
      alert("Please fill out all fields.");
      return;
    }

    const user = { username, email, phone, password };

    try {
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/login");
      } else {
        alert(data.msg || "Signup failed");
      }
    } catch (err) {
      alert("Signup failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="w-1/3 bg-gradient-to-b from-red-600 to-red-900 text-white p-6 rounded-tr-[40px] rounded-br-[40px] relative">
        {/* Logo in top-left corner */}
        <img src={logo} alt="Logo" className="w-16 h-16 absolute top-4 left-4" />

        {/* Center content */}
        <div className="flex flex-col items-center justify-center h-full mt-16">
          <h1 className="text-3xl font-bold mb-4">FLAVIFY</h1>
          <img src={girl} alt="Girl with Laptop" className="w-80 mb-4" />
          <div className="text-center">
            <h2 className="text-xl font-bold">DENGUE</h2>
            <p className="font-semibold">Detection & Analysis</p>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-2/3 flex flex-col items-center justify-center p-10">
        <h2 className="text-3xl font-bold mb-8">Create Account</h2>

        <form onSubmit={handleSignup} className="w-full max-w-xl space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full border border-gray-400 p-3 rounded focus:outline-none focus:ring-2 focus:ring-red-300"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full border border-gray-400 p-3 rounded focus:outline-none focus:ring-2 focus:ring-red-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Phone Number (+91)"
            className="w-full border border-gray-400 p-3 rounded focus:outline-none focus:ring-2 focus:ring-red-300"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Create Password"
            className="w-full border border-gray-400 p-3 rounded focus:outline-none focus:ring-2 focus:ring-red-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white font-semibold w-full p-3 rounded shadow transition duration-200"
          >
            Create Account
          </button>
        </form>

        <div className="w-full max-w-xl my-4 text-sm text-gray-700 text-center">
          <p>
            Already have an account?{" "}
            <span
              className="text-red-600 font-semibold cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Log In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
