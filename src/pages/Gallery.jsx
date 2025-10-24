import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { useLanguage } from '../context/LanguageContext';

const Gallery = () => {
  const { currentLanguage, t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('all');
  const [videoError, setVideoError] = useState(false);

  const getFontClass = () => {
    switch(currentLanguage) {
      case 'ta': return 'tamil-font';
      case 'hi': return 'hindi-font';
      default: return 'english-font';
    }
  };

  const categories = [
    { id: 'all', name: t('allPhotos') },
    { id: 'cultural', name: t('culturalEvents') },
    { id: 'education', name: t('education') },
    { id: 'health', name: t('healthCamps') },
    { id: 'community', name: t('community') }
  ];

  // Updated image paths for public folder
  const images = [
    { id: 1, src: "/images/WomensField/womesn_01.jpg", category: 'cultural', title: t('traditionalDance') },
    { id: 2, src: "/images/EnviromentalField/enviromental_01.jpg", category: 'education', title: t('studentScholarship') },
    { id: 3, src: "/images/FieldofAwareness/awareness_01.jpg", category: 'health', title: t('freeHealthCheckup') },
    { id: 4, src: "/images/FieldofBiology/biology_01.jpg", category: 'community', title: t('communityMeeting') },
    { id: 5, src: "/images/GovtDomain/govt_01.jpg", category: 'cultural', title: t('festivalCelebration') },
    { id: 6, src: "/images/SettingsDomain/settings_01.jpg", category: 'education', title: t('computerTraining') },
    { id: 7, src: "/images/StudentField/students_01.jpg", category: 'health', title: t('dentalCare') },
    { id: 8, src: "/images/VillageField/village_01.jpg", category: 'community', title: t('youthSports') },
    { id: 9, src: "/images/WorldDomain/world_01.jpg", category: 'cultural', title: t('musicProgram') },
    { id: 10, src: "/images/YouthField/youth_01.jpg", category: 'education', title: t('libraryInauguration') },
    { id: 11, src: "/images/EnviromentalField/enviromental_02.jpg", category: 'health', title: t('eyeTesting') },
    { id: 12, src: "/images/FieldofAwareness/awareness_02.jpg", category: 'community', title: t('cleanlinessDrive') }
  ];

  const filteredImages = filter === 'all' ? images : images.filter(img => img.category === filter);

  return (
    <div className="gallery-page">
      {/* Premium Hero Section */}
      <section className="premium-hero">
        {/* Video Background with Fallback */}
        {!videoError ? (
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="hero-video-bg"
            onError={() => setVideoError(true)}
            poster="/images/Enviromental Field/enviromental_01.jpg"
          >
            <source src="/videos/hero-background.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div 
            className="hero-fallback-bg"
            style={{
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("/images/Enviromental Field/enviromental_01.jpg")',
            }}
          />
        )}
        
        {/* Animated Particles */}
        <div className="particles-container">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i}
              className="particle"
              style={{
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>

        <Container>
          <Row>
            <Col lg={8} className="mx-auto">
              <div className="premium-content-box">
                <h1 className={`premium-hero-title ${getFontClass()}`}>
                  {t('photoGallery')}
                </h1>
                <p className={`premium-hero-subtitle ${getFontClass()}`}>
                  {t('gallerySubtitle')}
                </p>
                <div className="hero-stats">
                  <div className="stat-item">
                    <span className="stat-number">{images.length}+</span>
                    <span className="stat-label">Photos</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">{categories.length - 1}</span>
                    <span className="stat-label">Categories</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Category Filters */}
      <section className="section gallery-filters-section bg-light" style={{ marginTop: "20px" }}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <h3 className={`section-subtitle mb-4 ${getFontClass()}`}>
                Filter by Category
              </h3>
              <div className="filter-buttons">
                {categories.map(category => (
                  <Button
                    key={category.id}
                    variant={filter === category.id ? 'primary' : 'outline-primary'}
                    className="me-2 mb-2"
                    onClick={() => setFilter(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Gallery Grid */}
      <section className="section gallery-grid-section">
        <Container>
          <Row className="g-4">
            {filteredImages.map(image => (
              <Col lg={4} md={6} key={image.id}>
                <div 
                  className="gallery-item position-relative cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <img 
                    src={image.src} 
                    alt={image.title}
                    className="img-fluid w-100 rounded-3"
                    style={{ height: '300px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = '/images/FieldofAwareness/awareness_01.jpg'; // Fallback image
                    }}
                  />
                  <div className="gallery-item-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-end p-3 rounded-3">
                    <div className="overlay-content text-white">
                      <h6 className="mb-0">{image.title}</h6>
                      <small className="category-badge">
                        {categories.find(cat => cat.id === image.category)?.name}
                      </small>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Image Modal */}
      <Modal 
        show={!!selectedImage} 
        onHide={() => setSelectedImage(null)} 
        size="lg" 
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className={getFontClass()}>
            {selectedImage?.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img 
            src={selectedImage?.src} 
            alt={selectedImage?.title}
            className="img-fluid rounded-3"
            style={{ maxHeight: '70vh', objectFit: 'contain' }}
            onError={(e) => {
              e.target.src = '/images/FieldofAwareness/awareness_01.jpg'; // Fallback image
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <small className="text-muted">
            Category: {categories.find(cat => cat.id === selectedImage?.category)?.name}
          </small>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Gallery;