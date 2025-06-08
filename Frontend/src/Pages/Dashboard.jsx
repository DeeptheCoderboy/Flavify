// File: src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import dashboardUser from "../assets/girl.png";

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState('');
  const [username, setUsername] = useState('');
  const [testRecords, setTestRecords] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    const name = localStorage.getItem('username');
    setUserEmail(email || '');
    setUsername(name || '');

    if (email) {
      fetch(`http://localhost:3000/api/test-history/${email}`)
        .then(res => {
          if (!res.ok) throw new Error(`HTTP error ${res.status}`);
          return res.json();
        })
        .then(data => {
          if (!Array.isArray(data)) throw new Error("Expected an array of test records");
          const recordsWithId = data.map((rec, idx) => ({
            id: idx + 1,
            date: rec.date || "N/A",
            temp: `${rec.temperature}°F`,
            wbc: rec.wbc,
            platelets: rec.platelets,
            risk: parseFloat(rec.risk) >= 70 ? 'High' : parseFloat(rec.risk) >= 40 ? 'Medium' : 'Low'
          }));
          setTestRecords(recordsWithId);
        })
        .catch(err => console.error("Failed to fetch history:", err));
    }
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Left Panel */}
      <div className="w-1/3 bg-gradient-to-b from-red-600 to-red-900 text-white p-6 rounded-tr-[40px] rounded-br-[40px] relative">
        {/* Logo in top-left corner */}
        <img src={logo} alt="Logo" className="w-16 h-16 absolute top-4 left-4" />

        {/* Center content */}
        <div className="flex flex-col items-center justify-center h-full mt-16">
          <h1 className="text-3xl font-bold mb-4">FLAVIFY</h1>
          <img src={dashboardUser} alt="Girl with Laptop" className="w-80 mb-4" />
          <div className="text-center">
            <h2 className="text-xl font-bold">DENGUE</h2>
            <p className="font-semibold">Detection & Analysis</p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="w-3/4 p-8 bg-gray-50">
        <h2 className="text-2xl font-bold mb-2">Patient’s Information</h2>
        <p className="text-sm text-gray-600 mb-6">Track and review your case history</p>

        <div className="bg-gradient-to-r from-red-400 to-red-200 rounded-lg p-4 mb-8 text-white shadow-md">
          <h3 className="text-xl font-bold uppercase">{username || 'UNKNOWN USER'}</h3>
          <div className="flex justify-between text-sm mt-1 text-black">
            <p>Email ID: <span className="font-bold text-black">{userEmail}</span></p>
          </div>
        </div>

        <table className="w-full border border-collapse border-gray-300 text-center">
          <thead className="bg-red-100">
            <tr>
              <th className="border px-4 py-2">TEST NO.</th>
              <th className="border px-4 py-2">DATE OF TEST</th>
              <th className="border px-4 py-2">FEVER TEMP.</th>
              <th className="border px-4 py-2">WBC COUNT (*1000/uL)</th>
              <th className="border px-4 py-2">PLATELET COUNT (*1000/uL)</th>
              <th className="border px-4 py-2">DENGUE RISK</th>
            </tr>
          </thead>
          <tbody>
            {testRecords.map((test) => (
              <tr key={test.id} className="bg-white">
                <td className="border px-4 py-2">{test.id}</td>
                <td className="border px-4 py-2">{test.date}</td>
                <td className="border px-4 py-2">{test.temp}</td>
                <td className="border px-4 py-2">{test.wbc}</td>
                <td className="border px-4 py-2">{test.platelets}</td>
                <td className={`border px-4 py-2 font-semibold ${
                  test.risk === 'High' ? 'text-red-600' :
                  test.risk === 'Medium' ? 'text-orange-600' : 'text-green-600'
                }`}>
                  {test.risk}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
