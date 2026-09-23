"use client";

import React, { use, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { Service, fetchServiceBySlug } from "@/data/services";
import SubPageLayout from "@/components/SubPageLayout";
import WorkflowProcess from "@/components/WorkflowProcess";

import imgOnboarding from "@/assets/workflow/step1_onboarding_1784997163019.png";
import imgSrcriping from "@/assets/workflow/step2_strategy_1784997174263.png";
import imgDesign from "@/assets/workflow/step3_design_1784997183957.png";
import imgDevelopment from "@/assets/workflow/step4_development_1784997194952.png";
import imgDelivery from "@/assets/workflow/step5_delivery_1784997206352.png";

export default function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [service, setService] = useState<Service | null | undefined>(undefined);

  useEffect(() => {
    fetchServiceBySlug(slug).then(data => {
      setService(data);
    });

    // Add wave animation trigger
    const chars = document.querySelectorAll('.hover-char');
    chars.forEach((char) => {
      char.addEventListener('mouseenter', () => {
        char.classList.add('active');
        setTimeout(() => char.classList.remove('active'), 800);
      });
    });
  }, [slug]);

  if (service === undefined) {
    const skeletonHero = (
      <>
        <div style={{ width: '120px', height: '24px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginBottom: '1.5rem', animation: 'pulse 1.5s infinite ease-in-out' }} />
        <div style={{ width: '60%', height: '64px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', marginBottom: '1rem', animation: 'pulse 1.5s infinite ease-in-out' }} />
        <div style={{ width: '40%', height: '64px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', marginBottom: '2rem', animation: 'pulse 1.5s infinite ease-in-out' }} />
        <div style={{ width: '80%', height: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginBottom: '0.5rem', animation: 'pulse 1.5s infinite ease-in-out' }} />
        <div style={{ width: '70%', height: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginBottom: '3rem', animation: 'pulse 1.5s infinite ease-in-out' }} />
        <div className="about-hero-image-frame portfolio-hero-frame" style={{ background: 'rgba(255,255,255,0.05)', animation: 'pulse 1.5s infinite ease-in-out' }} />
      </>
    );

    return (
      <SubPageLayout heroContent={skeletonHero}>
        <div className="srv-detail-page">
          <section className="srv-content-section" style={{ marginTop: '4rem', marginBottom: '8rem' }}>
            <div className="srv-content-grid">
              <div className="srv-content-text">
                <div style={{ width: '150px', height: '32px', background: 'rgba(0,0,0,0.05)', borderRadius: '4px', marginBottom: '1.5rem', animation: 'pulse 1.5s infinite ease-in-out' }} />
                <div style={{ width: '100%', height: '20px', background: 'rgba(0,0,0,0.05)', borderRadius: '4px', marginBottom: '0.75rem', animation: 'pulse 1.5s infinite ease-in-out' }} />
                <div style={{ width: '100%', height: '20px', background: 'rgba(0,0,0,0.05)', borderRadius: '4px', marginBottom: '0.75rem', animation: 'pulse 1.5s infinite ease-in-out' }} />
                <div style={{ width: '80%', height: '20px', background: 'rgba(0,0,0,0.05)', borderRadius: '4px', marginBottom: '3rem', animation: 'pulse 1.5s infinite ease-in-out' }} />
                
                <div style={{ width: '150px', height: '32px', background: 'rgba(0,0,0,0.05)', borderRadius: '4px', marginBottom: '1.5rem', animation: 'pulse 1.5s infinite ease-in-out' }} />
                {[1, 2, 3].map((i) => (
                  <div key={i} style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(0,0,0,0.05)', animation: 'pulse 1.5s infinite ease-in-out' }} />
                    <div style={{ width: '70%', height: '20px', background: 'rgba(0,0,0,0.05)', borderRadius: '4px', animation: 'pulse 1.5s infinite ease-in-out' }} />
                  </div>
                ))}
              </div>
              <div className="srv-content-visual">
                <div style={{ width: '100%', aspectRatio: '4/3', background: 'rgba(0,0,0,0.05)', borderRadius: '1rem', animation: 'pulse 1.5s infinite ease-in-out' }} />
              </div>
            </div>
          </section>
        </div>
        <style>{`
          @keyframes pulse {
            0% { opacity: 0.7; }
            50% { opacity: 0.3; }
            100% { opacity: 0.7; }
          }
        `}</style>
      </SubPageLayout>
    );
  }

  if (service === null) {
    notFound();
  }

  // Helper to split title for the wave effect
  const words = service.title.split(" ");
  const firstHalf = words.slice(0, Math.ceil(words.length / 2)).join(" ");
  const secondHalf = words.slice(Math.ceil(words.length / 2)).join(" ");

  const heroContent = (
    <>
      <a href="/services" className="back-link">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        All Services
      </a>

      {/* MAIN HEADING */}
      <h1 className="hero-main-title hover-title-wave services-hero-title" aria-label={service.title} style={{ marginTop: '1.5rem', letterSpacing: '0.02em' }}>
        <span className="hover-word">
          {firstHalf.split("").map((char, i) => (
            <span key={i} className="hover-char" style={{ "--char-i": i } as React.CSSProperties}>{char === " " ? "\u00A0" : char}</span>
          ))}
        </span>
        <br />
        <span className="hover-word">
          {secondHalf.split("").map((char, i) => (
            <span key={i} className="hover-char" style={{ "--char-i": i + firstHalf.length } as React.CSSProperties}>{char === " " ? "\u00A0" : char}</span>
          ))}
        </span>
      </h1>

      <p className="portfolio-hero-tagline">
        {service.shortDescription}
      </p>

      {/* HERO FEATURED SHOWCASE IMAGE FRAME */}
      <div className="about-hero-image-frame portfolio-hero-frame">
        <img src={service.image} alt={service.title} className="about-hero-img" />
        <div className="about-hero-badge">
          <span className="badge-num">100%</span>
          <span className="badge-txt">Tailored Solution</span>
        </div>
      </div>
    </>
  );

  return (
    <SubPageLayout heroContent={heroContent}>
      <div className="srv-detail-page">

        {/* CONTENT & VISUAL */}
        <section className="srv-content-section" style={{ marginTop: '4rem', marginBottom: '8rem' }}>
          <div className="srv-content-grid">
            <div className="srv-content-text">
              <h3 className="section-heading">Overview</h3>
              <p className="srv-full-desc">{service.fullDescription}</p>
              
              <div className="features-box">
                <h3 className="section-heading mt-5">What we offer</h3>
                <ul className="detail-features">
                  {service.features.map((feature, index) => (
                    <li key={index}>
                      <span className="feature-dot" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="cta-box">
                <a href="/contact-us" className="pill-btn solid">
                  Start Your Project
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="srv-content-visual">
              <div className="detail-img-wrap">
                <img src={service.overviewImage || service.image} alt={service.title} />
              </div>
            </div>
          </div>
        </section>

        {/* WORKFLOW PROCESS */}
        <WorkflowProcess 
          hideTabs={true}
          steps={service.workflowSteps && service.workflowSteps.length > 0 ? service.workflowSteps.map((step, idx) => {
            const fallbackImgs = [imgOnboarding, imgSrcriping, imgDesign, imgDevelopment, imgDelivery];
            return {
              title: step.title,
              desc: step.description,
              img: step.image || fallbackImgs[idx % fallbackImgs.length]
            };
          }) : [
            { title: "Discovery", desc: `We dive deep to analyze your needs and create a tailored ${service.title} strategy.`, img: imgOnboarding },
            { title: "Planning", desc: `Crafting the roadmap and blueprint specifically designed for your ${service.title} goals.`, img: imgSrcriping },
            { title: "Execution", desc: `Our expert team begins the core work, bringing your ${service.title} project to life.`, img: imgDesign },
            { title: "Refinement", desc: `We rigorously test and optimize the outcomes to ensure maximum impact and performance.`, img: imgDevelopment },
            { title: "Delivery", desc: `Final review and launch! We deploy your new ${service.title} solutions to the market.`, img: imgDelivery }
          ]} 
        />

      </div>

      <style>{`
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          color: rgba(255,255,255,0.8);
          transition: transform 0.3s ease, color 0.3s ease;
          position: relative;
          z-index: 10;
        }

        .back-link:hover {
          color: #fff;
          transform: translateX(-4px);
        }

        .back-link svg {
          width: 1.25rem;
          height: 1.25rem;
        }

        /* CONTENT SECTION */
        .srv-content-section {
          padding: 0 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .srv-content-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: start;
        }

        @media (max-width: 992px) {
          .srv-content-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
        }

        .srv-content-text {
          color: var(--brand-deep);
        }

        .section-heading {
          font-size: 1.75rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          color: var(--brand-deep);
        }

        .srv-full-desc {
          font-size: 1.15rem;
          line-height: 1.7;
          color: var(--ink-soft);
          margin-bottom: 3rem;
        }

        .mt-5 {
          margin-top: 3rem;
        }

        .detail-features {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .detail-features li {
          font-size: 1.15rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          color: var(--ink);
        }

        .feature-dot {
          display: block;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          background-color: var(--brand);
        }

        .cta-box {
          margin-top: 4rem;
        }

        .srv-content-visual {
          position: sticky;
          top: 8rem;
        }

        .detail-img-wrap {
          width: 100%;
          border-radius: var(--radius-card-lg);
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(0,0,0,0.15);
          /* floating animation */
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }

        .detail-img-wrap img {
          width: 100%;
          height: auto;
          display: block;
        }
      `}</style>
    </SubPageLayout>
  );
}
