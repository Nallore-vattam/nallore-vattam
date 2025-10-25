import React from 'react';
import { Container, Row, Col, Card, ProgressBar } from 'react-bootstrap';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { currentLanguage, t } = useLanguage();

  const getFontClass = () => {
    switch(currentLanguage) {
      case 'ta': return 'tamil-font';
      case 'hi': return 'hindi-font';
      default: return 'english-font';
    }
  };

  const teamMembers = [
    {
      name: 'Yathin',
      role: 'President',
      image: '/images/Enviromental Field/enviromental01.jpg',
      description: 'Leading community initiatives for over 10 years'
    },
    {
      name: 'Aditya',
      role: 'Secretary',
      image: '/images/FieldofBiology/biology01.jpg',
      description: 'Dedicated to women empowerment programs'
    },
    {
      name: 'Madhav',
      role: 'Treasurer',
      image: '/images/VillageField/village01.jpg',
      description: 'Financial management and resource allocation'
    }
  ];

  const milestones = [
    { year: '2014', event: 'Organization Founded', description: 'Started with 50 members' },
    { year: '2016', event: 'First Community Center', description: 'Established permanent space' },
    { year: '2018', event: 'Education Program Launch', description: 'Scholarships for students' },
    { year: '2020', event: 'Digital Transformation', description: 'Online community platform' },
    { year: '2023', event: '500+ Members', description: 'Community growth milestone' }
  ];

  return (
    <div className="about-page">
      {/* Modern Hero Section */}
      <section className="page-hero about-hero">
        {/* Animated Background Elements */}
        <div className="floating-elements">
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
        </div>

        <Container>
          <Row>
            <Col lg={8} className="mx-auto">
              <div className="hero-content-box">
                <h1 className={`hero-title ${getFontClass()}`}>
                  {t('aboutNalloreVattam')}
                </h1>
                <p className={`hero-subtitle ${getFontClass()}`}>
                  {t('aboutSubtitle')}
                </p>
                
                {/* About Info Preview */}
                <div className="contact-preview mt-4" >
                  <div className="contact-preview-item">
                    <i className="bi bi-people text-primary me-2"></i>
                    <span className={getFontClass()}>500+ Community Members</span>
                  </div>
                  <div className="contact-preview-item">
                    <i className="bi bi-award text-primary me-2"></i>
                    <span className={getFontClass()}>10+ Years of Service</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="section mission-vision-section"  style={{ marginTop: "20px" }}>
        <Container>
          <Row className="g-4">
            <Col lg={6}>
              <Card className="h-100 mission-card">
                <Card.Body className="p-4 text-center">
                  <div className="icon-wrapper mb-3">
                    <i className="bi bi-bullseye text-primary fs-1"></i>
                  </div>
                  <Card.Title className={`${getFontClass()} mb-3`}>
                    {t('ourMission')}
                  </Card.Title>
                  <Card.Text className={getFontClass()}>
                    {t('missionDescription')}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6}>
              <Card className="h-100 vision-card">
                <Card.Body className="p-4 text-center">
                  <div className="icon-wrapper mb-3">
                    <i className="bi bi-eye text-primary fs-1"></i>
                  </div>
                  <Card.Title className={`${getFontClass()} mb-3`}>
                    {t('ourVision')}
                  </Card.Title>
                  <Card.Text className={getFontClass()}>
                    {t('visionDescription')}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* History Timeline */}
      <section className="section timeline-section bg-light" style={{ marginTop: "20px" }}>
        <Container>
          <h2 className={`section-title text-center ${getFontClass()}`}>
            {t('ourJourney')}
          </h2>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-year">{milestone.year}</div>
                <div className="timeline-content">
                  <h5 className={getFontClass()}>{milestone.event}</h5>
                  <p className={`text-muted ${getFontClass()}`}>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <section className="section team-section">
        <Container>
          <h2 className={`section-title text-center ${getFontClass()}`}>
            {t('ourLeadershipTeam')}
          </h2>
          <Row className="g-4">
            {teamMembers.map((member, index) => (
              <Col lg={4} md={6} key={index}>
                <Card className="team-card text-center">
                  <Card.Img 
                    variant="top" 
                    src={member.image}
                    style={{ height: '250px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = '/images/FieldofAwareness/awareness_01.jpg';
                    }}
                  />
                  <Card.Body>
                    <Card.Title className={getFontClass()}>{member.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-primary">{member.role}</Card.Subtitle>
                    <Card.Text className={getFontClass()}>
                      {member.description}
                    </Card.Text>
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

export default About;