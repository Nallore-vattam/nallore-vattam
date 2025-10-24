import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useLanguage } from '../context/LanguageContext';

const ServicesPreview = () => {
  const { currentLanguage, t, setCurrentPage } = useLanguage();

  const services = [
    { key: 'service1', icon: '🎓', color: 'primary' },
    { key: 'service2', icon: '🏥', color: 'success' },
    { key: 'service3', icon: '🌱', color: 'info' },
    { key: 'service4', icon: '🎭', color: 'warning' }
  ];

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

  return (
    <section id="services-preview" className="section services-preview-section bg-light">
      <Container>
        <Row className="text-center mb-5">
          <Col lg={8} className="mx-auto">
            <h2 className={`section-title ${getFontClass()}`}>
              {t('servicesTitle')}
            </h2>
            <p className={`lead ${getFontClass()}`}>
              Comprehensive community services designed to empower and uplift every member
            </p>
          </Col>
        </Row>

        <Row>
          {services.map((service, index) => (
            <Col lg={3} md={6} className="mb-4" key={index}>
              <Card className="service-preview-card text-center h-100">
                <Card.Body className="p-4">
                  <div className={`service-icon bg-${service.color} bg-opacity-10 rounded-circle mx-auto mb-3`}
                       style={{ width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '2.5rem' }}>{service.icon}</span>
                  </div>
                  <Card.Title className={`${getFontClass()} mb-3`}>
                    {t(service.key)}
                  </Card.Title>
                  <Card.Text className={getFontClass()}>
                    Professional services delivered with care and expertise to meet community needs.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Row className="mt-4">
          <Col className="text-center">
            <Button 
              variant="primary" 
              size="lg" 
              className="me-3"
              onClick={handleViewMore}
            >
              View All Services
            </Button>
            <Button 
              variant="outline-primary" 
              size="lg"
              onClick={handleGetInvolved}
            >
              Get Involved
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ServicesPreview;