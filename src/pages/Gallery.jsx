import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { useLanguage } from '../context/LanguageContext';
import domainsData from '../components/mainjsons/Services.json';

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

  // Get domains from Services.json for consistent categories
  const domains = domainsData.domains.map(domain => ({
    id: domain.key,
    name: t(domain.key) || domain.title,
    icon: domain.icon
  }));

  // Add "all" category
  const categories = [
    { id: 'all', name: t('allPhotos') || 'All Photos' },
    ...domains
  ];

  // Safe translation function
  const safeTranslate = (key, fallback = '') => {
    const translated = t(key);
    return translated && translated !== key ? translated : fallback;
  };

  // Updated image paths mapped to domain categories using exact keys from Services.json
  const images = [
    { id: 1, src: "/images/WomensField/womesn01.jpg", category: 'womensDomain', title: safeTranslate('womensEmpowerment', 'Women Empowerment Program') },
    { id: 2, src: "/images/EnviromentalField/enviromental01.jpg", category: 'environmentalDomain', title: safeTranslate('environmentalProtection', 'Environmental Protection Initiative') },
    { id: 3, src: "/images/FieldofAwareness/awareness01.jpg", category: 'awarenessDomain', title: safeTranslate('publicAwareness', 'Public Awareness Campaign') },
    { id: 4, src: "/images/FieldofBiology/biology01.jpg", category: 'domainOfBiology', title: safeTranslate('agriculturalResearch', 'Agricultural Research Program') },
    { id: 5, src: "/images/GovtDomain/govt01.jpg", category: 'governmentDomain', title: safeTranslate('publicServices', 'Public Services Outreach') },
    { id: 6, src: "/images/SettingsDomain/settings01.jpg", category: 'settingsDomain', title: safeTranslate('technicalSupport', 'Technical Support Session') },
    { id: 7, src: "/images/StudentField/students01.jpg", category: 'studentDomain', title: safeTranslate('educationalSupport', 'Educational Support Program') },
    { id: 8, src: "/images/VillageField/village01.jpg", category: 'villageDomain', title: safeTranslate('communityDevelopment', 'Community Development Project') },
    { id: 9, src: "/images/WorldDomain/world01.jpg", category: 'worldDomain', title: safeTranslate('globalPartnerships', 'Global Partnerships Event') },
    { id: 10, src: "/images/YouthField/youth01.jpg", category: 'youthDomain', title: safeTranslate('youthLeadership', 'Youth Leadership Program') },
    { id: 11, src: "/images/EnviromentalField/enviromental02.jpg", category: 'environmentalDomain', title: safeTranslate('cleanEnergy', 'Clean Energy Initiative') },
    { id: 12, src: "/images/FieldofAwareness/awareness02.jpg", category: 'awarenessDomain', title: safeTranslate('educationalCampaigns', 'Educational Campaign Workshop') },
    { id: 13, src: "/images/FieldofAwareness/awareness03.jpg", category: 'awarenessDomain', title: safeTranslate('communityWorkshops', 'Community Workshop Session') },
    { id: 14, src: "/images/StudentField/students02.jpg", category: 'studentDomain', title: safeTranslate('careerCounseling', 'Career Counseling Session') },
    { id: 15, src: "/images/VillageField/village02.jpg", category: 'villageDomain', title: safeTranslate('ruralWelfare', 'Rural Welfare Program') }
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
                 {category.icon && <span className="me-1">{category.icon}</span>}
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
              <Col xl={3} lg={4} md={6} key={image.id}>
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
      {/* Enhanced Image Modal with Navigation Arrows */}
<Modal 
  show={!!selectedImage} 
  onHide={() => setSelectedImage(null)} 
  size="lg" 
  centered
  className="gallery-modal"
>
  <Modal.Header closeButton className="border-0 pb-0">
    <Modal.Title className={`${getFontClass()} fs-6`}>
      {selectedImage?.title}
    </Modal.Title>
  </Modal.Header>
  <Modal.Body className="text-center position-relative p-0">
    {/* Previous Button */}
    {filteredImages.length > 1 && (
      <button 
        className="btn btn-primary position-absolute start-0 top-50 translate-middle-y rounded-circle d-flex align-items-center justify-content-center"
        style={{ 
          left: '5px', 
          zIndex: 10,
          width: '40px',
          height: '40px',
          fontSize: '16px',
          fontWeight: 'bold'
        }}
        onClick={handlePrevImage}
      >
        ‹
      </button>
    )}
    
    {/* Main Image */}
    <div className="modal-image-container p-3">
      <img 
        src={selectedImage?.src} 
        alt={selectedImage?.title}
        className="img-fluid rounded-3"
        style={{ 
          maxHeight: '60vh', 
          width: '100%',
          objectFit: 'contain' 
        }}
        onError={(e) => {
          e.target.src = '/images/FieldofAwareness/awareness01.jpg';
        }}
      />
    </div>

    {/* Next Button */}
    {filteredImages.length > 1 && (
      <button 
        className="btn btn-primary position-absolute end-0 top-50 translate-middle-y rounded-circle d-flex align-items-center justify-content-center"
        style={{ 
          right: '5px', 
          zIndex: 10,
          width: '40px',
          height: '40px',
          fontSize: '16px',
          fontWeight: 'bold'
        }}
        onClick={handleNextImage}
      >
        ›
      </button>
    )}
  </Modal.Body>
  <Modal.Footer className="border-0 pt-0">
    <small className={`text-muted ${getFontClass()}`}>
      {currentImageIndex + 1} of {filteredImages.length} - Domain: {categories.find(cat => cat.id === selectedImage?.category)?.name}
    </small>
  </Modal.Footer>
</Modal>
    </div>
  );
};

export default Gallery;