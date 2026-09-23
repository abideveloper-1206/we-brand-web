"use client";

import React, { useEffect, useState } from "react";
import Lenis from "lenis";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import api from "@/utils/api";

export default function SubPageLayout({ 
  children,
  heroContent
}: { 
  children: React.ReactNode,
  heroContent?: React.ReactNode
}) {
  const [headerLinks, setHeaderLinks] = useState([
    { label: "About Us", url: "/about-us" },
    { label: "Services", url: "/services" },
    { label: "Portfolio", url: "/portfolio" },
    { label: "Reviews", url: "/#testimonials" },
  ]);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    // Fetch Header from CMS
    api.get('/api/globals/header')
      .then(res => res.data)
      .then(data => {
        if (data && data.navItems && data.navItems.length > 0) {
          setHeaderLinks(data.navItems);
        }
        if (data && data.logo) {
          const resolvedLogoUrl = data.logo.s3Url || (data.logo.url ? `${process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3002'}${data.logo.url}` : null);
          if (resolvedLogoUrl) setLogoUrl(resolvedLogoUrl);
        }
      })
      .catch(console.error);
    // Lenis smooth scroll
    const lenis = new Lenis({ smoothWheel: true });
    function raf(t: number) { lenis.raf(t); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    window.scrollTo(0, 0);

    let lockCount = 0;
    function lockScroll() {
      lockCount++;
      lenis.stop();
      document.documentElement.classList.add("locked");
      document.body.classList.add("locked");
    }
    function unlockScroll() {
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0) {
        lenis.start();
        document.documentElement.classList.remove("locked");
        document.body.classList.remove("locked");
      }
    }

    // Menu Logic
    const menuEl = document.getElementById("menu");
    const menuLinks = document.querySelectorAll("#menu .menu-nav a");

    function openMenu() {
      if (!menuEl) return;
      menuEl.classList.add("open");
      lockScroll();
      menuLinks.forEach((a, i) => {
        setTimeout(() => a.classList.add("in"), 120 + i * 70);
      });
    }
    function closeMenu() {
      if (!menuEl) return;
      menuEl.classList.remove("open");
      unlockScroll();
      menuLinks.forEach(a => a.classList.remove("in"));
    }

    const burger = document.getElementById("burger");
    if (burger) {
      burger.addEventListener("click", openMenu);
    }
    
    document.querySelectorAll("[data-close-menu]").forEach(b => b.addEventListener("click", closeMenu));

    const bookBtn = document.getElementById("menu-book-btn");
    if (bookBtn) {
      bookBtn.addEventListener("click", () => {
        closeMenu();
        setTimeout(() => { window.location.href = "/contact-us"; }, 200);
      });
    }

    menuLinks.forEach(a => {
      a.addEventListener("click", (e) => {
        const href = a.getAttribute("href");
        if (href && href.startsWith("/")) {
          closeMenu();
          window.location.href = href;
        } else if (href && href.startsWith("#")) {
          // If it's a hash link on a subpage, navigate to home then hash, or just close
          closeMenu();
          window.location.href = "/" + href;
        }
      });
    });

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (menuEl?.classList.contains("open")) closeMenu();
      }
    };
    window.addEventListener("keydown", handleKeydown);

    return () => {
      if (burger) burger.removeEventListener("click", openMenu);
      window.removeEventListener("keydown", handleKeydown);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="portfolio-page-wrapper">
      
        {/* MENU OVERLAY */}
      <div id="menu">

        <div className="backdrop" data-close-menu></div>
        <div className="panel">
          <div className="menu-inner">
            <div className="menu-top">
              <div className="brand-mark">
                {logoUrl ? (
                  <>
                    <img src={logoUrl} alt="We Brand" style={{ maxHeight: '40px', objectFit: 'contain', marginRight: '8px' }} />
                    <span>We Brand</span>
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M4.8 5.6A9 9 0 0 0 4.8 18.4" /><path d="M19.2 5.6a9 9 0 0 1 0 12.8" /></svg>
                    <span>We Brand</span>
                  </>
                )}
              </div>
              <button className="icon-close" data-close-menu aria-label="Close menu"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg></button>
            </div>
            <nav className="menu-nav" id="menu-nav">
              {headerLinks.map((link, i) => (
                <a key={i} href={link.url}>{link.label}</a>
              ))}
            </nav>
            <div className="menu-bottom">
              <button className="pill-btn light" id="menu-book-btn">Let's Talk <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
              <nav className="menu-social"><a href="#">Instagram</a><a href="#">LinkedIn</a><a href="#">Facebook</a></nav>
            </div>
          </div>
        </div>
      </div>

      {heroContent && (
        <section className="portfolio-hero-container">
          <div className="portfolio-hero">
            <Header logoUrl={logoUrl} />

            <div className="portfolio-hero-bg-overlay"></div>
            <div className="portfolio-hero-content">
              {heroContent}
            </div>
          </div>
        </section>
      )}

      {children}

      <Footer />
    </main>
  );
}
