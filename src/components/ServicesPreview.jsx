import React, { useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import { useLanguage } from "../context/LanguageContext";
import domainsData from "../components/mainjsons/Services.json";
import { useNavigate } from "react-router-dom";
import "./SolarSystemServices.css";

const ServicesPreview = () => {
  const { currentLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const getFontClass = () => {
    switch (currentLanguage) {
      case "ta":
        return "tamil-font";
      case "hi":
        return "hindi-font";
      default:
        return "english-font";
    }
  };

  const safeTranslate = (key, fallback = "") => {
    const translated = t(key);
    return translated && translated !== key ? translated : fallback;
  };

  useEffect(() => {
    const domains = document.querySelectorAll(".orbit-domain");
    const total = domains.length;
    const baseRadius = 220; // further out from center
    const radiusIncrement = 28;

    // even spacing for circular orbit positions
    const angles = Array.from({ length: total }, (_, i) => (i * 360) / total);

    const animate = () => {
      domains.forEach((domain, i) => {
        const radius = baseRadius + i * radiusIncrement;
        angles[i] += 0.0025 - i * 0.00005;
        const x = Math.cos(angles[i]) * radius;
        const y = Math.sin(angles[i]) * radius * 0.9; // slightly oval for natural motion
        domain.style.transform = `translate(${x}px, ${y}px)`;
      });
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  const handleDomainClick = (domain) => {
    navigate("/services");
  };

  return (
    <section id="services-preview" className="services-preview-section">
      <Container>
        {/* Particle Background */}
        <div className="particle-layer">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} className="particle" />
          ))}
        </div>

        <div className="orbit-container" ref={containerRef}>
          <div className="center-project-name">
            <div className="glow-backdrop"></div>
            <h2 className={`project-title ${getFontClass()}`}>
              {safeTranslate("projectName", "Nallore Vattam")}
            </h2>
          </div>

          {domainsData.domains.map((domain, index) => (
            <div
              key={index}
              className={`orbit-domain domain-${index}`}
              onClick={() => handleDomainClick(domain)}
            >
              <span className={`domain-pill ${getFontClass()}`}>
                {safeTranslate(domain.key, domain.title)}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ServicesPreview;
