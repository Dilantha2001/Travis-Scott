import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Tours from './pages/Tours';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import CookieConsent from './components/CookieConsent';
import SmoothScroll from './components/SmoothScroll';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <Router>
        <SmoothScroll isLoading={loading}>
          <div className={`app-container ${loading ? 'app-loading' : ''}`}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/tours" element={<Tours />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
            <Footer />
            {!loading && <CookieConsent />}
          </div>
        </SmoothScroll>
      </Router>
    </>
  );
}

export default App;
