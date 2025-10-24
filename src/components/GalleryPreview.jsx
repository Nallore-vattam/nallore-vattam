import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useLanguage } from '../context/LanguageContext';

// Simplified Image component - remove BASE_URL since we're using absolute paths
const ImageWithFallback = ({ src, alt, className, style, fallback }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={(e) => {
        e.target.onerror = null; // prevent infinite loop
        e.target.src = fallback;
      }}
    />
  );
};

const GalleryPreview = () => {
  const { currentLanguage, t, setCurrentPage } = useLanguage();

  const getFontClass = () => {
    switch(currentLanguage) {
      case 'ta': return 'tamil-font';
      case 'hi': return 'hindi-font';
      default: return 'english-font';
    }
  };

  // Image paths as stored in public/images/... (spaces are fine)
  const previewImages = [
    {
      src: "/images/FieldofAwareness/awareness_01.jpg",
      category: "Cultural Events",
      count: "25 Photos"
    },
    {
      src: "/images/Enviromental Field/enviromental_02.jpg",
      category: "Community Programs",
      count: "18 Photos"
    },
    {
      src: "/images/FieldofBiology/biology_01.jpg",
      category: "Educational Activities",
      count: "32 Photos"
    },
    {
      src: "/images/GovtDomain/govt_01.jpg",
      category: "Health Camps",
      count: "15 Photos"
    }
  ];

  const handleViewGallery = () => {
    setCurrentPage('gallery');
  };

  return (
    <section id="gallery-preview" className="section gallery-preview-section">
      <Container>
        <Row className="text-center mb-5">
          <Col lg={8} className="mx-auto">
            <h2 className={`section-title ${getFontClass()}`}>
              {t('galleryTitle')}
            </h2>
            <p className={`lead ${getFontClass()}`}>
              Capturing moments of community growth, cultural celebrations, and meaningful interactions
            </p>
          </Col>
        </Row>

        <Row>
          {previewImages.map((image, index) => (
            <Col lg={3} md={6} className="mb-4" key={index}>
              <div className="gallery-preview-item position-relative">
                <ImageWithFallback
                  src={image.src}
                  alt={image.category}
                  className="img-fluid w-100 rounded-3"
                  style={{ height: '250px', objectFit: 'cover' }}
                  fallback="/images/FieldofAwareness/awareness_01.jpg"
                />
                <div className="gallery-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-end p-3 rounded-3">
                  <div className="overlay-content text-white">
                    <h6 className="mb-1">{image.category}</h6>
                    <small>{image.count}</small>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        <Row className="mt-4">
          <Col className="text-center">
            <Button 
              variant="primary" 
              size="lg"
              onClick={handleViewGallery}
            >
              View Full Gallery
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default GalleryPreview;