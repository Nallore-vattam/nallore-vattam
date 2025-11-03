import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Modal } from 'react-bootstrap';
import { useLanguage } from '../context/LanguageContext';
import './Events.css';

const Events = () => {
  const { currentLanguage, t } = useLanguage();
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const getFontClass = () => {
    switch(currentLanguage) {
      case 'ta': return 'tamil-font';
      case 'hi': return 'hindi-font';
      default: return 'english-font';
    }
  };

  const events = [
    { 
      id: 1,
      title: t('event1'), 
      date: '2025-01-15', 
      time: '10:00 AM - 4:00 PM',
      location: 'Community Hall',
      description: 'Annual cultural festival with traditional performances, food stalls, and community gatherings.',
      category: 'Cultural'
    },
    { 
      id: 2,
      title: t('event2'), 
      date: '2025-02-20', 
      time: '9:00 AM - 5:00 PM',
      location: 'Health Center',
      description: 'Free health checkups, medical consultations, and health awareness programs for the community.',
      category: 'Health'
    },
    { 
      id: 3,
      title: t('event3'), 
      date: '2025-03-10', 
      time: '2:00 PM - 6:00 PM',
      location: 'School Campus',
      description: 'Educational workshops focusing on career guidance, skill development, and academic excellence.',
      category: 'Education'
    }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleString('en', { month: 'short' }),
      year: date.getFullYear(),
      weekday: date.toLocaleString('en', { weekday: 'short' })
    };
  };

  const addToCalendar = (event) => {
    // Google Calendar URL
    const startDate = new Date(`${event.date}T${event.time.split(' - ')[0]}`);
    const endDate = new Date(`${event.date}T${event.time.split(' - ')[1]}`);
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}/${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    
    window.open(googleCalendarUrl, '_blank');
  };

  const requestNotificationPermission = (event) => {
    setSelectedEvent(event);
    
    if (!("Notification" in window)) {
      alert("This browser does not support notifications");
      return;
    }

    if (Notification.permission === "granted") {
      scheduleNotification(event);
    } else if (Notification.permission !== "denied") {
      setShowNotificationModal(true);
    }
  };

  const scheduleNotification = (event) => {
    if (!("Notification" in window)) return;

    const eventDate = new Date(`${event.date}T${event.time.split(' - ')[0]}`);
    const now = new Date();
    const timeUntilEvent = eventDate.getTime() - now.getTime();

    if (timeUntilEvent > 0) {
      // Schedule notification 1 hour before event
      setTimeout(() => {
        new Notification(`Upcoming Event: ${event.title}`, {
          body: `Starts at ${event.time} at ${event.location}`,
          icon: '/favicon.ico',
          tag: event.id
        });
      }, timeUntilEvent - (60 * 60 * 1000)); // 1 hour before

      // Immediate notification for testing
      new Notification(`Event Reminder Added: ${event.title}`, {
        body: `You'll be notified 1 hour before the event.`,
        icon: '/favicon.ico'
      });
    }
  };

  const handleNotificationPermission = (permission) => {
    setShowNotificationModal(false);
    if (permission && selectedEvent) {
      scheduleNotification(selectedEvent);
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Cultural': return '#e74c3c';
      case 'Health': return '#3498db';
      case 'Education': return '#2ecc71';
      default: return '#95a5a6';
    }
  };

  return (
    <>
      <section id="events" className="section events-section">
        <Container>
          <div className="text-center mb-5">
            <h2 className={`section-title ${getFontClass()} display-5 fw-bold`}>
              {t('eventsTitle')}
            </h2>
          </div>

          {/* Upcoming Events Preview */}
          <Row className="mt-5">
            <Col lg={12}>
              <Card className="upcoming-events-card border-0 shadow-sm">
                <Card.Body className="p-4">
                  <h4 className={`${getFontClass()} fw-bold mb-4`}>
                    <i className="bi bi-calendar-week me-2 text-primary"></i>
                    Upcoming Events Overview
                  </h4>
                  <Row className="g-3">
                    {events.map((event) => (
                      <Col lg={4} md={6} key={event.id}>
                        <div className="upcoming-event-item">
                          <div 
                            className="event-dot"
                            style={{ backgroundColor: getCategoryColor(event.category) }}
                          ></div>
                          <div className="upcoming-event-content">
                            <div className={`upcoming-event-title ${getFontClass()} fw-semibold`}>
                              {event.title}
                            </div>
                            <div className="upcoming-event-date text-muted small">
                              {formatDate(event.date).month} {formatDate(event.date).day}, {formatDate(event.date).year}
                            </div>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Notification Permission Modal */}
      <Modal show={showNotificationModal} onHide={() => setShowNotificationModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className={getFontClass()}>
            <i className="bi bi-bell me-2"></i>
            Enable Notifications
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <i className="bi bi-bell-fill text-primary display-4 mb-3"></i>
            <h5 className={getFontClass()}>Get event reminders</h5>
            <p className={`text-muted ${getFontClass()}`}>
              Allow notifications to receive reminders about upcoming events. 
              We'll notify you 1 hour before each event starts.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="outline-secondary" 
            onClick={() => handleNotificationPermission(false)}
          >
            Maybe Later
          </Button>
          <Button 
            variant="primary" 
            onClick={() => {
              Notification.requestPermission().then(permission => {
                handleNotificationPermission(permission === 'granted');
              });
            }}
          >
            Allow Notifications
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Events;