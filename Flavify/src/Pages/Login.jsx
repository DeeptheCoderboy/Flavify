// // import Navbar from '../Components/Navbar';
// // import React from "react";
// // import girl from '../assets/girl.jpg'
// // import logo from '../assets/logo.jpg'
// // const Login = () => {
// //   return (
// //     <>

// //     <div className="min-h-screen flex">
// //       {/* Left Panel */}
// //       <div className="w-1/3 bg-gradient-to-b from-red-600 to-red-900 text-white flex flex-col items-center justify-center p-6 rounded-tr-[40px] rounded-br-[40px]">
// //         <img src={logo} alt="Logo" className="w-20 h-20 mb-4" />
// //         <h1 className="text-3xl font-bold mb-4">FLAVIFY</h1>
// //         <img
// //           src={girl}
// //           alt="Girl with Laptop"
// //           className="w-60 mb-4"
// //         />
// //         <div className="text-center">
// //           <h2 className="text-xl font-bold">DENGUE</h2>
// //           <p className="font-semibold">Detection & Analysis</p>
// //         </div>
// //       </div>

// //       {/* Right Panel (Login Form) */}
// //       <div className="w-2/3 flex flex-col items-center justify-center p-10">
// //         <h2 className="text-3xl font-bold mb-8">Welcome Back</h2>

// //         <form className="w-full max-w-xl space-y-4">
// //           <input
// //             type="text"
// //             placeholder="Enter Email or Phone"
// //             className="w-full border border-gray-400 p-3 rounded"
// //           />
// //           <input
// //             type="password"
// //             placeholder="Enter Password"
// //             className="w-full border border-gray-400 p-3 rounded"
// //           />

// //           <button
// //             type="submit"
// //             className="bg-red-400 hover:bg-red-500 text-white font-semibold w-full p-3 rounded shadow"
// //           >
// //             Log In
// //           </button>
// //         </form>

// //         <div className="text-sm text-gray-700 w-full max-w-xl text-right mt-2">
// //           <a href="#" className="text-red-600 font-medium">Forgot Password?</a>
// //         </div>

// //         {/* Divider with "or" */}
// //         {/* <div className="flex items-center justify-center gap-2 w-full max-w-xl my-6">
// //           <hr className="flex-grow border-gray-400" />
// //           <span className="text-sm text-gray-500">or</span>
// //           <hr className="flex-grow border-gray-400" />
// //         </div> */}

// //         {/* Social Buttons */}
// //         {/* <div className="flex gap-6 mt-2">
// //           <button className="flex items-center gap-2 border p-2 px-4 rounded shadow">
// //             <img src="/facebook.png" alt="Facebook" className="w-6 h-6" />
// //             <span>Log in with Facebook</span>
// //           </button>
// //           <button className="flex items-center gap-2 border p-2 px-4 rounded shadow">
// //             <img src="/gmail.png" alt="Gmail" className="w-6 h-6" />
// //             <span>Log in with GMail</span>
// //           </button>
// //         </div>

// //         <p className="mt-6 text-sm text-gray-700">
// //           Don't have an account?{" "}
// //           <span className="text-red-600 font-semibold cursor-pointer">
// //             Sign Up
// //           </span>
// //         </p> */}
// //       </div>
// //     </div>
// //     </>
// //   );
// // };

// // export default Login;
// import { useNavigate } from "react-router-dom";

// import React, { useState } from "react";
// import Navbar from "../Components/Navbar";
// import girl from "../assets/girl.jpg";
// import logo from "../assets/logo.jpg";
// import { useContext } from "react";

// const Login = () => {
//   const navigate = useNavigate();
//   // const { setUser } = useContext(UserContext);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:5000/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       alert(data.message);
//       navigate("/");

//     } catch (err) {
//       alert("Login failed. Please try again.");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* Left Panel */}
//       <div className="w-1/3 bg-gradient-to-b from-red-600 to-red-900 text-white flex flex-col items-center justify-center p-6 rounded-tr-[40px] rounded-br-[40px]">
//         <img src={logo} alt="Logo" className="w-20 h-20 mb-4" />
//         <h1 className="text-3xl font-bold mb-4">FLAVIFY</h1>
//         <img src={girl} alt="Girl with Laptop" className="w-60 mb-4" />
//         <div className="text-center">
//           <h2 className="text-xl font-bold">DENGUE</h2>
//           <p className="font-semibold">Detection & Analysis</p>
//         </div>
//       </div>

