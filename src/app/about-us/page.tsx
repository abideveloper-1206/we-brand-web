"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import Footer from "@/components/Footer";
import api from "@/utils/api";

export default function AboutUsPage() {
  const [activeTimeline, setActiveTimeline] = useState("2026");
  const [headerLinks, setHeaderLinks] = useState([
    { label: "About Us", url: "/about-us" },
    { label: "Services", url: "/services" },
    { label: "Portfolio", url: "/portfolio" },
    { label: "Reviews", url: "/#testimonials" },
  ]);

  const [aboutData, setAboutData] = useState<any>(null);

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

    // Fetch About Page Data
    api.get('/api/globals/about')
      .then(res => res.data)
      .then(data => {
        if (data) {
          setAboutData(data);
        }
      })
      .catch(console.error);

    const lenis = new Lenis({ smoothWheel: true });
    function raf(t: number) {
      lenis.raf(t);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

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

    return () => lenis.destroy();
  }, []);

  // Use CMS timeline array or fallback to static array
  const rawTimeline = aboutData?.timeline?.items || [
    {
      year: "2018",
      title: "The Genesis",
      desc: "Founded in Coimbatore with a vision to revolutionize brand identities and digital marketing for ambitious local businesses.",
      stats: "15+ Early Adopter Clients",
      chip: "Founding Era"
    },
    {
      year: "2020",
      title: "Full-Stack Expansion",
      desc: "Expanded into high-performance custom web app development, UI/UX engineering, and performance marketing funnels.",
      stats: "120+ Digital Platforms Launched",
      chip: "Tech Growth"
    },
    {
      year: "2023",
      title: "Next-Gen Creative Studio",
      desc: "Integrated cinematic video production, 3D motion design, and enterprise-grade Next.js web applications into our core offerings.",
      stats: "350+ Projects & National Reach",
      chip: "Creative Scale"
    },
    {
      year: "2026",
      title: "Market Leaders",
      desc: "Recognized as Coimbatore's premier digital agency, scaling 500+ brands with ROI-focused creative and technical excellence.",
      stats: "500+ Active Client Portfolio",
      chip: "Current Milestone"
    }
  ];

  const currentTimeline = rawTimeline.find((t: any) => t.year === activeTimeline) || rawTimeline[0];

  return (
    <main className="about-page-wrapper">
      {/* OVERLAY MENU (EXACT HOMEPAGE OVERLAY MATCH) */}
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

      {/* HERO SECTION WITH HEADER EMBEDDED INSIDE THE DARK BLUE CARD */}
      <section className="about-hero-container">
        <div className="about-hero">
          {/* HEADER INSIDE DARK HERO CARD */}
          <header className="site-header about-site-header" id="site-header">
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

          <div className="about-hero-bg-overlay"></div>
          <div className="about-hero-content">
          

            <h1 className="hero-main-title hover-title-wave" aria-label={aboutData?.hero?.title || "Who We Are."}>
              {(aboutData?.hero?.title || "Who We Are.").split(" ").map((word: string, wIdx: number) => (
                <span key={wIdx} style={{ whiteSpace: 'nowrap', marginRight: '0.25em' }}>
                  {word.split("").map((char: string, cIdx: number) => {
                    // Unique index for the animation delay cascade
                    const idx = wIdx * 5 + cIdx;
                    return (
                      <span key={cIdx} className="hover-char" style={{ "--char-i": idx } as React.CSSProperties}>{char}</span>
                    )
                  })}
                </span>
              ))}
            </h1>

            <p className="about-hero-tagline">
              {aboutData?.hero?.tagline || "We are a high-octane team of designers, engineers, and digital marketers based in Coimbatore, transforming ambitious ideas into market-dominating brand experiences."}
            </p>

            <div className="about-hero-image-frame">
              <img src={aboutData?.hero?.image?.url ? `${process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3002'}${aboutData.hero.image.url}` : "/about/hero_studio.png"} alt="We Brand Media Studio" className="about-hero-img" />
              <div className="about-hero-badge">
                <span className="badge-num">{aboutData?.hero?.badgeNum || "500+"}</span>
                <span className="badge-txt">{aboutData?.hero?.badgeText || "Brands Scaled Nationwide"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INFINITE ANIMATED TICKER STREAM */}
      <section className="animated-metrics-ticker">
        <div className="ticker-track">
          {(() => {
            const tickerItems = aboutData?.ticker && aboutData.ticker.length > 0 ? aboutData.ticker : [
              { text: "500+ PROJECTS DELIVERED" },
              { text: "98% CLIENT RETENTION" },
              { text: "10+ YEARS INDUSTRY MASTERY" },
              { text: "2500+ ENGAGED GROWTH CLIENTS" },
              { text: "COIMBATORE & NATIONWIDE" }
            ];

            const renderTickerItems = () => tickerItems.map((item: any, i: number) => (
              <div className="ticker-item" key={i}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ticker-icon">
                  {i % 5 === 0 && <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />}
                  {i % 5 === 1 && <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />}
                  {i % 5 === 2 && <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />}
                  {i % 5 === 3 && <><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></>}
                  {i % 5 === 4 && <><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>}
                </svg>
                <span>{item.text}</span>
              </div>
            ));

            return (
              <>
                {renderTickerItems()}
                {/* DUPLICATE FOR INFINITE LOOP */}
                {renderTickerItems()}
              </>
            );
          })()}
        </div>
      </section>

    

      {/* CORE VALUES & PHILOSOPHY */}
      <section className="about-philosophy-section">
        <div className="section-header-center">
          <div className="eyebrow dark"><span className="dot"></span>{aboutData?.philosophy?.eyebrow || "Our Philosophy"}</div>
          <h2 className="section-title">{aboutData?.philosophy?.title || "Driven by Innovation, Defined by Impact."}</h2>
        </div>

        <div className="philosophy-grid">
          {(() => {
            const philosophyCards = aboutData?.philosophy?.cards && aboutData.philosophy.cards.length > 0 ? aboutData.philosophy.cards : [
              { chip: "#01", title: "Artistry Meets Code", desc: "We combine high-end fashion editorial aesthetics with ultra-fast modern web technology to build experiences that stun visitors and convert instantly." },
              { chip: "#02", title: "Data-Backed Growth", desc: "Every brand identity, website layout, and marketing funnel is engineered with clear metrics, ROI tracking, and performance optimization." },
              { chip: "#03", title: "Unmatched Speed", desc: "From initial design sprint to full production deployment, we deliver lightning-fast execution without compromising an inch of visual quality." }
            ];
            
            return philosophyCards.map((card: any, i: number) => (
              <div className="philosophy-card" key={i}>
                <div className="phil-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    {i % 3 === 0 && <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />}
                    {i % 3 === 1 && <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />}
                    {i % 3 === 2 && <><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></>}
                  </svg>
                </div>
                <span className="card-chip">{card.chip}</span>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            ));
          })()}
        </div>
      </section>

      {/* SLEEK INTERACTIVE TIMELINE SECTION */}
      <section className="timeline-section-sleek">
        <div className="timeline-inner">
          <div className="section-header-center">
            <div className="eyebrow light"><span className="dot"></span>Our Growth Trajectory</div>
            <h2 className="section-title light">The Journey of We Brand.</h2>
          </div>

          <div className="timeline-nav-tabs">
            {rawTimeline.map((item: any) => (
              <button
                key={item.year}
                className={`t-nav-btn ${activeTimeline === item.year ? "active" : ""}`}
                onClick={() => setActiveTimeline(item.year)}
              >
                {item.year}
              </button>
            ))}
          </div>

          <div className="timeline-display-card">
            <div className="td-header">
              <span className="td-chip">{currentTimeline.chip}</span>
              <span className="td-year-tag">{activeTimeline}</span>
            </div>
            <h3>{currentTimeline.title}</h3>
            <p>{currentTimeline.desc}</p>
            <div className="td-stat-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              <span>{currentTimeline.stats}</span>
            </div>
          </div>
        </div>
      </section>

      {/* CREATIVE MINDS / TEAM */}
      <section className="team-section">
        <div className="section-header-center">
          <div className="eyebrow dark"><span className="dot"></span>{aboutData?.team?.eyebrow || "Creative Minds"}</div>
          <h2 className="section-title">{aboutData?.team?.title || "The Masterminds Behind We Brand."}</h2>
        </div>

        <div className="team-grid">
          {(() => {
            const teamMembers = aboutData?.team?.members && aboutData.team.members.length > 0 ? aboutData.team.members : [
              { name: "Abinash M", role: "Founder & Creative Director", bio: "Visionary design strategist leading brand transformations and high-impact digital experiences.", image: { url: null }, fallbackImg: "/about/team_founder.png" },
              { name: "Sowmiya R", role: "Lead UX & Product Designer", bio: "Master of intuitive user interfaces, design systems, and human-centric interaction design.", image: { url: null }, fallbackImg: "/about/team_designer.png" },
              { name: "Karthik Raja", role: "Head of Web Engineering", bio: "Full-stack architect specializing in ultra-fast Next.js apps, animation engines, and cloud solutions.", image: { url: null }, fallbackImg: "/about/hero_studio.png" }
            ];

            return teamMembers.map((member: any, i: number) => (
              <div className="team-card" key={i}>
                <div className="team-img-wrap">
                  <img src={member.image?.url ? `${process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3002'}${member.image.url}` : (member.fallbackImg || "/about/hero_studio.png")} alt={member.name} />
                  <div className="team-role-tag">{member.role}</div>
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <p>{member.bio}</p>
                </div>
              </div>
            ));
          })()}
        </div>
      </section>

      {/* INNOVATIVE CONTACT CALLOUT */}
      <section className="innovative-contact about-contact-callout">
        <div className="innovative-contact-box" id="innovative-contact-box">
          <div className="inc-left">
            <div className="inc-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="none" />
              </svg>
            </div>
            <div className="inc-text">
              <h3>{aboutData?.contactCta?.title || "Ready to transform your brand into a digital powerhouse?"}</h3>
              <p>{aboutData?.contactCta?.desc || "Connect with our creative strategists today and let's craft something unforgettable."}</p>
            </div>
          </div>
          <div className="inc-right">
            <a href={aboutData?.contactCta?.buttonUrl || "/contact-us"} className="inc-btn">{aboutData?.contactCta?.buttonText || "Get In Touch"}</a>
            <a href={aboutData?.contactCta?.buttonUrl || "/contact-us"} className="inc-arrow-btn" aria-label={aboutData?.contactCta?.buttonText || "Get In Touch"}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="19" x2="19" y2="5"></line>
                <polyline points="9 5 19 5 19 15"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
