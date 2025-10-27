import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useLanguage } from '../context/LanguageContext';
import domainsData from '../components/mainjsons/Services.json';

const ServicesPreview = () => {
  const { currentLanguage, t, setCurrentPage, isTranslating } = useLanguage();

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
    setCurrentPage('services');
  };

  const handleGetInvolved = () => {
    setCurrentPage('contact');
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
    <section id="services-preview" className="section services-preview-section bg-light">
      <Container>
        {/* Modern Header Section */}
        <Row className="text-center mb-5">
          <Col lg={8} className="mx-auto">
            <div className="premium-content-box">
              <h2 className={`section-title premium-hero-title ${getFontClass()}`}>
                {safeTranslate('ourServices', 'Our Services')}
              </h2>
              <p className={`lead premium-hero-subtitle ${getFontClass()}`}>
                {safeTranslate('servicesSubtitle', 'Comprehensive community development programs designed to create lasting impact and sustainable change')}
              </p>
            </div>
          </Col>
        </Row>

        {/* Services Grid - Focus on Features instead of Description */}
        <Row className="g-4">
          {services.map((service, index) => (
            <Col lg={3} md={6} key={index}>
              <Card className={`service-preview-card ${service.colorClass} h-100`}>
                <Card.Body className="p-4">
                  <div className="d-flex align-items-start mb-3">
                    <div className="service-icon-large me-3">
                      <span style={{ fontSize: '2.5rem' }}>{service.icon}</span>
                    </div>
                    <div className="flex-grow-1">
                      <Card.Title className={`${getFontClass()} mb-3`}>
                        {safeTranslate(service.key, service.title)}
                      </Card.Title>
                    </div>
                  </div>

                  {/* Key Features as the main content */}
                  {service.features.length > 0 && (
                    <div className="service-features mb-4">
                      <h6 className={`${getFontClass()} mb-3 text-muted`}>
                        {safeTranslate('keyFeatures', 'Key Features')}:
                      </h6>
                      <div className="features-list">
                        {service.features.slice(0, 4).map((feature, idx) => (
                          <div key={idx} className={`feature-item d-flex align-items-center mb-2 ${getFontClass()}`}>
                            <i className="bi bi-check-circle-fill text-success me-2 small"></i>
                            <span className="small">
                              {safeTranslate(feature, feature)}
                            </span>
                          </div>
                        ))}
                        {service.features.length > 4 && (
                          <div className={`feature-more text-muted small ${getFontClass()}`}>
                            <i className="bi bi-plus-circle me-1"></i>
                            {service.features.length - 4} more features
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Service Meta Info */}
                  <div className="service-meta d-flex justify-content-between text-muted small mb-3">
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
                variant="primary" 
                size="lg" 
                className="me-3"
                onClick={handleViewMore}
              >
                {safeTranslate('viewAllServices', 'View All Services')}
              </Button>
              <Button 
                variant="outline-primary" 
                size="lg"
                onClick={handleGetInvolved}
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

export default ServicesPreview;