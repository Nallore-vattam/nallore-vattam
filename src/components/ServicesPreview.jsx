import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useLanguage } from '../context/LanguageContext';
import domainsData from '../components/mainjsons/Services.json';
import { useNavigate } from 'react-router-dom';
import './SolarSystemServices.css';

const ServicesPreview = () => {
  const { currentLanguage, t, isTranslating } = useLanguage();
  const navigate = useNavigate();
  const [positions, setPositions] = useState([]);
  const [isPaused, setIsPaused] = useState(false);

  const domains = domainsData.domains.map((domain, index) => ({
    ...domain,
    color: getDomainColor(index)
  }));

  const getFontClass = () => {
    switch(currentLanguage) {
      case 'ta': return 'tamil-font';
      case 'hi': return 'hindi-font';
      default: return 'english-font';
    }
  };

  const safeTranslate = (key, fallback = '') => {
    const translated = t(key);
    return translated && translated !== key ? translated : fallback;
  };

  // Initialize random positions scattered around
  useEffect(() => {
    const initialPositions = domains.map((_, index) => {
      // Random positions scattered around the container (not just edges)
      const angle = Math.random() * 2 * Math.PI;
      const distance = 10 + Math.random() * 35; // 10% to 45% from center
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      
      return {
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        rotation: Math.random() * 360
      };
    });
    setPositions(initialPositions);
  }, []);

  // Animation loop
  useEffect(() => {
    if (isPaused) return;

    const animate = () => {
      setPositions(prev => prev.map(pos => {
        let newX = pos.x + pos.vx;
        let newY = pos.y + pos.vy;
        let newVx = pos.vx;
        let newVy = pos.vy;

        // Bounce off edges
        if (newX < -40 || newX > 40) newVx = -newVx;
        if (newY < -40 || newY > 40) newVy = -newVy;

        return {
          x: newX,
          y: newY,
          vx: newVx,
          vy: newVy,
          rotation: (pos.rotation + 0.1) % 360
        };
      }));
    };

    const interval = setInterval(animate, 50);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleDomainClick = (domain) => {
    navigate('/services');
  };

  const handleContainerHover = () => {
    setIsPaused(true);
  };

  const handleContainerLeave = () => {
    setIsPaused(false);
  };

  const handleViewMore = () => {
    navigate('/services');
  };

  if (isTranslating) {
    return (
      <section id="services-preview" className="services-preview-section floating-preview">
        <Container>
          <div className="text-center p-4">
            <div className="spinner-border text-light"></div>
            <p className={getFontClass()}>Loading domains...</p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section id="services-preview" className="services-preview-section floating-preview">
      <Container>
        {/* Header */}
        <Row className="text-center mb-4">
          <Col lg={8} className="mx-auto">
            <div className="premium-content-box floating-header">
              <h2 className={`section-title premium-hero-title ${getFontClass()}`}>
                {safeTranslate('ourServices', 'Our Services')}
              </h2>
              <p className={`lead premium-hero-subtitle ${getFontClass()}`}>
                {safeTranslate('servicesSubtitle', 'Comprehensive community development programs')}
              </p>
            </div>
          </Col>
        </Row>

        {/* Floating Domains Container */}
        <Row className="justify-content-center">
          <Col xl={8} lg={10} md={12}>
            <div 
              className="floating-container"
              onMouseEnter={handleContainerHover}
              onMouseLeave={handleContainerLeave}
            >
              
              {/* Mission Center */}
              <div className="mission-center">
                <div className="mission-glow"></div>
                <div className="mission-content">
                  <h4 className={getFontClass()}>Our Mission</h4>
                  <p className={getFontClass()}>Community Development</p>
                </div>
              </div>

              {/* Floating Domain Cards */}
              {domains.map((domain, index) => {
                const position = positions[index] || { x: 0, y: 0, rotation: 0 };
                
                return (
                  <div
                    key={index}
                    className="floating-domain"
                    style={{
                      transform: `translate(${position.x}%, ${position.y}%) rotate(${position.rotation}deg)`,
                      '--domain-color': domain.color
                    }}
                    onClick={() => handleDomainClick(domain)}
                  >
                    <Card className="domain-card floating-card">
                      <Card.Body className="domain-card-body">
                        <div className="domain-icon">
                          <span>{domain.icon}</span>
                        </div>
                        <div className={`domain-name ${getFontClass()}`}>
                          {safeTranslate(domain.key, domain.title)}
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
            </div>

            {/* Navigation Help */}
            <div className="navigation-help text-center mt-3">
              <p className={`help-text ${getFontClass()}`}>
                Click any domain to explore • Hover to pause
              </p>
            </div>
          </Col>
        </Row>

        {/* Action Buttons */}
        <Row className="mt-4">
          <Col className="text-center">
            <div className="service-actions floating-actions">
              <Button 
                variant="primary" 
                size="lg" 
                className="floating-btn me-2 mb-2"
                onClick={handleViewMore}
              >
                {safeTranslate('viewAllServices', 'View All Services')}
              </Button>
              <Button 
                variant="outline-light" 
                size="lg"
                onClick={() => navigate('/contact')}
                className="floating-btn mb-2"
              >
                {safeTranslate('getInvolved', 'Get Involved')}
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

// Color function
const getDomainColor = (index) => {
  const colors = [
    '#667eea', '#f093fb', '#4facfe', '#43e97b', '#fa709a',
    '#a8edea', '#ff9f43', '#00d2d3', '#5f27cd', '#ee5a24'
  ];
  return colors[index % colors.length];
};

export default ServicesPreview;