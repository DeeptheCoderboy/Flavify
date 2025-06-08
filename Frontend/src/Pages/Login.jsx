import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import girl from "../assets/girl.png";
import logo from "../assets/logo.png";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Login successful!");
        localStorage.setItem("token", data.token);
        localStorage.setItem("userEmail", data.email);
        localStorage.setItem("username", data.username);
        window.dispatchEvent(new Event("storage"));
        navigate("/");
      } else {
        alert(data.msg || "Login failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed. Please try again.");
    }
  };

  const handlePasswordReset = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, newPassword }),
      });

      const data = await res.json();
      alert(data.msg);

      if (res.ok) {
        setShowForgot(false);
        setEmail("");
        setPassword("");
        setUsername("");
        setNewPassword("");
      }
    } catch (err) {
      alert("Password reset failed. Please try again.");
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
        <h2 className="text-3xl font-bold mb-8">
          {showForgot ? "Reset Password" : "Welcome Back"}
        </h2>

        {!showForgot ? (
          <>
            <form onSubmit={handleLogin} className="w-full max-w-xl space-y-4">
              <input
                type="email"
                placeholder="Enter Email"
                className="w-full border border-gray-400 p-3 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full border border-gray-400 p-3 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-600 text-white font-semibold w-full p-3 rounded shadow"
              >
                Log In
              </button>
            </form>

            <div className="flex justify-between text-sm text-gray-700 w-full max-w-xl mt-2">
              <button
                onClick={() => navigate("/signup")}
                className="text-red-600 font-medium"
              >
                Signup
              </button>

              <button
                onClick={() => setShowForgot(true)}
                className="text-red-600 font-medium"
              >
                Forgot Password?
              </button>
            </div>
          </>
        ) : (
          <div className="w-full max-w-xl space-y-4">
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full border border-gray-400 p-3 rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full border border-gray-400 p-3 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter New Password"
              className="w-full border border-gray-400 p-3 rounded"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              onClick={handlePasswordReset}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold w-full p-3 rounded shadow"
            >
              Reset Password
            </button>

            <button
              onClick={() => setShowForgot(false)}
              className="text-red-600 underline text-sm"
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
