// import React from "react";
// import girl from '../assets/girl.jpg'
// import logo from '../assets/logo.jpg'

// const Signup = () => {
//   return (
  
//     <div className="min-h-screen flex">
//       {/* Left Panel */}
//       <div className="w-1/3 bg-gradient-to-b from-red-600 to-red-900 text-white flex flex-col items-center justify-center p-6 rounded-tr-[40px] rounded-br-[40px]">
//         <img src={logo} alt="Logo" className="w-20 h-20 mb-4" />
//         <h1 className="text-3xl font-bold mb-4">FLAVIFY</h1>
//         <img
//           src={girl}
//           alt="Girl with Laptop"
//           className="w-60 mb-4"
//         />
//         <div className="text-center">
//           <h2 className="text-xl font-bold">DENGUE</h2>
//           <p className="font-semibold">Detection & Analysis</p>
//         </div>
//       </div>

//       {/* Right Panel (Form) */}
//       <div className="w-2/3 flex flex-col items-center justify-center p-10">
//         <h2 className="text-3xl font-bold mb-8">Create Account</h2>

//         <form className="w-full max-w-xl space-y-4">
//           <div className="flex gap-4">
//             <input
//               type="text"
//               placeholder="Enter First Name"
//               className="w-1/2 border border-gray-400 p-3 rounded"
//             />
//             <input
//               type="text"
//               placeholder="Enter Last Name"
//               className="w-1/2 border border-gray-400 p-3 rounded"
//             />
//           </div>
//           <input
//             type="email"
//             placeholder="Enter Email Address"
//             className="w-full border border-gray-400 p-3 rounded"
//           />
         
//           <input
//             type="text"
//             placeholder="Enter Phone Number (+91)"
//             className="w-full border border-gray-400 p-3 rounded"
//           />
//           <input
//             type="password"
//             placeholder="Create Password"
//             className="w-full border border-gray-400 p-3 rounded"
//           />

//           <button
//             type="submit"
//             className="bg-red-400 hover:bg-red-500 text-white font-semibold w-full p-3 rounded shadow"
//           >
//             Create Account
//           </button>
//         </form>

//         {/* Login + or line */}
//         <div className="flex justify-between items-center w-full max-w-xl my-4 text-sm text-gray-700">
//           <p>
//             Already have an account?{" "}
//             <span className="text-red-600 font-semibold cursor-pointer">
//               Log In
//             </span>
//           </p>
//         </div>

//         {/* Divider with "or" */}
//         {/* <div className="flex items-center justify-center gap-2 w-full max-w-xl">
//           <hr className="flex-grow border-gray-400" />
//           <span className="text-sm text-gray-500">or</span>
//           <hr className="flex-grow border-gray-400" />
//         </div> */}

//         {/* Social Buttons */}
//         {/* <div className="flex gap-6 mt-4">
//           <button className="flex items-center gap-2 border p-2 px-4 rounded shadow">
//             <img src="/facebook.png" alt="Facebook" className="w-6 h-6" />
//             <span>Sign up with Facebook</span>
//           </button>
//           <button className="flex items-center gap-2 border p-2 px-4 rounded shadow">
//             <img src="/gmail.png" alt="Gmail" className="w-6 h-6" />
//             <span>Sign up with GMail</span>
//           </button>
//         </div> */}
//       </div>
//     </div>
   
    
//   );
// };

// export default Signup;

import React, { useState } from "react";
import girl from "../assets/girl.jpg";
import logo from "../assets/logo.jpg";

const Signup = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    const user = {
      first_name,
      last_name,
      email,
      phone,
      password,
    };

    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await res.json();
      alert(data.message);
    } catch (err) {
      alert("Signup failed. Please try again.");
      console.error(err);
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
        <h2 className="text-3xl font-bold mb-8">Create Account</h2>

        <form onSubmit={handleSignup} className="w-full max-w-xl space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter First Name"
              className="w-1/2 border border-gray-400 p-3 rounded"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter Last Name"
              className="w-1/2 border border-gray-400 p-3 rounded"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <input
            type="email"
            placeholder="Enter Email Address"
            className="w-full border border-gray-400 p-3 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter Phone Number (+91)"
            className="w-full border border-gray-400 p-3 rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            type="password"
            placeholder="Create Password"
            className="w-full border border-gray-400 p-3 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="bg-red-400 hover:bg-red-500 text-white font-semibold w-full p-3 rounded shadow"
          >
            Create Account
          </button>
        </form>

        <div className="flex justify-between items-center w-full max-w-xl my-4 text-sm text-gray-700">
          <p>
            Already have an account?{" "}
            <span className="text-red-600 font-semibold cursor-pointer">
              Log In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
