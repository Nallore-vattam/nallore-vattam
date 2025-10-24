import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import "../App.css";

const defaultContent = {
  hero: {
    title: "Nallore Vattam",
    subtitle: "Community Service Organization",
    description: "Building a better community through service and compassion",
    backgroundImage: "/images/home-hero.jpg",
  },
  aboutPreview: {
    title: "About Us",
    content: "We are dedicated to improving our community through various initiatives focused on education, environment, and social welfare.",
  },
  domainsPreview: {
    title: "Our Domains",
    description: "Explore the different fields where we are making an impact.",
  },
};

const domains = [
  { name: 'Student Field', path: 'student-field' },
  { name: 'Youth Field', path: 'youth-field' },
  { name: 'Women Field', path: 'womens-field' },
  { name: 'Village Field', path: 'village-field' },
  { name: 'Environmental', path: 'environmental' },
  { name: 'Awareness Field', path: 'awareness-field' },
  { name: 'Govt Domain', path: 'govt-domain' },
  { name: 'World Domain', path: 'world-domain' },
  { name: 'Settings Domain', path: 'settings-domain' },
  { name: 'Biology Field', path: 'biology-field' },
];

const Home = ({ currentLanguage }) => {
  const [translatedContent, setTranslatedContent] = useState(defaultContent);

  // Mock translation function 
  const autoTranslate = async (content, targetLang) => {
    // This is just returning the same content for now
    return { ...content };
  };

  useEffect(() => {
    const translateContent = async () => {
      if (currentLanguage === 'en') {
        setTranslatedContent(defaultContent);
      } else {
        const translated = await autoTranslate(defaultContent, currentLanguage);
        setTranslatedContent(translated);
      }
    };
    translateContent();
  }, [currentLanguage]);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section
        className="hero-section"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${translatedContent.hero.backgroundImage})`,
        }}
      >
        <div className="hero-overlay">
          <Container>
            <Row>
              <Col xs={12} className="text-center">
                <h1 className="hero-title">{translatedContent.hero.title}</h1>
                <p className="hero-subtitle">{translatedContent.hero.subtitle}</p>
                <p className="hero-description">{translatedContent.hero.description}</p>
                <Button variant="primary" size="lg" href="/about" className="cta-button">
                  Learn More
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="about-preview-section section-padding">
        <Container>
          <Row>
            <Col xs={12} md={10} lg={8} className="mx-auto text-center">
              <h2 className="section-title">{translatedContent.aboutPreview.title}</h2>
              <p className="section-description">{translatedContent.aboutPreview.content}</p>
              <Button variant="outline-primary" href="/about" className="mt-3">
                Read More About Us
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Domains Section */}
      <section className="domains-section section-padding bg-light">
        <Container>
          <Row>
            <Col xs={12} className="text-center mb-5">
              <h2 className="section-title">{translatedContent.domainsPreview.title}</h2>
              <p className="section-description">{translatedContent.domainsPreview.description}</p>
            </Col>
          </Row>
          <Row className="justify-content-center">
            {domains.map((domain, index) => (
              <Col xs={12} sm={6} lg={4} xl={3} key={index} className="mb-4">
                <Card className="domain-card h-100 shadow-sm">
                  <Card.Body className="text-center d-flex flex-column">
                    <div className="domain-icon mb-3">
                      <i className="fas fa-hands-helping fa-2x text-primary"></i>
                    </div>
                    <Card.Title className="domain-name">{domain.name}</Card.Title>
                    <Card.Text className="domain-description flex-grow-1">
                      Explore our initiatives in {domain.name.toLowerCase()}
                    </Card.Text>
                    <Button 
                      variant="primary" 
                      href={`/domains/${domain.path}`} 
                      className="domain-button mt-auto"
                      size="sm"
                    >
                      Explore Domain
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;