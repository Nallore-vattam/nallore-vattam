import React, { useState } from 'react';
import { Carousel, Container } from 'react-bootstrap';

const SimpleImageCarousel = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
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
    <section className="professional-carousel-section">
      <Container fluid className="p-0">
        <Carousel 
          activeIndex={index} 
          onSelect={handleSelect} 
          interval={5000}
          controls={true}
          indicators={true}
          fade={true}
          className="professional-carousel"
          prevIcon={
            <span 
              aria-hidden="true" 
              className="custom-carousel-control custom-prev"
            >
              ‹
            </span>
          }
          nextIcon={
            <span 
              aria-hidden="true" 
              className="custom-carousel-control custom-next"
            >
              ›
            </span>
          }
        >
          {carouselItems.map((item, idx) => (
            <Carousel.Item key={idx}>
              <div 
                className="carousel-item-container position-relative"
                style={{
                  background: item.bgColor,
                  height: '100vh',
                  minHeight: '600px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Background Overlay */}
                <div 
                  className="background-overlay"
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
                  className="image-container position-absolute w-100 h-100 d-flex align-items-center justify-content-center"
                  style={{
                    zIndex: 2,
                    padding: 'clamp(1rem, 5vw, 4rem)'
                  }}
                >
                  <img 
                    src={item.image}
                    alt={`Slide ${idx + 1}`}
                    className="carousel-image"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      objectPosition: 'center',
                      maxWidth: '100%',
                      maxHeight: '100%',
                      filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.3))',
                      transition: 'all 0.5s ease'
                    }}
                    onError={(e) => {
                      e.target.src = "/images/placeholder.jpg";
                    }}
                  />
                </div>

                {/* Subtle Border Effect */}
                <div 
                  className="border-effect"
                  style={{
                    position: 'absolute',
                    top: '2rem',
                    left: '2rem',
                    right: '2rem',
                    bottom: '2rem',
                    border: '2px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    zIndex: 3,
                    pointerEvents: 'none'
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
        }

        /* Full viewport carousel */
        .professional-carousel,
        .professional-carousel .carousel-inner,
        .professional-carousel .carousel-item {
          height: 100vh;
          min-height: 600px;
        }

        /* Smaller Carousel Controls */
        .professional-carousel .carousel-control-prev,
        .professional-carousel .carousel-control-next {
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.92);
          border: none;
          border-radius: 50%;
          opacity: 1;
          top: 50%;
          transform: translateY(-50%);
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          backdrop-filter: blur(15px);
          box-shadow: 
            0 8px 25px rgba(0,0,0,0.15),
            0 0 0 1px rgba(255,255,255,0.2);
          z-index: 10;
        }

        .professional-carousel .carousel-control-prev {
          left: 2%;
        }

        .professional-carousel .carousel-control-next {
          right: 2%;
        }

        /* Hover effects for controls */
        .professional-carousel .carousel-control-prev:hover,
        .professional-carousel .carousel-control-next:hover {
          background: white;
          transform: translateY(-50%) scale(1.1);
          box-shadow: 
            0 12px 30px rgba(0,0,0,0.2),
            0 0 0 2px rgba(255,255,255,0.4);
        }

        /* Control icons */
        .professional-carousel .carousel-control-prev-icon,
        .professional-carousel .carousel-control-next-icon {
          background-image: none;
          width: auto;
          height: auto;
        }

        .professional-carousel .carousel-control-prev-icon::before,
        .professional-carousel .carousel-control-next-icon::before {
          content: '';
          display: block;
          width: 12px;
          height: 12px;
          border: 2px solid var(--primary-color);
          border-width: 2px 2px 0 0;
          transform: rotate(-135deg);
          transition: all 0.3s ease;
        }

        .professional-carousel .carousel-control-next-icon::before {
          transform: rotate(45deg);
        }

        .professional-carousel .carousel-control-prev:hover .carousel-control-prev-icon::before,
        .professional-carousel .carousel-control-next:hover .carousel-control-next-icon::before {
          border-color: var(--accent-color);
          transform: rotate(-135deg) scale(1.1);
        }

        .professional-carousel .carousel-control-next:hover .carousel-control-next-icon::before {
          transform: rotate(45deg) scale(1.1);
        }

        /* Smaller Carousel Indicators */
        .professional-carousel .carousel-indicators {
          bottom: 25px;
          margin-bottom: 0;
          z-index: 10;
        }

        .professional-carousel .carousel-indicators button {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin: 0 6px;
          background-color: rgba(255, 255, 255, 0.5);
          border: 2px solid transparent;
          transition: all 0.3s ease;
          position: relative;
        }

        .professional-carousel .carousel-indicators button::before {
          content: '';
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transition: all 0.3s ease;
          opacity: 0;
        }

        .professional-carousel .carousel-indicators button.active {
          background-color: white;
          transform: scale(1.2);
        }

        .professional-carousel .carousel-indicators button.active::before {
          opacity: 1;
          border-color: rgba(255, 255, 255, 0.6);
        }

        .professional-carousel .carousel-indicators button:hover:not(.active) {
          background-color: rgba(255, 255, 255, 0.7);
          transform: scale(1.1);
        }

        /* Image hover effects */
        .carousel-item-container:hover .carousel-image {
          transform: scale(1.02);
          filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.4))';
        }

        /* Smooth transitions */
        .professional-carousel .carousel-item {
          transition: transform 0.8s ease-in-out;
        }

        /* Loading animation */
        @keyframes imageReveal {
          from {
            opacity: 0;
            transform: scale(1.05);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .carousel-item.active .carousel-image {
          animation: imageReveal 1.2s ease-out;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .professional-carousel,
          .professional-carousel .carousel-inner,
          .professional-carousel .carousel-item,
          .carousel-item-container {
            height: 80vh;
            min-height: 500px;
          }

          .professional-carousel .carousel-control-prev,
          .professional-carousel .carousel-control-next {
            width: 40px;
            height: 40px;
          }

          .professional-carousel .carousel-control-prev {
            left: 1.5%;
          }

          .professional-carousel .carousel-control-next {
            right: 1.5%;
          }

          .professional-carousel .carousel-indicators {
            bottom: 20px;
          }

          .professional-carousel .carousel-indicators button {
            width: 6px;
            height: 6px;
            margin: 0 5px;
          }

          .image-container {
            padding: 1.5rem !important;
          }

          /* Smaller arrow icons on mobile */
          .professional-carousel .carousel-control-prev-icon::before,
          .professional-carousel .carousel-control-next-icon::before {
            width: 10px;
            height: 10px;
          }
        }

        @media (max-width: 576px) {
          .professional-carousel,
          .professional-carousel .carousel-inner,
          .professional-carousel .carousel-item,
          .carousel-item-container {
            height: 70vh;
            min-height: 400px;
          }

          .professional-carousel .carousel-control-prev,
          .professional-carousel .carousel-control-next {
            width: 35px;
            height: 35px;
          }

          .professional-carousel .carousel-indicators {
            bottom: 15px;
          }

          .professional-carousel .carousel-indicators button {
            width: 5px;
            height: 5px;
            margin: 0 4px;
          }

          .image-container {
            padding: 1rem !important;
          }

          .border-effect {
            top: 1rem !important;
            left: 1rem !important;
            right: 1rem !important;
            bottom: 1rem !important;
          }

          /* Even smaller arrow icons on small mobile */
          .professional-carousel .carousel-control-prev-icon::before,
          .professional-carousel .carousel-control-next-icon::before {
            width: 8px;
            height: 8px;
          }
        }

        /* Large screens */
        @media (min-width: 1400px) {
          .professional-carousel .carousel-control-prev {
            left: 3%;
          }

          .professional-carousel .carousel-control-next {
            right: 3%;
          }

          .professional-carousel .carousel-control-prev,
          .professional-carousel .carousel-control-next {
            width: 55px;
            height: 55px;
          }
        }

        /* Extra large screens */
        @media (min-width: 1920px) {
          .professional-carousel,
          .professional-carousel .carousel-inner,
          .professional-carousel .carousel-item,
          .carousel-item-container {
            height: 100vh;
            min-height: 800px;
          }
        }

        /* Ensure no horizontal scroll */
        .professional-carousel-section .container-fluid {
          margin: 0;
          max-width: 100%;
        }

        /* Professional fade animation between slides */
        .professional-carousel .carousel-fade .carousel-item {
          opacity: 0;
          transition: opacity 0.8s ease-in-out;
        }

        .professional-carousel .carousel-fade .carousel-item.active {
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default SimpleImageCarousel;