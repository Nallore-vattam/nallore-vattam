import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { currentLanguage, t } = useLanguage();
  
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

  return (
    <section 
      id="home" 
      className="hero-section"
      style={{
        background: `linear-gradient(135deg, rgba(44, 41, 41, 0.8), rgba(45, 44, 44, 0.8)), url(${slides[currentSlide].background}) center/cover`
      }}
    >
      <Container>
        <Row className="justify-content-center text-center">
          <Col lg={8}>
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
                  onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
                >
                  {t('learnMore')}
                </Button>
                <Button 
                  variant="outline-light" 
                  size="lg"
                  onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                >
                  {t('getInvolved')}
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        
        {/* Slide Indicators */}
        <div className="slide-indicators position-absolute bottom-0 start-50 translate-middle-x mb-4">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator mx-1 ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: '2px solid white',
                background: index === currentSlide ? 'var(--gold-color)' : 'transparent',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Hero;