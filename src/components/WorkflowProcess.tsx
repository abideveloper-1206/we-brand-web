"use client";

import React, { useState } from "react";
import Image from "next/image";

import imgOnboarding from "@/assets/workflow/step1_onboarding_1784997163019.png";
import imgStrategy from "@/assets/workflow/step2_strategy_1784997174263.png";
import imgDesign from "@/assets/workflow/step3_design_1784997183957.png";
import imgDevelopment from "@/assets/workflow/step4_development_1784997194952.png";
import imgDelivery from "@/assets/workflow/step5_delivery_1784997206352.png";
import imgEditing from "@/assets/workflow/workflow_editing_1784996845221.png";
import imgWfOnboarding from "@/assets/workflow/workflow_onboarding_1784996812100.png";
import imgScripting from "@/assets/workflow/workflow_scripting_1784996823375.png";
import imgShooting from "@/assets/workflow/workflow_shooting_1784996834281.png";

// Fallback local images indexed per step position (used when CMS step has no image)
const FALLBACK_IMAGES: Record<string, any[]> = {
  "Digital Solutions": [imgOnboarding, imgStrategy, imgDesign, imgDevelopment, imgDelivery],
  "Web Development":   [imgOnboarding, imgStrategy, imgDesign, imgDevelopment, imgDelivery],
  "Branding":          [imgWfOnboarding, imgScripting, imgShooting, imgEditing, imgDelivery],
};

const TAB_STEPS: Record<string, WorkflowStep[]> = {
  "Digital Solutions": [
    { title: "Onboarding",         desc: "We present a detailed overview of timelines and welcome you to the community.",            img: imgOnboarding },
    { title: "Strategy & Planning",desc: "We craft a personalised strategy tailored precisely to your branding and business goals.", img: imgStrategy },
    { title: "UI/UX Design",       desc: "We create wireframes and high-fidelity mockups to illustrate the final user journey.",      img: imgDesign },
    { title: "Development",        desc: "Our technical team brings the approved designs to life with clean, scalable code.",         img: imgDevelopment },
    { title: "Review & Delivery",  desc: "We review all elements together and launch your final product seamlessly.",                  img: imgDelivery },
  ],
  "Web Development": [
    { title: "Discovery",          desc: "We deep-dive into your goals, audience, and competitors to shape the right solution.",       img: imgOnboarding },
    { title: "Architecture",       desc: "We plan the tech stack, sitemap, and database structure before writing a single line.",      img: imgStrategy },
    { title: "Design",             desc: "Pixel-perfect UI/UX prototypes built around your brand and conversion goals.",               img: imgDesign },
    { title: "Development",        desc: "Frontend + backend built with performance, security, and scalability in mind.",              img: imgDevelopment },
    { title: "Launch & Support",   desc: "QA testing, go-live, and ongoing support so your site is always at its best.",             img: imgDelivery },
  ],
  "Branding": [
    { title: "Onboarding",         desc: "We understand your brand story, values, and target audience through a detailed brief.",       img: imgWfOnboarding },
    { title: "Scripting",          desc: "Creative directors craft compelling narratives and scripts that resonate with your audience.", img: imgScripting },
    { title: "Shooting",           desc: "Professional cinematography and photography to capture your brand in its best light.",        img: imgShooting },
    { title: "Editing & Motion",   desc: "Post-production magic — colour grading, motion graphics, and sound design.",                 img: imgEditing },
    { title: "Delivery",           desc: "Final assets delivered across all formats — social, web, print, and broadcast.",            img: imgDelivery },
  ],
};

export interface WorkflowStep {
  title: string;
  desc: string;
  img?: any;
}

export interface WorkflowTab {
  tabName: string;
  steps: WorkflowStep[];
}

