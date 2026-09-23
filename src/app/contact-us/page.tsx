"use client";

import { useEffect, useState, useRef } from "react";
import SubPageLayout from "@/components/SubPageLayout";
import api from "@/utils/api";

function AnimatedSelect({ name, options, placeholder, required }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find((o: any) => o.value === selected)?.label || placeholder;

  return (
    <div className="animated-select" ref={containerRef}>
      <input type="hidden" name={name} value={selected} required={required} />
      <div 
        className={`as-trigger ${isOpen ? "open" : ""} ${selected ? "has-value" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedLabel}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 9l6 6 6-6"/></svg>
      </div>
      <div className={`as-dropdown ${isOpen ? "open" : ""}`}>
        {options.map((opt: any) => (
          <div 
            key={opt.value} 
            className={`as-option ${selected === opt.value ? "selected" : ""}`}
            onClick={() => { setSelected(opt.value); setIsOpen(false); }}
          >
            {opt.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ContactUs() {
  const [contactData, setContactData] = useState<any>(null);

  useEffect(() => {
    // Fetch Contact Page Data
    api.get('/api/globals/contact-page')
      .then(res => res.data)
      .then(data => {
        if (data) setContactData(data);
      })
      .catch(console.error);

    // Trigger title wave animation characters
    const chars = document.querySelectorAll('.hover-char');
    chars.forEach((char) => {
      char.addEventListener('mouseenter', () => {
        char.classList.add('active');
        setTimeout(() => char.classList.remove('active'), 800);
      });
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    const name = fd.get("name") as string;
    const org = fd.get("org") as string;
    const phone = fd.get("phone") as string;
    const email = fd.get("email") as string;
    const service = fd.get("service") as string;
    const budget = fd.get("budget") as string;
    const msg = fd.get("message") as string;

    if (!name || !org || !phone || !email || !service || !budget) {
      return alert("Please fill in all the required fields.");
    }

    try {
      // 1. Submit data to CMS Collection
      await api.post('/api/contact-submissions', {
        name,
        org,
        phone,
        email,
        service,
        budget,
        message: msg,
      });

      // 2. Open WhatsApp link dynamically
      const text = `Hi We Brand Media! I'm ${name} from ${org}.\n\nLooking for: ${service === 'web' ? 'Web Design & Dev' : service === 'seo' ? 'SEO & Marketing' : 'Branding'}\nBudget: ${budget === 'sm' ? 'Below $5k' : budget === 'md' ? '$5k - $15k' : '$15k+'}\n\nMessage: ${msg || 'No message provided.'}`;
      const num = contactData?.whatsappNumber || "919876543210";
      const whatsappUrl = `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
      
      form.reset();
    } catch (err) {
      console.error(err);
      alert("Failed to submit inquiry. Please try again.");
    }
  };

  const heroContent = (
    <>
      {/* <div className="eyebrow light"><span className="dot"></span>Connect With Us</div> */}
      <h1 className="hero-main-title hover-title-wave services-hero-title" aria-label={contactData?.heroTitle || "DON'T SETTLE FOR ORDINARY. LET'S CHAT."}>
        {(contactData?.heroTitle || "DON'T SETTLE FOR ORDINARY. LET'S CHAT.").split(" ").map((word: string, wIdx: number) => (
          <span key={wIdx} className="hover-word">
            {word.split("").map((char: string, cIdx: number) => {
              const charIndex = wIdx * 10 + cIdx;
              return (
                <span key={cIdx} className="hover-char" style={{ "--char-i": charIndex } as React.CSSProperties}>
                  {char}
                </span>
              );
            })}
          </span>
        ))}
      </h1>

      <p className="portfolio-hero-tagline">
        {contactData?.heroTagline || "Partner with us for marketing that breaks through the noise."}
      </p>

      {/* HERO FEATURED SHOWCASE IMAGE FRAME */}
      <div className="about-hero-image-frame portfolio-hero-frame">
        <img 
          src={contactData?.image?.url ? `${process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3002'}${contactData.image.url}` : "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"} 
          alt="Featured Contact Showcase" 
          className="about-hero-img" 
        />
        <div className="about-hero-badge">
          <span className="badge-num">24/7</span>
          <span className="badge-txt">Open Channels</span>
        </div>
      </div>
    </>
  );

  return (
    <SubPageLayout heroContent={heroContent}>
      <section className="contact-form-section" style={{ paddingTop: '5rem' }}>
        <div className="cfs-grid">
          {/* Left panel: Team image & Info card overlay */}
          <div className="cfs-visual-container">
            <div className="cfs-visual">
              <img 
                src={contactData?.image?.url ? `${process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3002'}${contactData.image.url}` : "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"} 
                alt="Team working together" 
                className="cfs-img" 
              />
              <div className="cfs-visual-overlay"></div>
            </div>
            
            {/* Contact Details Panel overlay */}
            <div className="cfs-details-panel">
              <h3>Contact Details</h3>
              <div className="cfs-detail-items">
                <div className="cfs-detail-item">
                  <div className="cd-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </div>
                  <div className="cd-text">
                    <span className="cd-label">Email Us</span>
                    <a href={`mailto:${contactData?.email || 'hello@webrandmedia.com'}`} className="cd-val">{contactData?.email || 'hello@webrandmedia.com'}</a>
                  </div>
                </div>

                <div className="cfs-detail-item">
                  <div className="cd-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <div className="cd-text">
                    <span className="cd-label">Call Us</span>
                    <a href={`tel:${contactData?.phone || '+919876543210'}`} className="cd-val">{contactData?.phone || '+91 98765 43210'}</a>
                  </div>
                </div>

                <div className="cfs-detail-item">
                  <div className="cd-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  </div>
                  <div className="cd-text">
                    <span className="cd-label">Our Office</span>
                    <span className="cd-val">{contactData?.address || '123 Creative Studio, Suite 100, Chennai, India'}</span>
                  </div>
                </div>

                <div className="cfs-detail-item">
                  <div className="cd-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  </div>
                  <div className="cd-text">
                    <span className="cd-label">Working Hours</span>
                    <span className="cd-val">{contactData?.officeHours || 'Mon - Fri: 9:00 AM - 6:00 PM'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="cfs-form-box">
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '2rem', color: 'white' }}>Send us a message</h2>
            <form className="cfs-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Name <span className="req">*</span></label>
                  <input type="text" name="name" placeholder="Enter your name" required />
                </div>
                <div className="form-group">
                  <label>Organization's Name <span className="req">*</span></label>
                  <input type="text" name="org" placeholder="Enter organization name" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Contact Number <span className="req">*</span></label>
                  <input type="tel" name="phone" placeholder="+91 Enter your number" required />
                </div>
                <div className="form-group">
                  <label>Email <span className="req">*</span></label>
                  <input type="email" name="email" placeholder="Email address" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Looking For <span className="req">*</span></label>
                  <AnimatedSelect 
                    name="service"
                    placeholder="—Please choose an option—"
                    required={true}
                    options={[
                      { value: "web", label: "Web Design & Dev" },
                      { value: "seo", label: "SEO & Marketing" },
                      { value: "branding", label: "Branding" }
                    ]}
                  />
                </div>
                <div className="form-group">
                  <label>Project Budget <span className="req">*</span></label>
                  <AnimatedSelect 
                    name="budget"
                    placeholder="—Please choose an option—"
                    required={true}
                    options={[
                      { value: "sm", label: "Below $5k" },
                      { value: "md", label: "$5k - $15k" },
                      { value: "lg", label: "$15k+" }
                    ]}
                  />
                </div>
              </div>
              <div className="form-group full">
                <label>Message</label>
                <textarea name="message" rows={4} placeholder="Tell us about your project..."></textarea>
              </div>
              <button type="submit" className="submit-btn">Submit</button>
            </form>
          </div>
        </div>
      </section>

      <style>{`
        .services-hero-title {
          font-size: clamp(2rem, 5.5vw, 5.5rem) !important;
          line-height: 1.15 !important;
          flex-wrap: wrap !important;
          display: flex !important;
          justify-content: center !important;
          white-space: normal !important;
        }

        .services-hero-title .hover-word {
          margin-right: 0.22em;
          display: inline-flex !important;
          white-space: nowrap !important;
        }

        .cfs-visual-container {
          position: relative;
          display: flex;
          flex-direction: column;
          background: #0b1a30;
          overflow: hidden;
          border-radius: 1.5rem 1.5rem 0 0;
        }

        .cfs-visual {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        @media (min-width: 900px) {
          .cfs-visual-container {
            height: 100%;
            min-height: 500px;
            border-radius: 1.5rem 0 0 1.5rem;
          }
           .cfs-details-panel {
       
          padding: 3.5rem;
       
        }
        }

        .cfs-visual-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(15, 47, 99, 0.92) 0%, rgba(11, 26, 48, 0.97) 100%);
          z-index: 1;
        }

        .cfs-details-panel {
          position: relative;
          z-index: 2;
          
          display: flex;
          flex-direction: column;
          justify-content: center;
          color: white;
        }

        .cfs-details-panel h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 2rem;
          border-bottom: 2px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 0.75rem;
        }

        .cfs-detail-items {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .cfs-detail-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .cd-icon {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--brand-light, #38bdf8);
        }

        .cd-icon svg {
          width: 20px;
          height: 20px;
        }

        .cd-text {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .cd-label {
          font-size: 0.8rem;
          opacity: 0.6;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .cd-val {
          font-size: 1rem;
          font-weight: 550;
          color: #f8fafc;
          text-decoration: none;
          line-height: 1.4;
        }

        a.cd-val:hover {
          color: var(--brand-light, #38bdf8);
          text-decoration: underline;
        }
      `}</style>
    </SubPageLayout>
  );
}
