import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useLanguage } from '../context/LanguageContext';

const AboutPreview = () => {
  const { currentLanguage, t, setCurrentPage } = useLanguage();

  const getFontClass = () => {
    switch(currentLanguage) {
      case 'ta': return 'tamil-font';
      case 'hi': return 'hindi-font';
      default: return 'english-font';
    }
  };

  const handleViewMore = () => {
    setCurrentPage('about');
  };

  return (
    <section id="about-preview" className="section about-preview-section " >
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="mb-4 mb-lg-0">
           <img
  src={`${import.meta.env.BASE_URL}images/Enviromental Field/enviromental_01.jpg`}
  alt="About Nallor Vattam"
  className="about-image img-fluid w-100 rounded-3"
  style={{ height: '400px', objectFit: 'cover' }}
  onError={(e) => {
    e.target.onerror = null; // prevent infinite loop
    e.target.src = `${import.meta.env.BASE_URL}images/Enviromental Field/fallback.jpg`;
  }}
/>

          </Col>
          <Col lg={6}>
            <div className="about-preview-content">
              <h2 className={`section-title text-start ${getFontClass()}`}>
                {t('aboutTitle')}
              </h2>
              <p className={`about-text ${getFontClass()} mb-4`}>
                {t('aboutText1')}
              </p>
              <p className={`about-text ${getFontClass()} mb-4`}>
                {t('aboutText2')}
              </p>
              <p className={`about-text ${getFontClass()} mb-4`}>
                {t('aboutText3')}
              </p>
              
              <div className="about-highlights mb-4">
                <Row>
                  <Col md={6} className="mb-3">
                    <div className="d-flex align-items-center">
                      <div className="feature-icon me-3">
                        <i className="bi bi-people-fill text-primary fs-3"></i>
                      </div>
                      <div>
                        <h5 className="mb-1">500+ Members</h5>
                        <p className="text-muted mb-0">Active Community</p>
                      </div>
                    </div>
                  </Col>
                  <Col md={6} className="mb-3">
                    <div className="d-flex align-items-center">
                      <div className="feature-icon me-3">
                        <i className="bi bi-calendar-event-fill text-primary fs-3"></i>
                      </div>
                      <div>
                        <h5 className="mb-1">50+ Events</h5>
                        <p className="text-muted mb-0">Annual Programs</p>
                      </div>
                    </div>
                  </Col>
                  <Col md={6} className="mb-3">
                    <div className="d-flex align-items-center">
                      <div className="feature-icon me-3">
                        <i className="bi bi-award-fill text-primary fs-3"></i>
                      </div>
                      <div>
                        <h5 className="mb-1">10+ Years</h5>
                        <p className="text-muted mb-0">Of Service</p>
                      </div>
                    </div>
                  </Col>
                  <Col md={6} className="mb-3">
                    <div className="d-flex align-items-center">
                      <div className="feature-icon me-3">
                        <i className="bi bi-heart-fill text-primary fs-3"></i>
                      </div>
                      <div>
                        <h5 className="mb-1">1000+ Lives</h5>
                        <p className="text-muted mb-0">Impacted</p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>

              <div className="about-actions">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="me-3"
                  onClick={handleViewMore}
                >
                  Learn More About Us
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutPreview;