import React from 'react';
import { Container, Row, Col, Card, Badge, Button, Accordion } from 'react-bootstrap';
import { useLanguage } from '../context/LanguageContext';
import domainsData from '../components/mainjsons/Services.json'; 

const Services = () => {
  const { currentLanguage, t, isTranslating, translations } = useLanguage(); // ✅ Added translations & isTranslating

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

  // ✅ Prevent render until translations are ready
  if (isTranslating || !translations || Object.keys(translations).length === 0) {
    return <div className="text-center p-5">Translating content...</div>;
  }

  // Map JSON domains to the service structure
  const services = domainsData.domains.map((domain, index) => ({
    key: domain.key,
    icon: domain.icon, 
    title: domain.title,
    description: domain.description,
    features: domain.features, 
    duration: domain.duration, 
    eligibility: domain.eligibility, 
  }));

  // Debug logs
  console.log('=== SERVICES DEBUG ===');
  console.log('Current Language:', currentLanguage);
  console.log('First service key:', services[0]?.key);
  console.log('Translation for studentDomain:', t('studentDomain'));
  console.log('Translation for studentDomainDesc:', t('studentDomainDesc'));

  // Translated FAQs
  const faqs = [
    { question: t('faq1Question'), answer: t('faq1Answer') },
    { question: t('faq2Question'), answer: t('faq2Answer') },
    { question: t('faq3Question'), answer: t('faq3Answer') },
    { question: t('faq4Question'), answer: t('faq4Answer') },
    { question: t('faq5Question'), answer: t('faq5Answer') }
  ];

  return (
    <div className="contact-page">
      <section className="page-hero contact-hero">
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
                          {t(service.key)}
                        </Card.Title>
                        <Card.Text className={getFontClass()}>
                          {t(service.description)}
                        </Card.Text>
                      </div>
                    </div>

                    {service.features.length > 0 && (
                      <div className="service-features mb-3">
                        <h6 className={`${getFontClass()} mb-2`}>{t('keyFeatures')}:</h6>
                        <div className="d-flex flex-wrap gap-2">
                          {service.features.map((feature, idx) => (
                            <Badge key={idx} bg="light" text="dark" className={getFontClass()}>
                              {t(feature)}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="service-meta d-flex justify-content-between text-muted small mb-3">
                      <span className={getFontClass()}>
                        <i className="bi bi-clock me-1"></i>
                        {t(service.duration)}
                      </span>
                      <span className={getFontClass()}>
                        <i className="bi bi-person me-1"></i>
                        {t(service.eligibility)}
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

      <section className="section process-section bg-light" style={{ marginTop: "20px" }}>
        <Container>
          <h2 className={`section-title text-center mb-5 ${getFontClass()}`}>
            {t('howItWorks')}
          </h2>
          <Row className="text-center g-4">
            {[
              { icon: 'bi-person-plus', title: 'register', desc: 'createAccount' },
              { icon: 'bi-journal-text', title: 'apply', desc: 'chooseService' },
              { icon: 'bi-search', title: 'review', desc: 'teamReview' },
              { icon: 'bi-people', title: 'participate', desc: 'joinProgram' }
            ].map((step, index) => (
              <Col lg={3} key={index}>
                <div className="process-card p-4 bg-white h-100 rounded shadow-sm">
                  <div className="process-icon mb-3">
                    <i className={`bi ${step.icon} fs-2 text-primary`}></i>
                  </div>
                  <h5 className={getFontClass()}>{t(step.title)}</h5>
                  <p className={`${getFontClass()} text-muted`}>{t(step.desc)}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="section faq-section" style={{ marginTop: "20px" }}>
        <Container>
          <h2 className={`section-title text-center mb-5 ${getFontClass()}`}>
            {t('frequentlyAskedQuestions')}
          </h2>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Accordion>
                {faqs.map((faq, index) => (
                  <Accordion.Item eventKey={index.toString()} key={index}>
                    <Accordion.Header className={getFontClass()}>{faq.question}</Accordion.Header>
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
