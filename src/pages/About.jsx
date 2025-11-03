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
      role: t('president'),
      image: '/images/Enviromental Field/enviromental01.jpg',
      description: t('presidentDesc')
    },
    {
      name: 'Aditya',
      role: t('secretary'),
      image: '/images/FieldofBiology/biology01.jpg',
      description: t('secretaryDesc')
    },
    {
      name: 'Madhav',
      role: t('treasurer'),
      image: '/images/VillageField/village01.jpg',
      description: t('treasurerDesc')
    }
  ];

  const milestones = [
    { 
      year: '2014', 
      event: t('organizationFounded'), 
      description: t('startedWith50Members'),
      icon: '🏛️',
      color: 'primary'
    },
    { 
      year: '2016', 
      event: t('firstCommunityCenter'), 
      description: t('establishedPermanentSpace'),
      icon: '🏠',
      color: 'success'
    },
    { 
      year: '2018', 
      event: t('educationProgramLaunch'), 
      description: t('scholarshipsForStudents'),
      icon: '🎓',
      color: 'info'
    },
    { 
      year: '2020', 
      event: t('digitalTransformation'), 
      description: t('onlineCommunityPlatform'),
      icon: '💻',
      color: 'warning'
    },
    { 
      year: '2023', 
      event: t('members500'), 
      description: t('communityGrowthMilestone'),
      icon: '👥',
      color: 'danger'
    }
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
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="section mission-vision-section" style={{ marginTop: "20px" }}>
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

      {/* History Timeline - Updated to Card Style */}
      <section className="section milestones-section" style={{ padding: '60px 0' }}>
        <Container>
          <h2 className={`section-title text-center mb-5 ${getFontClass()}`}>
            {t('ourJourney')}
          </h2>
          <Row className="g-4">
            {milestones.map((milestone, index) => (
              <Col lg={4} md={6} key={index}>
                <Card 
                  className={`milestone-card h-100 border-${milestone.color} shadow-sm`}
                  style={{ 
                    borderTop: `4px solid var(--bs-${milestone.color})`,
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }}
                >
                  <Card.Body className="text-center p-4">
                    {/* Year Badge */}
                    <div 
                      className={`milestone-year-badge bg-${milestone.color} text-white rounded-pill mb-3 mx-auto`}
                      style={{ 
                        width: '80px', 
                        height: '80px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        fontWeight: 'bold'
                      }}
                    >
                      {milestone.year}
                    </div>

                    {/* Icon */}
                    <div className="milestone-icon mb-3" style={{ fontSize: '3rem' }}>
                      {milestone.icon}
                    </div>

                    {/* Content */}
                    <Card.Title className={`${getFontClass()} h5 mb-3`}>
                      {milestone.event}
                    </Card.Title>
                    <Card.Text className={`${getFontClass()} text-muted`}>
                      {milestone.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Team Section */}
      <section className="section team-section bg-light">
        <Container>
          <h2 className={`section-title text-center ${getFontClass()}`}>
            {t('ourLeadershipTeam')}
          </h2>
          <Row className="g-4">
            {teamMembers.map((member, index) => (
              <Col lg={4} md={6} key={index}>
                <Card className="team-card text-center h-100">
                  <Card.Img 
                    variant="top" 
                    src={member.image}
                    style={{ height: '250px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = '/images/FieldofAwareness/awareness01.jpg';
                    }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className={getFontClass()}>{member.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-primary">{member.role}</Card.Subtitle>
                    <Card.Text className={`${getFontClass()} flex-grow-1`}>
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