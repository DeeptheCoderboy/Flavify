import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const DengueRiskCalculator = () => {
    const [temperature, setTemperature] = useState(99.1);
    const [plateletCount, setPlateletCount] = useState(10);
    const [wbcCount, setWbcCount] = useState(1);
    const [risk, setRisk] = useState(null);

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
                setRisk(result.dengue_risk); // Update risk state
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
            <div className="min-h-screen bg-gradient-to-br from-red-500 to-red-700 flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md shadow-lg rounded-xl border border-white/10 p-6">
                    <h2 className="text-2xl font-bold text-white text-center mb-6">
                        Enter Your Symptoms
                    </h2>

                    {/* Temperature Input */}
                    <div className="mb-6">
                        <label htmlFor="temperature" className="text-white block text-sm font-medium mb-2">
                            Enter Fever Temperature (in °F)
                        </label>
                        <div className="flex items-center gap-4">
                            <span className="text-xl font-semibold text-white min-w-[4rem] text-right">{temperature.toFixed(1)}</span>
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
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300 transform shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    >
                        Calculate Dengue Risk
                    </button>
                </div>

                {/* Dengue Risk Result Card */}
                {risk !== null && (
                    <div className={`mt-8 rounded-xl shadow-md p-6 w-[300px] text-center ${getRiskLevel(risk / 10).bg}`}>
                        <div className="rounded-full w-24 h-24 mx-auto bg-yellow-400 flex flex-col justify-center items-center shadow-lg mb-4">
                            <span className="text-2xl font-semibold">{(risk / 10).toFixed(0)}</span>
                            <span className="text-lg font-bold">{getRiskLevel(risk / 10).level}</span>
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
                <div className="text-white mt-6 text-center text-sm">
                    <p><strong>Dengue Risk Legend:</strong></p>
                    <p>
                        <span className="text-green-300">Low (0 - 4)</span>,{" "}
                        <span className="text-yellow-300">Medium (5 - 7)</span>,{" "}
                        <span className="text-red-00">High (8 - 10)</span>
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default DengueRiskCalculator;