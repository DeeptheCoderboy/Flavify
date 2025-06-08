import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const DengueRiskCalculator = () => {
  const [temperature, setTemperature] = useState(99.1);
  const [plateletCount, setPlateletCount] = useState(10);
  const [wbcCount, setWbcCount] = useState(1);
  const [risk, setRisk] = useState(null);

  const handleCalculate = async () => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      alert("Please login to calculate your dengue risk.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ temperature, wbc: wbcCount, platelet: plateletCount }),
      });

      const result = await response.json();

      if (response.ok && result.dengue_risk !== undefined) {
        const roundedRisk = parseFloat(result.dengue_risk.toFixed(2));
        setRisk(roundedRisk);

        await fetch("http://localhost:3000/api/store-test", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            temperature,
            wbc: wbcCount,
            platelets: plateletCount,
            risk: result.dengue_risk,
            date: new Date().toISOString(),
          }),
        });
      } else {
        alert("Error in prediction: " + (result.error || "Unknown error"));
      }
    } catch (error) {
      alert("Failed to connect to the backend: " + error.message);
    }
  };

  const getRiskLevel = (value) => {
    if (value <= 4) return { level: "LOW", color: "text-green-600", bg: "bg-green-100" };
    else if (value <= 7) return { level: "MEDIUM", color: "text-yellow-600", bg: "bg-yellow-100" };
    else return { level: "HIGH", color: "text-red-600", bg: "bg-red-100" };
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#fffaf0] flex flex-col items-center justify-center p-4">

        {/* INPUT SECTION CARD WITH DARK RED BACKGROUND */}
        <div className="w-full max-w-2xl bg-red-900 text-white shadow-lg rounded-xl border border-red-700 p-6">

          <h2 className="text-2xl font-bold text-white text-center mb-6">
            Enter Your Symptoms
          </h2>

          {/* Temperature Input */}
          <div className="mb-6">
            <label htmlFor="temperature" className="block text-sm font-medium mb-2">
              Enter Fever Temperature (in °F)
            </label>
            <div className="flex items-center gap-4">
              <span className="text-xl font-semibold min-w-[4rem] text-right">{temperature.toFixed(1)}</span>
              <input
                type="range"
                id="temperature"
                min="99.1"
                max="107"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full"
              />
              <span className="text-gray-300 text-sm">Slide to Adjust</span>
            </div>
          </div>

          {/* Platelet Count Input */}
          <div className="mb-6">
            <label htmlFor="plateletCount" className="block text-sm font-medium mb-2">
              Enter Platelet Count (*1000/uL)
            </label>
            <div className="flex items-center gap-4">
              <span className="text-xl font-semibold min-w-[4rem] text-right">{plateletCount}</span>
              <input
                type="range"
                id="plateletCount"
                min="10"
                max="500"
                step="1"
                value={plateletCount}
                onChange={(e) => setPlateletCount(parseInt(e.target.value, 10))}
                className="w-full"
              />
              <span className="text-gray-300 text-sm">Slide to Adjust</span>
            </div>
          </div>

          {/* WBC Count Input */}
          <div className="mb-6">
            <label htmlFor="wbcCount" className="block text-sm font-medium mb-2">
              Enter WBC Count (*1000/uL)
            </label>
            <div className="flex items-center gap-4">
              <span className="text-xl font-semibold min-w-[4rem] text-right">{wbcCount}</span>
              <input
                type="range"
                id="wbcCount"
                min="1"
                max="20"
                step="0.1"
                value={wbcCount}
                onChange={(e) => setWbcCount(parseFloat(e.target.value))}
                className="w-full"
              />
              <span className="text-gray-300 text-sm">Slide to Adjust</span>
            </div>
          </div>

          {/* Calculate Button */}
          <button
            onClick={handleCalculate}
            className="w-full border-2 border-red-600 text-red-600 bg-white hover:bg-red-600 hover:text-black font-semibold py-3 rounded-lg transition-colors duration-300 transform shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
          >
            Calculate Dengue Risk
          </button>
        </div>

        {/* Dengue Risk Result Card */}
        {risk !== null && (
          <div className={`mt-8 rounded-xl shadow-md p-6 w-[300px] text-center ${getRiskLevel(risk / 10).bg}`}>
            <div
              className={`rounded-full w-24 h-24 mx-auto flex flex-col justify-center items-center shadow-lg mb-4 ${
                risk / 10 <= 4
                  ? "bg-green-400"
                  : risk / 10 <= 7
                  ? "bg-yellow-400"
                  : "bg-red-400"
              }`}
            >
              <span className="text-2xl font-semibold text-black">{(risk / 10).toFixed(0)}</span>
              <span className="text-lg font-bold text-black">{getRiskLevel(risk / 10).level}</span>
            </div>
            <p className="text-black font-semibold">
              You have a <span className="text-orange-500">{risk.toFixed(0)}%</span> chance of being infected with Dengue Fever.
            </p>
            <p className="mt-2 text-gray-800 text-sm font-medium">
              For a more accurate diagnosis, please visit your nearest medical laboratory.
            </p>
          </div>
        )}

        {/* Risk Legend */}
        <div className="text-black mt-6 text-center text-sm">
          <p><strong>Dengue Risk Legend:</strong></p>
          <p>
            <span className="text-green-600">Low (0 - 4)</span>,{" "}
            <span className="text-yellow-600">Medium (5 - 7)</span>,{" "}
            <span className="text-red-600">High (8 - 10)</span>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DengueRiskCalculator;
