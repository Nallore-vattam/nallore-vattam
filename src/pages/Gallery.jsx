import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { useLanguage } from '../context/LanguageContext';

const Gallery = () => {
  const { currentLanguage, t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('all');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
    { id: 1, src: "/images/WomensField/womesn01.jpg", category: 'cultural', title: t('traditionalDance') },
    { id: 2, src: "/images/EnviromentalField/enviromental01.jpg", category: 'education', title: t('studentScholarship') },
    { id: 3, src: "/images/FieldofAwareness/awareness01.jpg", category: 'health', title: t('freeHealthCheckup') },
    { id: 4, src: "/images/FieldofBiology/biology01.jpg", category: 'community', title: t('communityMeeting') },
    { id: 5, src: "/images/GovtDomain/govt01.jpg", category: 'cultural', title: t('festivalCelebration') },
    { id: 6, src: "/images/SettingsDomain/settings01.jpg", category: 'education', title: t('computerTraining') },
    { id: 7, src: "/images/StudentField/students01.jpg", category: 'health', title: t('dentalCare') },
    { id: 8, src: "/images/VillageField/village01.jpg", category: 'community', title: t('youthSports') },
    { id: 9, src: "/images/WorldDomain/world01.jpg", category: 'cultural', title: t('musicProgram') },
    { id: 10, src: "/images/YouthField/youth01.jpg", category: 'education', title: t('libraryInauguration') },
    { id: 11, src: "/images/EnviromentalField/enviromental02.jpg", category: 'health', title: t('eyeTesting') },
    { id: 12, src: "/images/FieldofAwareness/awareness02.jpg", category: 'community', title: t('cleanlinessDrive') },
    { id: 13, src: "/images/FieldofAwareness/awareness03.jpg", category: 'cultural', title: t('artExhibition') },
    { id: 14, src: "/images/StudentField/students02.jpg", category: 'education', title: t('scienceFair') },
    { id: 15, src: "/images/VillageField/village02.jpg", category: 'health', title: t('bloodDonation') }
  ];

  const filteredImages = filter === 'all' ? images : images.filter(img => img.category === filter);

  // Handle modal navigation
  const handleNextImage = () => {
    if (filteredImages.length > 0) {
      const nextIndex = (currentImageIndex + 1) % filteredImages.length;
      setCurrentImageIndex(nextIndex);
      setSelectedImage(filteredImages[nextIndex]);
    }
  };

  const handlePrevImage = () => {
    if (filteredImages.length > 0) {
      const prevIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
      setCurrentImageIndex(prevIndex);
      setSelectedImage(filteredImages[prevIndex]);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      
      if (e.key === 'ArrowRight') {
        handleNextImage();
      } else if (e.key === 'ArrowLeft') {
        handlePrevImage();
      } else if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentImageIndex, filteredImages]);

  // Reset index when opening modal
  const handleImageClick = (image) => {
    const index = filteredImages.findIndex(img => img.id === image.id);
    setCurrentImageIndex(index);
    setSelectedImage(image);
  };

  return (
    <div className="gallery-page">
      {/* Modern Hero Section */}
      <section className="page-hero gallery-hero">
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
                  {t('photoGallery')}
                </h1>
                <p className={`hero-subtitle ${getFontClass()}`}>
                  {t('gallerySubtitle')}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Category Filters */}
      <section className="section gallery-filters-section bg-light" style={{ marginTop: "20px" }}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={10} className="text-center">
              <div className="filter-buttons">
                {categories.map(category => (
                 <Button
                  key={category.id}
                 className={`gallery-filter-btn me-2 mb-2 ${filter === category.id ? 'active' : 'btn-outline-primary-custom'}`}
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

      {/* Gallery Grid - 4 images per row on large devices */}
      <section className="section gallery-grid-section">
        <Container>
          <Row className="g-4">
            {filteredImages.map(image => (
              <Col xl={3} lg={4} md={6} key={image.id}> {/* Changed to xl={3} for 4 images per row */}
                <div 
                  className="gallery-item position-relative cursor-pointer"
                  onClick={() => handleImageClick(image)}
                >
                  <img 
                    src={image.src} 
                    alt={image.title}
                    className="img-fluid w-100 rounded-3"
                    style={{ height: '300px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = '/images/FieldofAwareness/awareness01.jpg';
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

      {/* Enhanced Image Modal with Navigation Arrows */}
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
        <Modal.Body className="text-center position-relative">
          {/* Previous Button */}
          {filteredImages.length > 1 && (
            <button 
              className="btn btn-primary position-absolute start-0 top-50 translate-middle-y"
              style={{ left: '10px', zIndex: 10 }}
              onClick={handlePrevImage}
            >
              ‹
            </button>
          )}
          
          {/* Main Image */}
          <img 
            src={selectedImage?.src} 
            alt={selectedImage?.title}
            className="img-fluid rounded-3"
            style={{ maxHeight: '70vh', objectFit: 'contain' }}
            onError={(e) => {
              e.target.src = '/images/FieldofAwareness/awareness01.jpg';
            }}
          />

          {/* Next Button */}
          {filteredImages.length > 1 && (
            <button 
              className="btn btn-primary position-absolute end-0 top-50 translate-middle-y"
              style={{ right: '10px', zIndex: 10 }}
              onClick={handleNextImage}
            >
              ›
            </button>
          )}
        </Modal.Body>
        <Modal.Footer>
          <small className="text-muted">
            {currentImageIndex + 1} of {filteredImages.length} - Category: {categories.find(cat => cat.id === selectedImage?.category)?.name}
          </small>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Gallery;