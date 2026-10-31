import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Tours from './pages/Tours';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import SmoothScroll from './components/SmoothScroll';
import CustomScrollbar from './components/CustomScrollbar';
import './App.css';

function App() {
  return (
    <>
      <CustomScrollbar />
      <Router>
        <SmoothScroll>
          <div className="app-container">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/tours" element={<Tours />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
            <Footer />
            <CookieConsent />
          </div>
        </SmoothScroll>
      </Router>
    </>
  );
}

export default App;
