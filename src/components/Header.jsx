import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useLanguage } from '../context/LanguageContext';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { currentLanguage, setCurrentLanguage, currentPage, setCurrentPage, supportedLanguages, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getFontClass = () => {
    switch(currentLanguage) {
      case 'ta': return 'tamil-font';
      case 'hi': return 'hindi-font';
      default: return 'english-font';
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const isActive = (page) => {
    return currentPage === page ? 'active' : '';
  };

  return (
    <Navbar expand="lg" fixed="top" className={scrolled ? 'navbar-scrolled' : ''}>
      <Container>
        <Navbar.Brand 
          className="d-flex align-items-center"
          onClick={() => handlePageChange('home')}
          style={{ cursor: 'pointer' }}
        >
         <img
  src="/images/contentsofweb/logo.png"
  alt="Logo"
  className="logo-img"
  onError={(e) => {
    e.target.onerror = null; // prevents infinite loop
    e.target.src = '/images/contentsofweb/logo-5q8siOY4.jpeg';
  }}
/>

        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link 
              className={`${getFontClass()} ${isActive('home')}`}
              onClick={() => handlePageChange('home')}
              style={{ cursor: 'pointer' }}
            >
              {t('home')}
            </Nav.Link>
            <Nav.Link 
              className={`${getFontClass()} ${isActive('about')}`}
              onClick={() => handlePageChange('about')}
              style={{ cursor: 'pointer' }}
            >
              {t('about')}
            </Nav.Link>
            <Nav.Link 
              className={`${getFontClass()} ${isActive('services')}`}
              onClick={() => handlePageChange('services')}
              style={{ cursor: 'pointer' }}
            >
              {t('services')}
            </Nav.Link>
            <Nav.Link 
              className={`${getFontClass()} ${isActive('gallery')}`}
              onClick={() => handlePageChange('gallery')}
              style={{ cursor: 'pointer' }}
            >
              {t('gallery')}
            </Nav.Link>
            <Nav.Link 
              className={`${getFontClass()} ${isActive('contact')}`}
              onClick={() => handlePageChange('contact')}
              style={{ cursor: 'pointer' }}
            >
              {t('contact')}
            </Nav.Link>
            
            <div className="language-switcher ms-3 d-flex align-items-center">
              {supportedLanguages.map((lang) => (
                <button 
                  key={lang.code}
                  className={`lang-btn ${currentLanguage === lang.code ? 'active' : ''}`}
                  onClick={() => setCurrentLanguage(lang.code)}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;