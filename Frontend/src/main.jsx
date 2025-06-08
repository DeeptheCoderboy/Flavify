import React from "react";

import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";

import Detection from "./Pages/Detection";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import "./Main.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Dashboard from "./Pages/Dashboard";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/detection" element={<Detection />} />

     
    </Routes>
  </Router>
);
