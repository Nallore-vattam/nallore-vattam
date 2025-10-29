import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useLanguage } from '../context/LanguageContext';
import domainsData from '../components/mainjsons/Services.json';
import { useNavigate } from 'react-router-dom';

const ServicesPreview = () => {
  const { currentLanguage, t, setCurrentPage, isTranslating } = useLanguage();
  const navigate = useNavigate();

  // Get services data from the same JSON file
  const services = domainsData.domains.slice(0, 4).map((domain, index) => ({
    key: domain.key,
    icon: domain.icon,
    title: domain.title,
    description: domain.description,
    features: domain.features || [],
    duration: domain.duration,
    eligibility: domain.eligibility,
    colorClass: `service-card-${(index % 10) + 1}`
  }));

  const getFontClass = () => {
    switch(currentLanguage) {
      case 'ta': return 'tamil-font';
      case 'hi': return 'hindi-font';
      default: return 'english-font';
    }
  };

  const handleViewMore = () => {
    if (setCurrentPage) {
      setCurrentPage('services');
    }
    navigate('/services');
  };

  const handleGetInvolved = () => {
    if (setCurrentPage) {
      setCurrentPage('contact');
    }
    navigate('/contact');
  };

  // Safe translation function with fallback
  const safeTranslate = (key, fallback = '') => {
    const translated = t(key);
    return translated && translated !== key ? translated : fallback;
  };

  // Show loading state if translating
  if (isTranslating) {
    return (
      <section id="services-preview" className="section services-preview-section bg-light">
        <Container>
          <Row className="text-center">
            <Col>
              <div className="text-center p-4">
                <span className="spinner-border spinner-border-sm me-2"></span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

  return (
    <section id="services-preview" className="section services-preview-section" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '5rem 0'
    }}>
      <Container>
        {/* Modern Header Section with Different Background */}
        <Row className="text-center mb-5">
          <Col lg={8} className="mx-auto">
            <div className="premium-content-box" style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              padding: '3rem 2rem',
              boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
              border: '1px solid rgba(255,255,255,0.3)'
            }}>
              <h2 className={`section-title premium-hero-title ${getFontClass()}`} style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '1rem',
                textShadow: 'none' // Explicitly remove text shadow
              }}>
                {safeTranslate('ourServices', 'Our Services')}
              </h2>
              <p className={`lead premium-hero-subtitle ${getFontClass()}`} style={{
                color: '#6c757d',
                fontSize: '1.2rem',
                marginBottom: '0',
                textShadow: 'none' // Explicitly remove text shadow
              }}>
                {safeTranslate('servicesSubtitle', 'Comprehensive community development programs designed to create lasting impact and sustainable change')}
              </p>
            </div>
          </Col>
        </Row>

        {/* Services Grid with Different Background Colors */}
        <Row className="g-4">
          {services.map((service, index) => (
            <Col lg={3} md={6} key={index}>
              <Card className={`service-preview-card h-100`} style={{
                background: getCardBackground(index),
                border: 'none',
                borderRadius: '15px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease'
              }}>
                <Card.Body className="p-4">
                  <div className="d-flex align-items-start mb-3">
                    <div className="service-icon-large me-3" style={{
                      color: getIconColor(index),
                      textShadow: 'none' // Remove icon shadow
                    }}>
                      <span style={{ fontSize: '2.5rem' }}>{service.icon}</span>
                    </div>
                    <div className="flex-grow-1">
                      <Card.Title className={`${getFontClass()} mb-3`} style={{
                        color: getTextColor(index),
                        textShadow: 'none' // Remove text shadow
                      }}>
                        {safeTranslate(service.key, service.title)}
                      </Card.Title>
                    </div>
                  </div>

                  {/* Key Features as the main content */}
                  {service.features.length > 0 && (
                    <div className="service-features mb-4">
                      <h6 className={`${getFontClass()} mb-3`} style={{
                        color: getTextColor(index),
                        opacity: 0.9,
                        textShadow: 'none' // Remove text shadow
                      }}>
                        {safeTranslate('keyFeatures', 'Key Features')}:
                      </h6>
                      <div className="features-list">
                        {service.features.slice(0, 4).map((feature, idx) => (
                          <div key={idx} className={`feature-item d-flex align-items-center mb-2 ${getFontClass()}`} style={{
                            color: getTextColor(index),
                            textShadow: 'none' // Remove text shadow
                          }}>
                            <i className="bi bi-check-circle-fill me-2 small" style={{
                              color: getIconColor(index),
                              textShadow: 'none' // Remove icon shadow
                            }}></i>
                            <span className="small">
                              {safeTranslate(feature, feature)}
                            </span>
                          </div>
                        ))}
                        {service.features.length > 4 && (
                          <div className={`feature-more small ${getFontClass()}`} style={{
                            color: getTextColor(index),
                            opacity: 0.7,
                            textShadow: 'none' // Remove text shadow
                          }}>
                            <i className="bi bi-plus-circle me-1"></i>
                            {service.features.length - 4} more features
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Service Meta Info */}
                  <div className="service-meta d-flex justify-content-between small mb-3" style={{
                    color: getTextColor(index),
                    opacity: 0.8,
                    textShadow: 'none' // Remove text shadow
                  }}>
                    <span className={getFontClass()}>
                      <i className="bi bi-clock me-1"></i>
                      {safeTranslate(service.duration, service.duration)}
                    </span>
                    <span className={getFontClass()}>
                      <i className="bi bi-person me-1"></i>
                      {safeTranslate(service.eligibility, service.eligibility)}
                    </span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Action Buttons */}
        <Row className="mt-5">
          <Col className="text-center">
            <div className="service-actions">
              <Button 
                variant="light" 
                size="lg" 
                className="me-3"
                onClick={handleViewMore}
                style={{
                  background: 'rgba(255,255,255,0.9)',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '12px 30px',
                  fontWeight: '600',
                  textShadow: 'none' // Remove button text shadow
                }}
              >
                {safeTranslate('viewAllServices', 'View All Services')}
              </Button>
              <Button 
                variant="outline-light" 
                size="lg"
                onClick={handleGetInvolved}
                style={{
                  borderRadius: '50px',
                  padding: '12px 30px',
                  fontWeight: '600',
                  borderWidth: '2px',
                  textShadow: 'none' // Remove button text shadow
                }}
              >
                {safeTranslate('getInvolved', 'Get Involved')}
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .service-preview-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15) !important;
        }
        
        /* Remove text shadows globally for this component */
        .services-preview-section * {
          text-shadow: none !important;
        }
      `}</style>
    </section>
  );
};

// Helper functions for different colors
const getCardBackground = (index) => {
  const backgrounds = [
    'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
    'linear-gradient(135deg, #48dbfb 0%, #0abde3 100%)',
    'linear-gradient(135deg, #1dd1a1 0%, #10ac84 100%)',
    'linear-gradient(135deg, #f368e0 0%, #ff9ff3 100%)'
  ];
  return backgrounds[index % backgrounds.length];
};

const getIconColor = (index) => {
  const colors = ['#ffffff', '#ffffff', '#ffffff', '#ffffff'];
  return colors[index % colors.length];
};

const getTextColor = (index) => {
  const colors = ['#ffffff', '#ffffff', '#ffffff', '#ffffff'];
  return colors[index % colors.length];
};

export default ServicesPreview;