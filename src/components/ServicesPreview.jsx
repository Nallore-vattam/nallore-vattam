import React, { useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import domainsData from "../components/mainjsons/Services.json";
import { useNavigate } from "react-router-dom";
import "./PreviewServices.css";

const ServicesPreview = () => {
  const { currentLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);
  const orbitsRef = useRef([]);

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

  const safeTranslate = (key, fallback) => {
    const translated = t ? t(key) : null;
    return translated && translated !== key ? translated : fallback;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const domains = Array.from(container.querySelectorAll(".orbit-domain"));
    const glow = container.querySelector(".glow-backdrop");

    // ONE horizontal oval path for ALL domains
    const radiusX = 250; // Horizontal radius (wide)
    const radiusY = 80;  // Vertical radius (short)
    const baseLinearSpeed = 0.03;

    const getCenter = () => ({
      cx: container.offsetWidth / 2,
      cy: container.offsetHeight / 2,
    });

    const computeClearance = () => {
      if (!glow) return 0;
      const rect = glow.getBoundingClientRect();
      return Math.max(rect.width, rect.height) / 2 + 20;
    };

    const clearance = computeClearance();

    // Calculate equal spacing between domains on the SAME path
    const domainCount = domains.length;
    const angleStep = (2 * Math.PI) / domainCount;

    // Same angular speed for all domains
    const avgRadius = (radiusX + radiusY) / 2;
    const commonAngularSpeed = baseLinearSpeed / avgRadius;

    // ALL domains on the SAME oval path
    const orbits = domains.map((_, i) => {
      const startAngle = i * angleStep; // Equal spacing around the oval
      
      return {
        radiusX: radiusX + clearance, // SAME for all
        radiusY: radiusY + clearance, // SAME for all
        angle: startAngle,
        direction: 1,
        angularSpeed: commonAngularSpeed, // SAME for all
      };
    });

    orbitsRef.current = orbits;

    const placeInitial = () => {
      const { cx, cy } = getCenter();
      for (let i = 0; i < domains.length; i++) {
        const orbit = orbits[i];
        const x = cx + Math.cos(orbit.angle) * orbit.radiusX;
        const y = cy + Math.sin(orbit.angle) * orbit.radiusY;
        const el = domains[i];
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
      }
    };

    placeInitial();

    const animate = (time) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const dt = Math.min(40, time - lastTimeRef.current);
      lastTimeRef.current = time;

      const { cx, cy } = getCenter();

      for (let i = 0; i < domains.length; i++) {
        const orbit = orbitsRef.current[i];
        orbit.angle += orbit.direction * orbit.angularSpeed * dt;

        const x = cx + Math.cos(orbit.angle) * orbit.radiusX;
        const y = cy + Math.sin(orbit.angle) * orbit.radiusY;

        const el = domains[i];
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      const newClearance = computeClearance();
      const avgRadius = (radiusX + radiusY) / 2;
      const commonAngularSpeed = baseLinearSpeed / avgRadius;
      
      orbitsRef.current.forEach((orbit) => {
        orbit.radiusX = radiusX + newClearance; // SAME for all
        orbit.radiusY = radiusY + newClearance; // SAME for all
        orbit.angularSpeed = commonAngularSpeed; // SAME for all
      });
      placeInitial();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
      lastTimeRef.current = null;
    };
  }, [t, currentLanguage]);

  // Navigate to individual domain page
  const handleDomainClick = (domain) => {
    // Navigate to individual domain page using the domain key
    // This matches your Services.jsx routing: /services/${service.key}
    navigate(`/services/${domain.key}`);
  };

  return (
    <section id="services-preview" className="services-preview-section">
      <div className="orbit-system" ref={containerRef}>
        <div className="center-project-name">
          <div className="glow-backdrop"></div>
         <img 
  src="/images/contentsofweb/logo-5q8siOY4.jpeg" 
  alt={safeTranslate("projectName", "Nallore Vattam")} 
  className="servicepre-logo"
/>
        </div>

        {domainsData.domains.map((domain, i) => (
          <div
            key={i}
            className={`orbit-domain domain-${i}`}
            onClick={() => handleDomainClick(domain)}
            aria-label={domain.title || domain.key}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleDomainClick(domain);
            }}
          >
            <span className={`domain-pill ${getFontClass()}`}>
              {safeTranslate(domain.key, domain.title)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesPreview;