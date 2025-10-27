import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { currentLanguage, t, changePage } = useLanguage();
  
  const slides = [
    {
      title: t('heroTitle1'),
      subtitle: t('heroSubtitle1'),
      background: '/images/FieldofAwareness/awareness01.jpg'
    },
    {
      title: t('heroTitle2'),
      subtitle: t('heroSubtitle2'),
      background: '/images/SettingsDomain/settings01.jpg'
    },
    {
      title: t('heroTitle3'),
      subtitle: t('heroSubtitle3'),
      background: '/images/WorldDomain/world01.jpg'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  const getFontClass = () => {
    switch(currentLanguage) {
      case 'ta': return 'tamil-font';
      case 'hi': return 'hindi-font';
      default: return 'english-font';
    }
  };

  const navigateToAbout = () => {
    if (changePage) {
      changePage('about');
    }
  };

  const navigateToContact = () => {
    if (changePage) {
      changePage('contact');
    }
  };

  return (
    <section 
      id="home" 
      className="home-hero-section"  // Changed from "hero-section" to "home-hero-section"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(30, 27, 75, 0.9), rgba(55, 48, 163, 0.85)), url(${slides[currentSlide].background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Floating Particles */}
      <div className="floating-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      <Container>
        <Row className="justify-content-start"> {/* Changed from justify-content-center */}
          <Col lg={8} xl={7}>
            <div className="hero-content">
              <h1 className={`hero-title mb-4 ${getFontClass()}`}>
                {slides[currentSlide].title}
              </h1>
              <p className={`hero-subtitle mb-5 ${getFontClass()}`}>
                {slides[currentSlide].subtitle}
              </p>
              <div className="hero-buttons">
                <Button 
                  size="lg" 
                  className="cta-button me-3"
                  onClick={navigateToAbout}
                >
                  {t('learnMore')}
                </Button>
                <Button 
                  variant="outline-light" 
                  size="lg"
                  onClick={navigateToContact}
                >
                  {t('getInvolved')}
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        
        {/* Slide Indicators */}
        <div className="slide-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>

        {/* Scroll Down Indicator */}
        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;