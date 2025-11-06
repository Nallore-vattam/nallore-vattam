import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import NavbarAutoClose from './components/NavbarAutoClose'; 
import ServicesPage from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import GalleryPage from './pages/Gallery';
import ContactPage from './pages/Contact';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="App">
          <Header />
          <NavbarAutoClose />
          <main style={{ minHeight: '100vh' }}>
            <Routes>                                                
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:serviceKey" element={<ServiceDetail />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;