export default function WorkflowProcess({ title, tabs, steps, hideTabs = false }: { title?: string, tabs?: WorkflowTab[], steps?: WorkflowStep[], hideTabs?: boolean }) {
  // Use CMS tabs if available and not empty, otherwise fallback to local defaults
  const availableTabs = tabs && tabs.length > 0 ? tabs : [
    { tabName: "Digital Solutions", steps: TAB_STEPS["Digital Solutions"] },
    { tabName: "Web Development", steps: TAB_STEPS["Web Development"] },
    { tabName: "Branding", steps: TAB_STEPS["Branding"] }
  ];

  const [activeTab, setActiveTab] = useState(availableTabs[0].tabName);

  const activeTabData = availableTabs.find(t => t.tabName === activeTab) || availableTabs[0];
  const rawSteps = steps ?? activeTabData.steps;

  // Merge: if a step has no image, fall back to the local image for that position
  const fallbacks = FALLBACK_IMAGES[activeTab] || FALLBACK_IMAGES["Digital Solutions"];
  const currentSteps: WorkflowStep[] = rawSteps.map((step, idx) => ({
    ...step,
    img: step.img || fallbacks[idx] || imgDelivery,
  }));

  return (
    <section className="workflow-section">
      <div className="container">
        
        <div className="workflow-header">
          <h2 className="workflow-title">{title || "How We Build Your Success"}</h2>
        </div>
        
        {!hideTabs && (
          <div className="workflow-tabs-wrapper">
            <div className="workflow-tabs">
              {availableTabs.map((tab) => (
                <button
                  key={tab.tabName}
                  className={`workflow-tab ${activeTab === tab.tabName ? "active" : ""}`}
                  onClick={() => setActiveTab(tab.tabName)}
                >
                  {tab.tabName}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="workflow-track-wrapper">
          <div className="workflow-track">
            {currentSteps.map((step, idx) => (
              <div className="workflow-step" key={idx}>
                <div className="step-image-container">
                  {typeof step.img === 'string' && step.img ? (
                    <img src={step.img} alt={step.title} className="step-img" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  ) : step.img ? (
                    <Image src={step.img} alt={step.title} fill className="step-img" />
                  ) : (
                    <div className="step-img-placeholder" style={{ width: '100%', height: '100%', background: '#f0f2f5', borderRadius: '1.5rem' }} />
                  )}
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
                
                {idx < currentSteps.length - 1 && (
                  <div className="step-connector">
                    <div className="connector-line"></div>
                    <div className="connector-circle">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .workflow-section {
          padding: 3rem 2rem;
          background: #ffffff;
          overflow: hidden;
        }
        .container {
          max-width: 1400px;
          margin: 0 auto;
        }
        .workflow-header {
          margin-bottom: 3rem;
          text-align: center;
        }
        .workflow-title {
          font-size: 3.5rem;
          font-weight: 500;
          color: var(--foreground);
          line-height: 1.1;
          letter-spacing: -0.02em;
        }
        .workflow-tabs-wrapper {
          display: flex;
          justify-content: center;
          margin-bottom: 4rem;
        }
        .workflow-tabs {
          display: inline-flex;
          background: #f4f4f4;
          padding: 0.3rem;
          border-radius: 3rem;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
          overflow-x: auto;
          max-width: 100%;
          gap: 0.5rem;
          scrollbar-width: none;
        }
        .workflow-tabs::-webkit-scrollbar {
          display: none;
        }
        .workflow-tab {
          padding: 0.6rem 2rem;
          border-radius: 2.5rem;
          font-weight: 600;
          color: #555;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        .workflow-tab.active {
          background: var(--brand-deep);
          color: #fff;
          box-shadow: 0 4px 12px rgba(15, 47, 99, 0.2);
        }
        .workflow-tab:hover:not(.active) {
          background: #e8e8e8;
        }
        .workflow-track-wrapper {
          width: 100%;
          overflow: visible;
        }
        .workflow-track {
          display: flex;
          gap: 3.5rem;
          width: 100%;
          margin: 0 auto;
          justify-content: space-between;
        }
        .workflow-step {
          flex: 1;
          min-width: 0;
          text-align: center;
          position: relative;
        }
        .step-image-container {
          width: 100%;
          aspect-ratio: 1;
          background: #f4f6f8; /* Soft background to show radius clearly */
          border-radius: 2rem;
          padding: 1rem;
          box-shadow: 0 8px 24px rgba(0,0,0,0.04);
          margin-bottom: 1.5rem;
          position: relative;
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
          border: 1px solid rgba(0,0,0,0.03);
          z-index: 2;
          overflow: hidden;
        }
        .step-image-container:hover {
          transform: translateY(-8px) scale(1.05);
          box-shadow: 0 15px 35px rgba(0,0,0,0.08);
        }
        .step-img {
          object-fit: contain;
          border-radius: 1.5rem;
          padding: 0.5rem;
          mix-blend-mode: darken; /* Makes the image's white background transparent */
        }
        .step-connector {
          position: absolute;
          top: 50%;
          right: -3.5rem;
          width: 3.5rem;
          height: 24px;
          z-index: 1;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        /* Override top relative to the image container height, assuming image is aspect-ratio: 1 and fills width */
        .workflow-step .step-connector {
          top: calc(100% / 2 - 2rem); /* roughly center of image */
        }
        .connector-line {
          position: absolute;
          top: 50%;
          left: 0;
          width: 100%;
          height: 1px;
          background: var(--foreground);
        }
        .connector-circle {
          position: relative;
          width: 24px;
          height: 24px;
          background: var(--foreground);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          z-index: 2;
        }
        .connector-circle svg {
          width: 12px;
          height: 12px;
        }
        .step-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--brand-deep);
          margin-bottom: 0.6rem;
        }
        .step-desc {
          color: var(--ink-soft);
          line-height: 1.4;
          font-size: 0.85rem;
        }
        
        @media (max-width: 1200px) {
          .workflow-track {
            gap: 2rem;
          }
          .step-connector {
            right: -2rem;
            width: 2rem;
          }
        }
        @media (max-width: 1024px) {
          .workflow-track-wrapper {
            overflow-x: auto;
            padding-bottom: 2rem;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .workflow-track-wrapper::-webkit-scrollbar {
            display: none;
          }
          .workflow-track {
            min-width: max-content;
            justify-content: flex-start;
          }
          .workflow-step {
            width: 200px;
            flex: none;
          }
        }
        @media (max-width: 768px) {
          .workflow-title {
            font-size: 2.2rem;
          }
          .workflow-track-wrapper {
            overflow-x: visible;
            padding-bottom: 0;
          }
          .workflow-track {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
            min-width: 0;
            justify-content: stretch;
          }
          .workflow-step {
            width: 100%;
          }
          .step-connector {
            display: none !important;
          }
          .workflow-header {
            text-align: center;
          }
          .workflow-tabs-wrapper {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
