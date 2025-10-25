import React from 'react';
import { Container, Row, Col, Card, Badge, Button, Accordion } from 'react-bootstrap';
import { useLanguage } from '../context/LanguageContext';
import domainsData from '../components/mainjsons/Services.json'; 

const Services = () => {
  const { currentLanguage, t } = useLanguage();

  const getFontClass = () => {
    switch (currentLanguage) {
      case 'ta':
        return 'tamil-font';
      case 'hi':
        return 'hindi-font';
      default:
        return 'english-font';
    }
  };

  // Map JSON domains to the service structure expected by the component
  const services = domainsData.domains.map((domain, index) => ({
    key: domain.title, // Use title as translation key
    icon: domain.icon, 
    title: domain.title,
    description: domain.description,
    features: domain.features, 
    duration: domain.duration, 
    eligibility: domain.eligibility, 
  }));

  const faqs = [
    {
      question: t('faq1Question') || 'How can I apply for education scholarships?',
      answer: t('faq1Answer') || 'Applications are accepted annually in May. Visit our office or website for application forms and eligibility criteria.',
    },
    {
      question: t('faq2Question') || 'Are health camps completely free?',
      answer: t('faq2Answer') || 'Yes, all our health camps provide free medical checkups, basic medicines, and health consultations.',
    },
    {
      question: t('faq3Question') || 'Do I need prior experience for skill development programs?',
      answer: t('faq3Answer') || 'No prior experience is required. Our programs are designed for beginners and include basic to advanced training.',
    },
  ];

  return (
     <div className="contact-page" >
      {/* Modern Hero Section */}
      <section className="page-hero contact-hero" >
        {/* Animated Background Elements */}
        <div className="floating-elements">
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
        </div>
        <Container>
          <Row>
            <Col lg={8} className="mx-auto">
              <div className="premium-content-box">
                <h1 className={`premium-hero-title ${getFontClass()}`}>
                  {t('ourServices')}
                </h1>
                <p className={`premium-hero-subtitle ${getFontClass()}`}>
                  {t('servicesSubtitle')}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Grid */}
      <section id="services-grid" className="section services-grid-section" style={{ marginTop: "20px" }}>
        <Container>
          <Row className="g-4">
            {services.map((service, index) => (
              <Col lg={6} key={index}>
                <Card className="service-detail-card h-100">
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-start mb-3">
                      <div className="service-icon-large me-3">
                        <span style={{ fontSize: '3rem' }}>{service.icon}</span>
                      </div>
                      <div className="flex-grow-1">
                        <Card.Title className={`${getFontClass()} mb-2`}>
                          {t(service.key)} {/* This will translate service titles */}
                        </Card.Title>
                        <Card.Text className={getFontClass()}>
                          {service.description}
                        </Card.Text>
                      </div>
                    </div>

                    {service.features.length > 0 && (
                      <div className="service-features mb-3">
                        <h6 className={`${getFontClass()} mb-2`}>{t('keyFeatures')}:</h6>
                        <div className="d-flex flex-wrap gap-2">
                          {service.features.map((feature, idx) => (
                            <Badge key={idx} bg="light" text="dark" className={getFontClass()}>
                              {t(feature) || feature} {/* Translate features if available */}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="service-meta d-flex justify-content-between text-muted small mb-3">
                      <span className={getFontClass()}>
                        <i className="bi bi-clock me-1"></i>
                        {t(service.duration) || service.duration} {/* Translate duration */}
                      </span>
                      <span className={getFontClass()}>
                        <i className="bi bi-person me-1"></i>
                        {t(service.eligibility) || service.eligibility} {/* Translate eligibility */}
                      </span>
                    </div>

                    <div className="service-actions">
                      <Button variant="primary" className="me-2">
                        {t('learnMoreBtn')}
                      </Button>
                      <Button variant="outline-primary">{t('applyNow')}</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Rest of your component remains the same */}
      <section className="section process-section bg-light" style={{ marginTop: "20px" }}>
        <Container>
          <h2 className={`section-title text-center ${getFontClass()}`}>{t('howItWorks')}</h2>
          <Row className="g-4">
            <Col lg={3} md={6} className="text-center">
              <div className="process-step">
                <div className="step-number">1</div>
                <h5 className={getFontClass()}>{t('register')}</h5>
                <p className={getFontClass()}>{t('createAccount')}</p>
              </div>
            </Col>
            <Col lg={3} md={6} className="text-center">
              <div className="process-step">
                <div className="step-number">2</div>
                <h5 className={getFontClass()}>{t('apply')}</h5>
                <p className={getFontClass()}>{t('chooseService')}</p>
              </div>
            </Col>
            <Col lg={3} md={6} className="text-center">
              <div className="process-step">
                <div className="step-number">3</div>
                <h5 className={getFontClass()}>{t('review')}</h5>
                <p className={getFontClass()}>{t('teamReview')}</p>
              </div>
            </Col>
            <Col lg={3} md={6} className="text-center">
              <div className="process-step">
                <div className="step-number">4</div>
                <h5 className={getFontClass()}>{t('participate')}</h5>
                <p className={getFontClass()}>{t('joinProgram')}</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section faq-section">
        <Container>
          <h2 className={`section-title text-center ${getFontClass()}`}>
            {t('frequentlyAskedQuestions')}
          </h2>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Accordion>
                {faqs.map((faq, index) => (
                  <Accordion.Item key={index} eventKey={index.toString()}>
                    <Accordion.Header className={getFontClass()}>
                      {faq.question}
                    </Accordion.Header>
                    <Accordion.Body className={getFontClass()}>
                      {faq.answer}
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Services;