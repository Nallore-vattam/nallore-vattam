import React, { useState } from 'react';
import { Carousel, Container } from 'react-bootstrap';

const SimpleImageCarousel = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  };

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + carouselItems.length) % carouselItems.length);
  };

  const carouselItems = [
    {
      image: "/images/contentsofweb/kalaamquotemain.jpg",
      bgColor: 'linear-gradient(135deg, #1e1b4b 0%, #3730a3 100%)'
    },
    {
      image: "/images/contentsofweb/domain10.jpg", 
      bgColor: 'linear-gradient(135deg, #3730a3 0%, #6366f1 100%)'
    },
    {
      image: "/images/contentsofweb/kalaamquotemain.jpg",
      bgColor: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
    },
    {
      image: "/images/contentsofweb/domain10.jpg",
      bgColor: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)'
    }
  ];

  return (
    <section 
      className="professional-carousel-section" 
      style={{ padding: '0', margin: '0' }}
      onClick={(e) => {
        // Get click position to determine left/right side
        const clickX = e.clientX;
        const windowWidth = window.innerWidth;
        const isLeftSide = clickX < windowWidth / 2;
        
        if (isLeftSide) {
          handlePrev();
        } else {
          handleNext();
        }
      }}
    >
      <Container fluid className="p-0 m-0">
        <Carousel 
          activeIndex={index} 
          onSelect={handleSelect} 
          interval={5000}
          controls={true}
          indicators={true}
          fade={true}
          className="professional-carousel m-0 p-0"
          prevIcon={
            <span 
              aria-hidden="true" 
              className="custom-carousel-control custom-prev"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
            >
              
            </span>
          }
          nextIcon={
            <span 
              aria-hidden="true" 
              className="custom-carousel-control custom-next"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
            >
              
            </span>
          }
        >
          {carouselItems.map((item, idx) => (
            <Carousel.Item key={idx} className="m-0 p-0">
              <div 
                className="carousel-item-container position-relative m-0 p-0"
                style={{
                  background: item.bgColor,
                  height: '45vh',
                  minHeight: '250px',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
              >
                {/* Background Overlay */}
                <div 
                  className="background-overlay m-0 p-0"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `
                      radial-gradient(circle at 20% 30%, rgba(30, 27, 75, 0.4) 0%, transparent 50%),
                      radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.3) 0%, transparent 50%),
                      radial-gradient(circle at 40% 80%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)
                    `,
                    zIndex: 1
                  }}
                />
                
                {/* Full Screen Image */}
                <div 
                  className="image-container position-absolute w-100 h-100 d-flex align-items-center justify-content-center m-0 p-0"
                  style={{
                    zIndex: 2
                  }}
                >
                  <img 
                    src={item.image}
                    alt={`Slide ${idx + 1}`}
                    className="carousel-image m-0 p-0"
                    style={{
                      width: 'auto',
                      height: 'auto',
                      maxWidth: '95%',
                      maxHeight: '95%',
                      objectFit: 'contain',
                      objectPosition: 'center',
                      filter: 'drop-shadow(0 8px 15px rgba(0,0,0,0.2))',
                      transition: 'all 0.5s ease'
                    }}
                    onError={(e) => {
                      e.target.src = "/images/placeholder.jpg";
                    }}
                  />
                </div>

                {/* Click area indicators (optional - for visual feedback) */}
                <div 
                  className="click-area-left position-absolute h-100"
                  style={{
                    width: '50%',
                    left: 0,
                    top: 0,
                    zIndex: 3,
                    cursor: 'pointer'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                />
                <div 
                  className="click-area-right position-absolute h-100"
                  style={{
                    width: '50%',
                    right: 0,
                    top: 0,
                    zIndex: 3,
                    cursor: 'pointer'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                />
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>

      <style jsx>{`
        .professional-carousel-section {
          background: var(--primary-color);
          overflow: hidden;
          margin: 0 !important;
          padding: 0 !important;
          line-height: 0 !important;
        }

        /* Remove all spacing from carousel elements */
        .professional-carousel,
        .professional-carousel .carousel-inner,
        .professional-carousel .carousel-item {
          height: 45vh !important;
          min-height: 250px !important;
          margin: 0 !important;
          padding: 0 !important;
          border: none !important;
          line-height: 0 !important;
        }

        .professional-carousel .carousel-inner {
          border-radius: 0 !important;
        }

        /* Transparent Control Buttons - No White Background */
        .professional-carousel .carousel-control-prev,
        .professional-carousel .carousel-control-next {
          width: 40px;
          height: 40px;
          background: transparent !important;
          border: none;
          border-radius: 50%;
          opacity: 1;
          top: 50%;
          transform: translateY(-50%);
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          z-index: 10;
          margin: 0 !important;
        }

        .professional-carousel .carousel-control-prev {
          left: 10px;
        }

        .professional-carousel .carousel-control-next {
          right: 10px;
        }

        /* Control icons - Transparent with white arrows */
        .professional-carousel .carousel-control-prev-icon,
        .professional-carousel .carousel-control-next-icon {
          background-image: none;
          width: auto;
          height: auto;
          margin: 0 !important;
          background: transparent !important;
        }

        .professional-carousel .carousel-control-prev-icon::before,
        .professional-carousel .carousel-control-next-icon::before {
          content: '';
          display: block;
          width: 12px;
          height: 12px;
          border: 2px solid rgba(255, 255, 255, 0.9);
          border-width: 2px 2px 0 0;
          transform: rotate(-135deg);
          transition: all 0.3s ease;
        }

        .professional-carousel .carousel-control-next-icon::before {
          transform: rotate(45deg);
        }

        /* Hover effects for controls */
        .professional-carousel .carousel-control-prev:hover,
        .professional-carousel .carousel-control-next:hover {
          background: rgba(255, 255, 255, 0.1) !important;
          transform: translateY(-50%) scale(1.1);
        }

        .professional-carousel .carousel-control-prev:hover .carousel-control-prev-icon::before,
        .professional-carousel .carousel-control-next:hover .carousel-control-next-icon::before {
          border-color: white;
          transform: rotate(-135deg) scale(1.2);
        }

        .professional-carousel .carousel-control-next:hover .carousel-control-next-icon::before {
          transform: rotate(45deg) scale(1.2);
        }

        /* Carousel Indicators */
        .professional-carousel .carousel-indicators {
          bottom: 10px;
          margin-bottom: 0 !important;
          padding: 0 !important;
          z-index: 10;
        }

        .professional-carousel .carousel-indicators button {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          margin: 0 3px !important;
          background-color: rgba(255, 255, 255, 0.6);
          border: none !important;
          transition: all 0.3s ease;
        }

        .professional-carousel .carousel-indicators button.active {
          background-color: white;
          transform: scale(1.2);
        }

        /* Click areas - invisible but functional */
        .click-area-left,
        .click-area-right {
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .click-area-left:hover,
        .click-area-right:hover {
          opacity: 0.1;
          background: rgba(255, 255, 255, 0.1);
        }

        /* Tablet - Medium screens */
        @media (min-width: 768px) {
          .professional-carousel,
          .professional-carousel .carousel-inner,
          .professional-carousel .carousel-item,
          .carousel-item-container {
            height: 50vh !important;
            min-height: 300px !important;
          }
        }

        /* Laptop - Large screens */
        @media (min-width: 992px) {
          .professional-carousel,
          .professional-carousel .carousel-inner,
          .professional-carousel .carousel-item,
          .carousel-item-container {
            height: 55vh !important;
            min-height: 350px !important;
          }

          .professional-carousel .carousel-control-prev,
          .professional-carousel .carousel-control-next {
            width: 45px;
            height: 45px;
          }

          .professional-carousel .carousel-control-prev {
            left: 15px;
          }

          .professional-carousel .carousel-control-next {
            right: 15px;
          }

          .professional-carousel .carousel-indicators {
            bottom: 15px;
          }

          .professional-carousel .carousel-indicators button {
            width: 8px;
            height: 8px;
          }
        }

        /* Large desktop screens */
        @media (min-width: 1200px) {
          .professional-carousel,
          .professional-carousel .carousel-inner,
          .professional-carousel .carousel-item,
          .carousel-item-container {
            height: 60vh !important;
            min-height: 400px !important;
          }
        }

        /* Remove all Bootstrap default spacing */
        .carousel-item-container {
          margin: 0 !important;
          padding: 0 !important;
          border: none !important;
        }

        .image-container {
          margin: 0 !important;
          padding: 0 !important;
        }

        .carousel-image {
          margin: 0 !important;
          padding: 0 !important;
          display: block !important;
        }

        /* Professional fade animation between slides */
        .professional-carousel .carousel-fade .carousel-item {
          opacity: 0;
          transition: opacity 0.8s ease-in-out;
        }

        .professional-carousel .carousel-fade .carousel-item.active {
          opacity: 1;
        }

        /* Ensure container has no spacing */
        .professional-carousel-section .container-fluid {
          margin: 0 !important;
          padding: 0 !important;
          max-width: 100% !important;
        }

        /* Remove any potential line-height issues */
        .professional-carousel * {
          line-height: 0 !important;
        }
      `}</style>
    </section>
  );
};

export default SimpleImageCarousel;