"use client";

import React, { useEffect, useState } from "react";
import Lenis from "lenis";
import AnimatedStats from "@/components/AnimatedStats";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PortfolioVideoTicker from "@/components/PortfolioVideoTicker";
import api from "@/utils/api";

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [headerLinks, setHeaderLinks] = useState([
    { label: "About Us", url: "/about-us" },
    { label: "Services", url: "/services" },
    { label: "Portfolio", url: "/portfolio" },
    { label: "Reviews", url: "/#testimonials" },
  ]);
  const [zoomScale, setZoomScale] = useState(0.5);

  const [portfolioData, setPortfolioData] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [statsData, setStatsData] = useState<any>(null);
  const [portfolioVideos, setPortfolioVideos] = useState<any[]>([]);
  const [activeVideo, setActiveVideo] = useState<any | null>(null);

  useEffect(() => {
    // Fetch Header from CMS
    api.get('/api/globals/header')
      .then(res => res.data)
      .then(data => {
        if (data && data.navItems && data.navItems.length > 0) {
          setHeaderLinks(data.navItems);
        }
      })
      .catch(console.error);

    // Fetch Portfolio Global Data
    api.get('/api/globals/portfolio')
      .then(res => res.data)
      .then(data => {
        if (data) setPortfolioData(data);
      })
      .catch(console.error);

    // Fetch Projects Collection Data
    api.get('/api/projects?limit=100')
      .then(res => res.data)
      .then(data => {
        if (data && data.docs) setProjects(data.docs);
      })
      .catch(console.error);

    // Fetch Portfolio Videos Collection Data
    api.get('/api/portfolio-videos?limit=100&sort=order')
      .then(res => res.data)
      .then(data => {
        if (data && data.docs) setPortfolioVideos(data.docs);
      })
      .catch(console.error);

    // Fetch Home Global Data for Stats
    api.get('/api/globals/home')
      .then(res => res.data)
      .then(data => {
        if (data && data.stats) setStatsData(data.stats);
      })
      .catch(console.error);

    const lenis = new Lenis({ smoothWheel: true });

    function raf(t: number) {
      lenis.raf(t);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Scroll zoom effect for circular hero image
    const handleScroll = () => {
      const zoomSection = document.getElementById("scroll-zoom-section");
      if (zoomSection) {
        const rect = zoomSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const progress = Math.min(Math.max((windowHeight - rect.top) / windowHeight, 0), 1);
        const newScale = 0.45 + progress * 0.75;
        setZoomScale(Math.min(newScale, 1.0));
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Menu logic identical to homepage
    const menuEl = document.getElementById("menu");
    const menuLinks = document.querySelectorAll(".menu-nav a");

    function openMenu() {
      if (!menuEl) return;
      menuEl.classList.add("open");
      document.body.style.overflow = "hidden";
      menuLinks.forEach((a, i) => {
        setTimeout(() => a.classList.add("in"), 120 + i * 70);
      });
    }

    function closeMenu() {
      if (!menuEl) return;
      menuEl.classList.remove("open");
      document.body.style.overflow = "";
      menuLinks.forEach(a => a.classList.remove("in"));
    }

    document.getElementById("burger")?.addEventListener("click", openMenu);
    document.querySelectorAll("[data-close-menu]").forEach(b => b.addEventListener("click", closeMenu));

    menuLinks.forEach(a => {
      a.addEventListener("click", (e) => {
        const href = a.getAttribute("href");
        if (href && href.startsWith("/")) {
          closeMenu();
          window.location.href = href;
        } else if (href && href.startsWith("#")) {
          e.preventDefault();
          closeMenu();
          const target = document.querySelector(href);
          if (target) lenis.scrollTo(target as HTMLElement);
        }
      });
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      lenis.destroy();
    };
  }, []);


  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <main className="portfolio-page-wrapper">
      {/* OVERLAY MENU */}
      <div id="menu">
        <div className="backdrop" data-close-menu></div>
        <div className="panel">
          <div className="menu-inner">
            <div className="menu-top">
              <div className="brand-mark">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M4.8 5.6A9 9 0 0 0 4.8 18.4" />
                  <path d="M19.2 5.6a9 9 0 0 1 0 12.8" />
                </svg>
                <span>We Brand</span>
              </div>
              <button className="icon-close" data-close-menu aria-label="Close menu">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <nav className="menu-nav" id="menu-nav">
              {headerLinks.map((link, i) => (
                <a key={i} href={link.url}>{link.label}</a>
              ))}
            </nav>
            <div className="menu-bottom">
              <a href="/contact-us" className="pill-btn light">
                Let's Talk
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <nav className="menu-social">
                <a href="#">Instagram</a>
                <a href="#">LinkedIn</a>
                <a href="#">Facebook</a>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* PORTFOLIO HERO CONTAINER */}
      <section className="portfolio-hero-container">
        <div className="portfolio-hero">
          {/* SITE HEADER INSIDE DARK HERO CARD */}
          <header className="site-header portfolio-site-header" id="site-header">
            <div className="hdr-col hdr-left">
              <a href="/" className="brand-mark">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M4.8 5.6A9 9 0 0 0 4.8 18.4" />
                  <path d="M19.2 5.6a9 9 0 0 1 0 12.8" />
                </svg>
                <span>We Brand</span>
              </a>
            </div>
            <div className="hdr-col hdr-right">
              <a href="/contact-us" className="book-link">Let's Talk</a>
              <button className="burger" id="burger" aria-label="Toggle menu">
                <span></span>
                <span></span>
              </button>
            </div>
          </header>

          <div className="portfolio-hero-bg-overlay"></div>
          <div className="portfolio-hero-content">
          

            {/* 2-LINE MAIN HEADING */}
            <h1 className="hero-main-title hover-title-wave" aria-label={`${portfolioData?.hero?.title1 || "Crafting Digital"} ${portfolioData?.hero?.title2 || "Legacies."}`}>
              <span className="hover-word">
                {(portfolioData?.hero?.title1 || "Crafting Digital").split("").map((char: string, i: number) => (
                  <span key={i} className="hover-char" style={{ "--char-i": i } as React.CSSProperties}>{char}</span>
                ))}
              </span>
              <br />
              <span className="hover-word">
                {(portfolioData?.hero?.title2 || "Legacies.").split("").map((char: string, i: number) => (
                  <span key={i} className="hover-char" style={{ "--char-i": i + 16 } as React.CSSProperties}>{char}</span>
                ))}
              </span>
            </h1>

            <p className="portfolio-hero-tagline">
              {portfolioData?.hero?.tagline || "Explore our curated gallery of market-dominating brand identities, Next.js web platforms, mobile products, and high-octane creative campaigns."}
            </p>

            {/* HERO FEATURED SHOWCASE IMAGE FRAME */}
            <div className="about-hero-image-frame portfolio-hero-frame">
              <img src={portfolioData?.hero?.image?.url ? `${process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3001'}${portfolioData.hero.image.url}` : "/portfolio/hero_main.png"} alt="Featured Portfolio Studio Showcase" className="about-hero-img" />
              <div className="about-hero-badge">
                <span className="badge-num">{portfolioData?.hero?.badgeNum || "50+"}</span>
                <span className="badge-txt">{portfolioData?.hero?.badgeText || "Flagship Projects Delivered"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SIGNATURE SCROLL-EXPAND CIRCULAR IMAGE ANIMATION SECTION */}
      <section className="scroll-zoom-section" id="scroll-zoom-section">
        <div className="zoom-sticky-wrapper">
          <div className="zoom-text-prompt">
            <div className="eyebrow dark"><span className="dot"></span>{portfolioData?.zoomSection?.eyebrow || "Scroll Down to Unfold Showcase"}</div>
          </div>
          
          <div
            className="zoom-image-mask"
            style={{
              transform: `scale(${zoomScale})`,
              borderRadius: zoomScale > 0.9 ? "var(--radius-card-lg)" : "50%",
            }}
          >
            <img src={portfolioData?.zoomSection?.image?.url ? `${process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3001'}${portfolioData.zoomSection.image.url}` : "/portfolio/fashion_aura.png"} alt="Aura Luxury Editorial Showcase" className="zoom-img" />
            <div className="zoom-overlay-badge">
              <span className="badge-tag">{portfolioData?.zoomSection?.badgeTag || "FLAGSHIP SHOWCASE"}</span>
              <h2>{portfolioData?.zoomSection?.title || "AURA PARIS — LUXURY DIGITAL EDITORIAL"}</h2>
            </div>
          </div>
        </div>
      </section>
      <PortfolioVideoTicker />

      {/* FLOATING PORTFOLIO STACK SECTION */}
      <section className="floating-portfolio-stack">
        <div className="section-header-center">
          <div className="eyebrow dark"><span className="dot"></span>{portfolioData?.portfolioStack?.eyebrow || "Curated Portfolio"}</div>
          <h2 className="section-title">{portfolioData?.portfolioStack?.title || "Masterpieces Engineered for Growth."}</h2>
        </div>

        {/* CATEGORY FILTER TABS */}
        <div className="portfolio-filter-tabs">
          {categories.map((cat: any) => (
            <button
              key={cat}
              className={`pf-tab-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FLOATING CARDS LIST WITH MOUSE-FOLLOWING CIRCULAR HOVER OVERLAY */}
        <div className="floating-projects-list">
          {(filteredProjects.length > 0 ? filteredProjects : [
            {
              id: 'fallback-1',
              title: 'Aura Paris — Luxury Editorial',
              desc: 'An immersive digital editorial experience crafted for a Parisian luxury fashion brand.',
              client: 'AURA PARIS',
              year: '2023',
              tag: 'Web Design',
              image: { url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800' },
              projectLink: '#'
            },
            {
              id: 'fallback-2',
              title: 'FinEdge App Ecosystem',
              desc: 'A complete redesign of a banking app focusing on intuitive biometrics and neo-banking workflows.',
              client: 'FINEDGE',
              year: '2024',
              tag: 'Mobile App',
              image: { url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800' },
              projectLink: '#'
            },
            {
              id: 'fallback-3',
              title: 'Lumina Brand Identity',
              desc: 'A bold, neon-infused brand strategy and visual identity for a disruptive tech startup.',
              client: 'LUMINA TECH',
              year: '2023',
              tag: 'Branding',
              image: { url: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=800' },
              projectLink: '#'
            },
            {
              id: 'fallback-4',
              title: 'Echo E-Commerce Platform',
              desc: 'High-conversion headless Shopify architecture for a global lifestyle brand.',
              client: 'ECHO LIFESTYLE',
              year: '2024',
              tag: 'E-Commerce',
              image: { url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800' },
              projectLink: '#'
            }
          ]).map((project: any, idx: number) => {
            const projectHref = project.projectLink || '/contact-us';
            const isExternal = project.projectLink?.startsWith('http');
            return (
              <div
                key={project.id || idx}
                className="floating-project-card"
                style={{ "--stack-idx": idx } as React.CSSProperties}
              >
                <div className="p-card-media">
                  <img src={project.image?.url ? `${process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3001'}${project.image.url}` : (project.img || "/portfolio/fashion_aura.png")} alt={project.title} />
                  <span className="p-card-badge">{project.tag}</span>
                </div>

                <div className="p-card-content">
                  <div className="p-card-meta">
                    <span className="p-client">{project.client}</span>
                    <span className="p-year">{project.year}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.desc}</p>
                  <a
                    href={projectHref}
                    className="card-text-cta"
                    target={isExternal ? '_blank' : '_self'}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>Explore Project</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <AnimatedStats statsData={statsData} />

      {/* INNOVATIVE CONTACT CALLOUT */}
      {/* <section className="innovative-contact about-contact-callout">
        <div className="innovative-contact-box" id="innovative-contact-box">
          <div className="inc-left">
            <div className="inc-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="none" />
              </svg>
            </div>
            <div className="inc-text">
              <h3>Have a groundbreaking project in mind?</h3>
              <p>Let's collaborate and turn your vision into an award-winning digital experience.</p>
            </div>
          </div>
          <div className="inc-right">
            <a href="/contact-us" className="inc-btn">Start A Project</a>
            <a href="/contact-us" className="inc-arrow-btn" aria-label="Contact Us">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="19" x2="19" y2="5"></line>
                <polyline points="9 5 19 5 19 15"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </section> */}

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
