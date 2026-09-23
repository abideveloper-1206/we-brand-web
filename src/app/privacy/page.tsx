"use client";

import React, { useEffect, useState } from "react";
import SubPageLayout from "@/components/SubPageLayout";
import api from "@/utils/api";

export default function PrivacyPage() {
  const [privacyData, setPrivacyData] = useState<any>(null);

  useEffect(() => {
    api.get('/api/globals/privacy-page')
      .then(res => res.data)
      .then(data => {
        if (data) setPrivacyData(data);
      })
      .catch(console.error);
  }, []);

  const heroContent = (
    <>
      <div className="eyebrow light"><span className="dot"></span>Legal & Compliance</div>
      <h1 className="legal-title">{privacyData?.title || "Privacy Policy"}</h1>
      <p className="legal-subtitle">
        {privacyData?.subtitle || "At We Brand Media, transparency and client data protection are paramount. Learn how we collect, safeguard, and process your information."}
      </p>
      <div className="legal-meta-badge">{privacyData?.lastUpdated || "Last Updated: July 2026"}</div>
    </>
  );

  return (
    <SubPageLayout heroContent={heroContent}>
      <style>{`
        .legal-hero-container {
          background: var(--brand-deep);
          padding: 8rem 2rem 4rem;
          color: white;
          text-align: center;
        }
        .legal-title {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 700;
          margin: 1.5rem 0;
        }
        .legal-subtitle {
          font-size: 1.15rem;
          max-width: 700px;
          margin: 0 auto 2rem;
          opacity: 0.9;
        }
        .legal-body-container {
          padding: 3rem 1rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .legal-body-grid {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 4rem;
          align-items: start;
        }
        .legal-toc {
          position: sticky;
          top: 120px;
          padding: 2rem;
          // background: #f8f9fa;
          // border-radius: var(--radius-card-sm);
        }
        .legal-toc h3 {
          font-size: 1.25rem;
          margin-bottom: 1.5rem;
        }
        .legal-toc nav {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .legal-toc a {
          color: var(--ink-soft);
          text-decoration: none;
          transition: color 0.3s;
        }
        .legal-toc a:hover {
          color: var(--brand);
        }
        .legal-content {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }
        .legal-card {
          background: white;
          padding: 3rem;
          // border-radius: var(--radius-card-md);
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
        }
        .legal-card h2 {
          font-size: 1.75rem;
          margin-bottom: 1.5rem;
          color: var(--brand-deep);
        }
        .legal-card p, .legal-card ul {
          font-size: 1.1rem;
          line-height: 1.7;
          color: var(--ink);
        }
        .legal-card ul {
          padding-left: 1.5rem;
          margin-top: 1rem;
        }
        .legal-card li {
          margin-bottom: 0.75rem;
        }
        @media (max-width: 992px) {
          .legal-body-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .legal-toc {
            position: static;
            padding: 1.5rem;
          }
          .legal-card {
            padding: 1.5rem;
          }
          .legal-title {
            margin-top: 2rem;
          }
        }
      `}</style>

      {/* LEGAL CONTENT BODY */}
      <section className="legal-body-container">
        <div className="legal-body-grid">
          {/* QUICK NAV TOC */}
          <aside className="legal-toc">
            <h3>Table of Contents</h3>
            <nav>
              {privacyData?.sections?.map((sec: any) => (
                <a key={sec.anchor} href={`#${sec.anchor}`}>{sec.title}</a>
              )) || (
                <>
                  <a href="#overview">1. Overview</a>
                  <a href="#data-collection">2. Data We Collect</a>
                  <a href="#data-usage">3. How We Use Data</a>
                  <a href="#cookies">4. Cookies & Analytics</a>
                  <a href="#data-security">5. Data Security</a>
                  <a href="#client-rights">6. Your Rights</a>
                  <a href="#contact-legal">7. Contact Us</a>
                </>
              )}
            </nav>
          </aside>

          {/* MAIN DOCUMENT TEXT */}
          <div className="legal-content">
            {privacyData?.sections?.map((sec: any) => (
              <div className="legal-card" id={sec.anchor} key={sec.anchor}>
                <h2>{sec.title}</h2>
                <p style={{ whiteSpace: 'pre-line' }}>{sec.content}</p>
              </div>
            )) || (
              <>
                <div className="legal-card" id="overview">
                  <h2>1. Overview</h2>
                  <p>
                    We Brand Media ("We Brand", "we", "us", or "our") operates as a digital branding and web engineering agency based in Coimbatore, Tamil Nadu. This Privacy Policy outlines our standards and practices for managing personal and business data across our website and client services.
                  </p>
                </div>

                <div className="legal-card" id="data-collection">
                  <h2>2. Information We Collect</h2>
                  <p>We may collect information directly from you when you submit project inquiries, book consultations, or subscribe to our agency newsletter:</p>
                  <ul>
                    <li><strong>Contact Identifiers:</strong> Name, professional email address, phone number, and company name.</li>
                    <li><strong>Project Requirements:</strong> Project scope briefs, budget ranges, and strategic requirements submitted via our contact form.</li>
                    <li><strong>Technical Telemetry:</strong> IP addresses, browser types, device specifications, and page analytics collected via automated server logs.</li>
                  </ul>
                </div>

                <div className="legal-card" id="data-usage">
                  <h2>3. How We Use Your Data</h2>
                  <p>Collected information is strictly utilized to deliver high-quality agency services and improve site user experience:</p>
                  <ul>
                    <li>Formulating project proposals, technical estimates, and service contracts.</li>
                    <li>Communicating ongoing development milestones and support updates.</li>
                    <li>Analyzing site traffic metrics to optimize performance and UI responsiveness.</li>
                  </ul>
                </div>

                <div className="legal-card" id="cookies">
                  <h2>4. Cookies & Web Analytics</h2>
                  <p>
                    Our platform utilizes essential cookies and privacy-respecting analytics tools to examine visitor interactions. You can modify your browser settings at any time to reject non-essential cookies without affecting your access to our website.
                  </p>
                </div>

                <div className="legal-card" id="data-security">
                  <h2>5. Data Protection & Security</h2>
                  <p>
                    We implement industry-standard encryption protocols (HTTPS/SSL), secure cloud infrastructure, and strict role-based access control measures to prevent unauthorized data access, disclosure, or alteration.
                  </p>
                </div>

                <div className="legal-card" id="client-rights">
                  <h2>6. Your Data Rights</h2>
                  <p>
                    You retain full ownership of your business data. You have the right to request access to, correction of, or permanent deletion of your records stored in our databases at any time.
                  </p>
                </div>

                <div className="legal-card" id="contact-legal">
                  <h2>7. Contact Our Data Office</h2>
                  <p>For any privacy inquiries, data deletion requests, or legal notices, please reach out to our team:</p>
                  <address className="legal-contact-address">
                    <strong>We Brand Media Privacy Desk</strong><br />
                    Coimbatore, Tamil Nadu, India<br />
                    Email: <a href="mailto:privacy@webrandmedia.com">privacy@webrandmedia.com</a><br />
                    Phone: <a href="tel:+919876543210">+91 98765 43210</a>
                  </address>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </SubPageLayout>
  );
}
