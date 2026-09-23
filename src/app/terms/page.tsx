"use client";

import React, { useEffect, useState } from "react";
import SubPageLayout from "@/components/SubPageLayout";
import api from "@/utils/api";

export default function TermsPage() {
  const [termsData, setTermsData] = useState<any>(null);

  useEffect(() => {
    api.get('/api/globals/terms-page')
      .then(res => res.data)
      .then(data => {
        if (data) setTermsData(data);
      })
      .catch(console.error);
  }, []);

  const heroContent = (
    <>
      <div className="eyebrow light"><span className="dot"></span>Legal & Compliance</div>
      <h1 className="legal-title">{termsData?.title || "Terms of Service"}</h1>
      <p className="legal-subtitle">
        {termsData?.subtitle || "These terms govern all client engagements, website platform usage, and service agreements executed with We Brand Media."}
      </p>
      <div className="legal-meta-badge">{termsData?.effectiveDate || "Effective Date: July 2026"}</div>
    </>
  );

  return (
    <SubPageLayout heroContent={heroContent}>
      {/* We can reuse the legal-page styles here or rely on global/shared CSS */}
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
              {termsData?.sections?.map((sec: any) => (
                <a key={sec.anchor} href={`#${sec.anchor}`}>{sec.title}</a>
              )) || (
                <>
                  <a href="#acceptance">1. Acceptance of Terms</a>
                  <a href="#services-scope">2. Services & Deliverables</a>
                  <a href="#intellectual-property">3. Intellectual Property</a>
                  <a href="#payment-terms">4. Payments & Billing</a>
                  <a href="#confidentiality">5. Confidentiality</a>
                  <a href="#limitation">6. Liability & Warranties</a>
                  <a href="#governing-law">7. Governing Law</a>
                </>
              )}
            </nav>
          </aside>

          {/* MAIN DOCUMENT TEXT */}
          <div className="legal-content">
            {termsData?.sections?.map((sec: any) => (
              <div className="legal-card" id={sec.anchor} key={sec.anchor}>
                <h2>{sec.title}</h2>
                <p style={{ whiteSpace: 'pre-line' }}>{sec.content}</p>
              </div>
            )) || (
              <>
                <div className="legal-card" id="acceptance">
                  <h2>1. Acceptance of Terms</h2>
                  <p>
                    By commissioning project work, entering a service contract, or utilizing the digital platforms of We Brand Media ("We Brand", "Agency"), you agree to be legally bound by these Terms of Service.
                  </p>
                </div>

                <div className="legal-card" id="services-scope">
                  <h2>2. Services & Project Deliverables</h2>
                  <p>
                    All creative branding, Next.js web engineering, mobile UI design, and marketing campaigns are defined in individual Statement of Work (SOW) documents signed prior to project kickoff. Scope additions outside the SOW will be billed at standard hourly agency rates.
                  </p>
                </div>

                <div className="legal-card" id="intellectual-property">
                  <h2>3. Intellectual Property Rights</h2>
                  <p>
                    Upon final contract completion and receipt of full payment, all custom design source files, website code repositories, and brand identity assets become the sole property of the Client. We Brand retains non-exclusive rights to feature completed deliverables in our promotional agency portfolio.
                  </p>
                </div>

                <div className="legal-card" id="payment-terms">
                  <h2>4. Payment Terms & Billing</h2>
                  <p>Unless specified otherwise in an executed contract, standard billing schedules require:</p>
                  <ul>
                    <li><strong>50% Initial Deposit:</strong> Required upon contract execution prior to project onboarding.</li>
                    <li><strong>50% Final Payment:</strong> Due prior to final code deployment, domain launch, or source handoff.</li>
                    <li>Invoices unpaid past 30 days are subject to a 1.5% late payment fee per month.</li>
                  </ul>
                </div>

                <div className="legal-card" id="confidentiality">
                  <h2>5. Mutual Confidentiality</h2>
                  <p>
                    Both We Brand and Client agree to protect non-public business strategies, trade secrets, data schemas, and proprietary assets disclosed during the project lifecycle with strict confidentiality.
                  </p>
                </div>

                <div className="legal-card" id="limitation">
                  <h2>6. Limitation of Liability</h2>
                  <p>
                    In no event shall We Brand Media be liable for indirect, incidental, or consequential damages arising from site hosting downtime, third-party API outages, or Client-managed code alterations. Total liability is limited strictly to the total fees paid by Client for the specific project.
                  </p>
                </div>

                <div className="legal-card" id="governing-law">
                  <h2>7. Governing Law & Dispute Resolution</h2>
                  <p>
                    These terms are governed by and construed in accordance with the laws of Tamil Nadu, India. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the courts in Coimbatore, India.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>


    </SubPageLayout>
  );
}
