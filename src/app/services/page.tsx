"use client";

import React, { useEffect, useRef, useState } from "react";
import SubPageLayout from "@/components/SubPageLayout";
import { Service, fetchServices, services as initialServices } from "@/data/services";

export default function ServicesPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [servicesData, setServicesData] = useState<Service[]>(initialServices);
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    fetchServices().then(data => {
      if (data && data.length > 0) {
        setServicesData(data);
      }
    });

    import('@/utils/api').then(({ default: api }) => {
      api.get('/api/globals/services-page')
        .then(res => setPageData(res.data))
        .catch(console.error);
    });

    // Add same title wave animation trigger if needed
    const chars = document.querySelectorAll('.hover-char');
    chars.forEach((char) => {
      char.addEventListener('mouseenter', () => {
        char.classList.add('active');
        setTimeout(() => char.classList.remove('active'), 800);
      });
    });

    // Animate process cards on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.2 });

    const processCards = document.querySelectorAll('.process-card');
    processCards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const heroContent = (
    <>
      <h1 className="hero-main-title hover-title-wave services-hero-title" aria-label={pageData?.hero?.titleLine1 ? `${pageData.hero.titleLine1} ${pageData.hero.titleLine2}` : "Elevate Your Brand."}>
        <span className="hover-word">
          {(pageData?.hero?.titleLine1 || "Elevate Your").split("").map((char: string, i: number) => (
            <span key={i} className="hover-char" style={{ "--char-i": i } as React.CSSProperties}>{char === " " ? "\u00A0" : char}</span>
          ))}
        </span>
        <br />
        <span className="hover-word">
          {(pageData?.hero?.titleLine2 || "Brand.").split("").map((char: string, i: number) => (
            <span key={i} className="hover-char" style={{ "--char-i": i + 12 } as React.CSSProperties}>{char === " " ? "\u00A0" : char}</span>
          ))}
        </span>
      </h1>

      <p className="portfolio-hero-tagline">
        {pageData?.hero?.tagline || "From bold branding to scalable web development and data-driven marketing, we provide end-to-end digital solutions that drive real growth."}
      </p>

      {/* HERO FEATURED SHOWCASE IMAGE FRAME */}
      <div className="about-hero-image-frame portfolio-hero-frame">
        <img src="/services/webdev_h.png" alt="Featured Services Showcase" className="about-hero-img" />
        <div className="about-hero-badge">
          <span className="badge-num">{pageData?.hero?.badgeNumber || "8+"}</span>
          <span className="badge-txt">{pageData?.hero?.badgeText || "Core Digital Services"}</span>
        </div>
      </div>
    </>
  );

  return (
    <SubPageLayout heroContent={heroContent}>
      
      {/* INFINITE ANIMATED SERVICES TICKER */}
      <section className="services-marquee">
        <div className="marquee-track">
          {/* We duplicate the services list twice for the infinite loop effect */}
          {[...servicesData, ...servicesData].map((srv, idx) => (
            <div className="marquee-item" key={idx}>
              <svg className="marquee-spark" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
              </svg>
              <span className="marquee-text">{srv.title}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FLOATING PORTFOLIO STACK SECTION REUSED FOR SERVICES */}
      <section className="floating-portfolio-stack" style={{ paddingTop: '5rem' }}>
        <div className="section-header-center">
          <div className="eyebrow dark"><span className="dot"></span>{pageData?.listSection?.eyebrow || "Our Services"}</div>
          <h2 className="section-title">{pageData?.listSection?.title || "Comprehensive Digital Solutions."}</h2>
        </div>

        {/* FLOATING CARDS LIST WITH MOUSE-FOLLOWING CIRCULAR HOVER OVERLAY */}
        <div className="floating-projects-list" style={{ marginTop: '4rem' }}>
          {servicesData.map((srv, idx) => (
            <a
              href={`/services/${srv.slug}`}
              key={srv.id}
              className="floating-project-card"
              style={{ "--stack-idx": idx } as React.CSSProperties}
            >

              <div className="p-card-media">
                <img src={srv.image} alt={srv.title} />
                <span className="p-card-badge">{(idx + 1).toString().padStart(2, '0')}</span>
              </div>

              <div className="p-card-content">
                <h3>{srv.title}</h3>
                <p>{srv.shortDescription}</p>
                <div style={{ marginTop: '1rem' }}>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {srv.features.slice(0, 3).map((f, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--ink-soft)' }}>
                        <span style={{ display: 'block', width: '5px', height: '5px', borderRadius: '50%', background: 'var(--brand)' }}></span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card-text-cta">
                  <span>Explore Service</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ANIMATED PROCESS SECTION */}
      <section className="service-process-section">
        <div className="section-header-center">
          <div className="eyebrow dark"><span className="dot"></span>{pageData?.processSection?.eyebrow || "How We Work"}</div>
          <h2 className="section-title">{pageData?.processSection?.title || "Our Proven Process."}</h2>
        </div>
        <div className="process-grid">
          {(pageData?.processSection?.steps?.length > 0 ? pageData.processSection.steps : [
            { stepNumber: '01', title: 'Discovery & Strategy', description: 'We dive deep into your brand, market, and audience to build a foolproof blueprint.' },
            { stepNumber: '02', title: 'Design & Prototyping', description: 'Crafting visually stunning, user-centric interfaces that align with your business goals.' },
            { stepNumber: '03', title: 'Development & Build', description: 'Executing with scalable, modern technologies to ensure lightning-fast performance.' },
            { stepNumber: '04', title: 'Launch & Growth', description: 'Deploying your solution and leveraging data-driven marketing to scale your success.' }
          ]).map((p: any, i: number) => (
            <div className="process-card" key={i} style={{ transitionDelay: `${i * 150}ms` }}>
              <div className="p-step">{p.stepNumber}</div>
              <h4>{p.title}</h4>
              <p>{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INNOVATIVE CONTACT CALLOUT (LIKE ABOUT US PAGE) */}
      <section className="innovative-contact about-contact-callout" style={{ margin: '4rem 0' }}>
        <div className="innovative-contact-box" id="innovative-contact-box">
          <div className="inc-left">
            <div className="inc-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="none" />
              </svg>
            </div>
            <div className="inc-text">
              <h3>{pageData?.contactCallout?.title || "Ready to transform your brand into a digital powerhouse?"}</h3>
              <p>{pageData?.contactCallout?.description || "Connect with our creative strategists today and let's craft something unforgettable."}</p>
            </div>
          </div>
          <div className="inc-right">
            <a href={pageData?.contactCallout?.buttonUrl || "/contact-us"} className="inc-btn">{pageData?.contactCallout?.buttonText || "Get In Touch"}</a>
            <a href={pageData?.contactCallout?.buttonUrl || "/contact-us"} className="inc-arrow-btn" aria-label="Contact Us">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="19" x2="19" y2="5"></line>
                <polyline points="9 5 19 5 19 15"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </section>

      <style>{`
        .services-marquee {
        
          padding: 2.5rem 0;
          overflow: hidden;
     
          white-space: nowrap;
          display: flex;
          align-items: center;
          position: relative;
        }

        /* Fading edges for marquee */
        .services-marquee::before,
        .services-marquee::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          // width: 150px;
          z-index: 2;
          pointer-events: none;
        }
        .services-marquee::before {
          left: 0;
          // background: linear-gradient(to right, #f1f5f9, transparent);
        }
        .services-marquee::after {
          right: 0;
          // background: linear-gradient(to left, #f1f5f9, transparent);
        }

        .marquee-track {
          display: inline-flex;
          align-items: center;
          gap: 3.5rem;
          padding-left: 3.5rem;
          animation: marqueeScroll 45s linear infinite;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        .marquee-item {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .marquee-spark {
          color:gray; /* Claude Logo Orange */
          flex-shrink: 0;
          display: block;
          transform-origin: center;
          animation: spinSpark 6s linear infinite;
        }
        @keyframes spinSpark {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .marquee-text {
          font-size: 1.5rem;
          font-weight: 700;
          color: gray;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }

        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .service-process-section {
          padding: 5rem 2rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .process-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-top: 4rem;
        }

        .process-card {
          background: #fff;
          border: 1px solid var(--hairline);
          border-radius: var(--radius-card);
          padding: 2.5rem 2rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease;
        }

        .process-card.in-view {
          opacity: 1;
          transform: translateY(0);
        }

        .process-card:hover {
          box-shadow: 0 20px 40px rgba(15,47,99,0.08);
          transform: translateY(-5px);
        }

        .p-step {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--brand-light);
          opacity: 0.5;
          margin-bottom: 1rem;
          font-family: monospace;
        }

        .process-card h4 {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--brand-deep);
          margin-bottom: 1rem;
        }

        .process-card p {
          font-size: 0.95rem;
          color: var(--ink-soft);
          line-height: 1.6;
        }
      `}</style>
    </SubPageLayout>
  );
}