//       {/* Right Panel */}
//       <div className="w-2/3 flex flex-col items-center justify-center p-10">
//         <h2 className="text-3xl font-bold mb-8">Welcome Back</h2>

//         <form onSubmit={handleLogin} className="w-full max-w-xl space-y-4">
//           <input
//             type="text"
//             placeholder="Enter Email or Phone"
//             className="w-full border border-gray-400 p-3 rounded"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Enter Password"
//             className="w-full border border-gray-400 p-3 rounded"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <button
//             type="submit"
//             className="bg-red-400 hover:bg-red-500 text-white font-semibold w-full p-3 rounded shadow"
//           >
//             Log In
//           </button>
//         </form>

//         <div className="text-sm text-gray-700 w-full max-w-xl text-right mt-2">
//           <a href="#" className="text-red-600 font-medium">
//             Forgot Password?
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import girl from "../assets/girl.jpg";
import logo from "../assets/logo.jpg";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [step, setStep] = useState(1); // 1: Enter Email, 2: Enter OTP, 3: New Password
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      alert(data.message);
      navigate("/");
    } catch (err) {
      alert("Login failed. Please try again.");
      console.error(err);
    }
  };

  const handleForgot = async () => {
    try {
      const res = await fetch("http://localhost:5000/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      alert(data.message);
      if (data.success) setStep(2);
    } catch (err) {
      alert("Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await fetch("http://localhost:5000/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      alert(data.message);
      if (data.success) setStep(3);
    } catch (err) {
      alert("OTP verification failed");
    }
  };

  const handleResetPassword = async () => {
    try {
      const res = await fetch("http://localhost:5000/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await res.json();
      alert(data.message);
      if (data.success) {
        setShowForgot(false);
        setStep(1);
      }
    } catch (err) {
      alert("Password reset failed");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="w-1/3 bg-gradient-to-b from-red-600 to-red-900 text-white flex flex-col items-center justify-center p-6 rounded-tr-[40px] rounded-br-[40px]">
        <img src={logo} alt="Logo" className="w-20 h-20 mb-4" />
        <h1 className="text-3xl font-bold mb-4">FLAVIFY</h1>
        <img src={girl} alt="Girl with Laptop" className="w-60 mb-4" />
        <div className="text-center">
          <h2 className="text-xl font-bold">DENGUE</h2>
          <p className="font-semibold">Detection & Analysis</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-2/3 flex flex-col items-center justify-center p-10">
        <h2 className="text-3xl font-bold mb-8">Welcome Back</h2>

        {!showForgot ? (
          <>
            <form onSubmit={handleLogin} className="w-full max-w-xl space-y-4">
              <input
                type="text"
                placeholder="Enter Email or Phone"
                className="w-full border border-gray-400 p-3 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full border border-gray-400 p-3 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                className="bg-red-400 hover:bg-red-500 text-white font-semibold w-full p-3 rounded shadow"
              >
                Log In
              </button>
            </form>

            <div className="text-sm text-gray-700 w-full max-w-xl text-right mt-2">
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
            {step === 1 && (
              <>
                <input
                  type="text"
                  placeholder="Enter your Email"
                  className="w-full border border-gray-400 p-3 rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  onClick={handleForgot}
                  className="bg-red-400 hover:bg-red-500 text-white font-semibold w-full p-3 rounded shadow"
                >
                  Send OTP
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="w-full border border-gray-400 p-3 rounded"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button
                  onClick={handleVerifyOtp}
                  className="bg-green-400 hover:bg-green-500 text-white font-semibold w-full p-3 rounded shadow"
                >
                  Verify OTP
                </button>
              </>
            )}

            {step === 3 && (
              <>
                <input
                  type="password"
                  placeholder="Enter New Password"
                  className="w-full border border-gray-400 p-3 rounded"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  onClick={handleResetPassword}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold w-full p-3 rounded shadow"
                >
                  Reset Password
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
