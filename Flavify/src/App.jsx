import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import Footer from './Components/Footer';


export default function App() {
  

  // Only render homepage sections on "/"
 

  return (
    <div>
      <Navbar />
      <div id="home"><Home /></div>
      <div id="about"><About /></div>
      <Footer/>
    </div>
  );
}
