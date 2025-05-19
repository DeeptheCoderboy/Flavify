import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const DengueRiskCalculator = () => {
    const [temperature, setTemperature] = useState(97.5);
    const [plateletCount, setPlateletCount] = useState(10);
    const [wbcCount, setWbcCount] = useState(1);

    const handleCalculate = async () => {
    try {
        const response = await fetch("http://localhost:5000/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                temperature: temperature,
                wbc: wbcCount,
                platelet: plateletCount,
            }),
        });

        const result = await response.json();

        if (response.ok && result.dengue_risk !== undefined) {
            alert(
                `Temperature: ${temperature} °F\n` +
                `Platelet Count: ${plateletCount} * 1000/uL\n` +
                `WBC Count: ${wbcCount} * 1000/uL\n\n` +
                `⚠️ Estimated Dengue Risk: ${result.dengue_risk.toFixed(2)}%`
            );
        } else {
            alert("Error in prediction: " + (result.error || "Unknown error"));
        }
    } catch (error) {
        alert("Failed to connect to the backend: " + error.message);
    }
};


    return (
      <>
      <Navbar/>
        <div className="min-h-screen bg-gradient-to-br to-red-200 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl p-6  bg-red-400 border-2  rounded-2xl shadow-xl backdrop-blur-md transition-all duration-300 hover:bg-red-400 hover:shadow-2xl hover:border-red-200">
                <h2 className="text-2xl font-bold text-white text-center mb-6">
                    Enter Your Symptoms
                </h2>
                {/* Temperature Input */}
                <div className="mb-6">
                    <label htmlFor="temperature" className="text-white block text-sm font-medium mb-2">
                        Enter Body Temperature (in °F)
                    </label>
                    <div className="flex items-center gap-4">
                        <span className="text-xl font-semibold text-white min-w-[4rem] text-right">{temperature.toFixed(1)}</span>
                        <input
                            type="range"
                            id="temperature"
                            min="90"
                            max="110"
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
                    <label htmlFor="plateletCount" className="text-white block text-sm font-medium mb-2">
                        Enter Platelet Count (*1000/uL)
                    </label>
                    <div className="flex items-center gap-4">
                        <span className="text-xl font-semibold text-white min-w-[4rem] text-right">{plateletCount}</span>
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
                    <label htmlFor="wbcCount" className="text-white block text-sm font-medium mb-2">
                        Enter WBC Count (*1000/uL)
                    </label>
                    <div className="flex items-center gap-4">
                        <span className="text-xl font-semibold text-white min-w-[4rem] text-right">{wbcCount}</span>
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
                    className={`w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg
                               transition-colors duration-300 transform shadow-lg
                               focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50`}

                >
                    Calculate Dengue Risk
                </button>
            </div>
        </div>
        <Footer/>
        </>
    );
};

export default DengueRiskCalculator;
