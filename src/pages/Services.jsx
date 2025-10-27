import React from 'react';
import { Container, Row, Col, Card, Badge, Button, Accordion, Spinner } from 'react-bootstrap';
import { useLanguage } from '../context/LanguageContext';
import domainsData from '../components/mainjsons/Services.json'; 
import './ServiceCards.css'; // Import the custom CSS for service cards

const Services = () => {
  const { currentLanguage, t, isTranslating, translations } = useLanguage();

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

  // ✅ Better loading state with spinner
  if (isTranslating) {
    return (
      <div className="text-center p-5">
        <Spinner animation="border" role="status" className="me-2" />
        <span className={getFontClass()}>Translating content...</span>
      </div>
    );
  }

  // ✅ Safe check for translations
  const hasTranslations = translations && typeof translations === 'object';
  
  // Map JSON domains to the service structure
  const services = domainsData.domains.map((domain, index) => ({
    key: domain.key,
    icon: domain.icon, 
    title: domain.title,
    description: domain.description,
    features: domain.features || [], // Ensure features is always an array
    duration: domain.duration, 
    eligibility: domain.eligibility, 
  }));

  // Debug code - only in development
  if (process.env.NODE_ENV === 'development') {
    console.log('=== SERVICES DEBUG ===');
    console.log('Current Language:', currentLanguage);
    console.log('Is Translating:', isTranslating);
    console.log('Translations loaded:', hasTranslations ? Object.keys(translations).length : 0);
    console.log('Sample translation - ourServices:', t('ourServices'));
    console.log('Available services:', services.length);
  }

  // Translated FAQs with better fallbacks
  const faqs = [
    {
      question: t('faq1Question'),
      answer: t('faq1Answer'),
    },
    {
      question: t('faq2Question'), 
      answer: t('faq2Answer'),
    },
    {
      question: t('faq3Question'),
      answer: t('faq3Answer'),
    },
    {
      question: t('faq4Question'),
      answer: t('faq4Answer'),
    },
    {
      question: t('faq5Question'),
      answer: t('faq5Answer'),
    }
  ].filter(faq => faq.question && faq.answer); // Only show FAQs that have content

  // Safe translation function with fallback
  const safeTranslate = (key, fallback = '') => {
    const translated = t(key);
    return translated && translated !== key ? translated : fallback;
  };

  // Function to get color class based on index
  const getColorClass = (index) => {
    const colorNumber = (index % 10) + 1;
    return `service-card-${colorNumber}`;
  };

  return (
    <div className="services-page">
      {/* Modern Hero Section */}
      <section className="page-hero services-hero">
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
                  {safeTranslate('ourServices', 'Our Services')}
                </h1>
                <p className={`premium-hero-subtitle ${getFontClass()}`}>
                  {safeTranslate('servicesSubtitle', 'Comprehensive community development programs designed to create lasting impact and sustainable change')}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Grid Section - 2 Cards Per Row */}
      <section id="services-grid" className="section services-grid-section" style={{ marginTop: "20px", padding: "40px 0" }}>
        <Container>
          <Row className="g-4">
            {services.map((service, index) => (
              <Col lg={6} key={index}>
                <Card className={`service-detail-card ${getColorClass(index)} h-100`}>
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-start mb-3">
                      <div className="service-icon-large me-3">
                        <span style={{ fontSize: '2.5rem' }}>{service.icon}</span>
                      </div>
                      <div className="flex-grow-1">
                        <Card.Title className={`${getFontClass()} mb-2`}>
                          {safeTranslate(service.key, service.title)}
                        </Card.Title>
                        <Card.Text className={getFontClass()}>
                          {safeTranslate(service.description, service.description)}
                        </Card.Text>
                      </div>
                    </div>

                    {service.features.length > 0 && (
                      <div className="service-features mb-3">
                        <h6 className={`${getFontClass()} mb-2`}>
                          {safeTranslate('keyFeatures', 'Key Features')}:
                        </h6>
                        <div className="d-flex flex-wrap gap-2">
                          {service.features.map((feature, idx) => (
                            <Badge key={idx} bg="light" text="dark" className={getFontClass()}>
                              {safeTranslate(feature, feature)}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="service-meta d-flex justify-content-between text-muted small mb-3">
                      <span className={getFontClass()}>
                        <i className="bi bi-clock me-1"></i>
                        {safeTranslate('duration', 'Duration')}: {safeTranslate(service.duration, service.duration)}
                      </span>
                      <span className={getFontClass()}>
                        <i className="bi bi-person me-1"></i>
                        {safeTranslate('eligibility', 'Eligibility')}: {safeTranslate(service.eligibility, service.eligibility)}
                      </span>
                    </div>

                    <div className="service-actions">
                      <Button variant="primary" className="me-2">
                        {safeTranslate('learnMoreBtn', 'Learn More')}
                      </Button>
                      <Button variant="outline-primary">
                        {safeTranslate('applyNow', 'Apply Now')}
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Process Section */}
      <section className="section process-section bg-light" style={{ marginTop: "20px", padding: "60px 0" }}>
        <Container>
          <h2 className={`section-title text-center mb-5 ${getFontClass()}`}>
            {safeTranslate('howItWorks', 'How It Works')}
          </h2>
          <Row className="text-center g-4">
            {[
              { 
                icon: 'bi-person-plus', 
                title: 'register', 
                desc: 'createAccount',
                color: 'var(--card-1-color)'
              },
              { 
                icon: 'bi-journal-text', 
                title: 'apply', 
                desc: 'chooseService',
                color: 'var(--card-2-color)'
              },
              { 
                icon: 'bi-search', 
                title: 'review', 
                desc: 'teamReview',
                color: 'var(--card-4-color)'
              },
              { 
                icon: 'bi-people', 
                title: 'participate', 
                desc: 'joinProgram',
                color: 'var(--card-6-color)'
              }
            ].map((step, index) => (
              <Col lg={3} md={6} key={index}>
                <div 
                  className="process-card p-4 bg-white h-100 rounded shadow-sm"
                  style={{ 
                    borderTop: `4px solid ${step.color}`,
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div 
                    className="process-icon mb-3"
                    style={{ color: step.color }}
                  >
                    <i className={`bi ${step.icon} fs-2`}></i>
                  </div>
                  <h5 className={getFontClass()}>
                    {safeTranslate(step.title, step.title)}
                  </h5>
                  <p className={`${getFontClass()} text-muted`}>
                    {safeTranslate(step.desc, step.desc)}
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <section className="section faq-section" style={{ padding: "60px 0" }}>
          <Container>
            <h2 className={`section-title text-center mb-5 ${getFontClass()}`}>
              {safeTranslate('frequentlyAskedQuestions', 'Frequently Asked Questions')}
            </h2>
            <Row className="justify-content-center">
              <Col lg={8}>
                <Accordion flush>
                  {faqs.map((faq, index) => (
                    <Accordion.Item 
                      eventKey={index.toString()} 
                      key={index}
                      className="mb-3 rounded shadow-sm"
                    >
                      <Accordion.Header className={getFontClass()}>
                        <strong>{faq.question}</strong>
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
      )}
    </div>
  );
};

export default Services;