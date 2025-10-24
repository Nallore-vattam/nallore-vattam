import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useLanguage } from '../context/LanguageContext';

const Events = () => {
  const { currentLanguage, t } = useLanguage();

  const getFontClass = () => {
    switch(currentLanguage) {
      case 'ta': return 'tamil-font';
      case 'hi': return 'hindi-font';
      default: return 'english-font';
    }
  };

  const events = [
    { title: t('event1'), date: 'Jan 15, 2025', location: 'Community Hall' },
    { title: t('event2'),date: 'Feb 20, 2025', location: 'Health Center' },
    { title: t('event3'), date: 'Mar 10, 2025',location: 'School Campus' }
  ];

  return (
    <section id="events" className="section events-section">
      <Container>
        <h2 className={`section-title ${getFontClass()}`}>
          {t('eventsTitle')}
        </h2>
        <Row>
          {events.map((event, index) => (
            <Col lg={4} md={6} className="mb-4" key={index}>
              <Card className="event-card h-100">
                <Card.Body className="p-4">
                  <div className="event-date mb-3">
                    <span className="badge bg-primary">{event.date}</span>
                  </div>
                  <Card.Title className={getFontClass()}>
                    {event.title}
                  </Card.Title>
                  <Card.Text className={getFontClass()}>
                    <i className="bi bi-geo-alt me-2"></i>
                    {event.location}
                  </Card.Text>
                 
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Events;