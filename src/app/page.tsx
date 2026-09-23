"use client";

import React, { useEffect, useState } from "react";
import Lenis from "lenis";
import AnimatedStats from "@/components/AnimatedStats";
import WorkflowProcess from "@/components/WorkflowProcess";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PortfolioVideoTicker from "@/components/PortfolioVideoTicker";
import { Service, fetchServices, services as initialServices } from "@/data/services";
import api from "@/utils/api";

import heroImg1 from "@/assets/Hero-sec-images/image-1.png";
import heroImg2 from "@/assets/Hero-sec-images/image-2.png";
import heroImg3 from "@/assets/Hero-sec-images/image-3.png";
import heroImg4 from "@/assets/Hero-sec-images/image-4.png";
import heroImg5 from "@/assets/Hero-sec-images/image-5.png";
import heroImg6 from "@/assets/Hero-sec-images/image-6.png";

const waveIcons = [
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" /><line x1="16" y1="8" x2="2" y2="22" /><line x1="17.5" y1="15" x2="9" y2="6.5" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
];

export default function Page() {
  const [headerLinks, setHeaderLinks] = useState([
    { label: "About Us", url: "/about-us" },
    { label: "Services", url: "/services" },
    { label: "Portfolio", url: "/portfolio" },
    { label: "Reviews", url: "/#testimonials" },
  ]);

  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoFetched, setLogoFetched] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [heroData, setHeroData] = useState<{
    subtitle?: string;
    title?: string;
    images?: (string | null)[];
    avatars?: (string | null)[];
    statsCount?: string;
    statsText?: string;
    ctaText?: string;
    ctaUrl?: string;
  } | null>(null);
  const [statsData, setStatsData] = useState<{
    bgImage?: string | null;
    items?: {
      number: number;
      suffix: string;
      label: string;
    }[];
  } | null>(null);

  const [aboutData, setAboutData] = useState<{
    leftBadge?: {
      percent: string;
      caption: string;
    };
    rightCard?: {
      badge: string;
      title: string;
      description: string;
    };
    carousel?: {
      headline: string[];
      img: string;
      name: string;
      role: string;
      alt: string;
    }[];
  } | null>(null);

  const [contactBannerData, setContactBannerData] = useState<{
    heading?: string;
    subtext?: string;
    ctaText?: string;
    ctaUrl?: string;
  } | null>(null);

  const [expertiseData, setExpertiseData] = useState<{
    eyebrow?: string;
    heading?: string;
    headingHighlight?: string;
    description?: string;
    visualText?: string;
    tabs?: {
      tabId: string;
      label: string;
      image?: string;
      imageAlt?: string;
      visualText?: string;
    }[];
  } | null>(null);

  const [portfolioData, setPortfolioData] = useState<{
    iconImage?: string;
    title?: string;
    description?: string;
    cards?: {
      image?: string;
      imageAlt?: string;
      cardTitle: string;
      cardDesc?: string;
      style?: string;
    }[];
  } | null>(null);

  const [whyChooseData, setWhyChooseData] = useState<{
    eyebrow?: string;
    title?: string;
    items?: {
      val: string;
      lbl: string;
      icon?: string;
    }[];
  } | null>(null);

  const [testimonialsData, setTestimonialsData] = useState<{
    eyebrow?: string;
    title?: string;
    items?: {
      quote: string;
      name: string;
      role: string;
    }[];
  } | null>(null);

  const [workflowData, setWorkflowData] = useState<{
    title?: string;
    tabs?: {
      tabName: string;
      steps: {
        title: string;
        desc: string;
        img?: string;
      }[];
    }[];
  } | null>(null);

  const [faqData, setFaqData] = useState<{
    eyebrow?: string;
    title?: string;
    items?: { question: string; answer: string }[];
  } | null>(null);

  const [servicesData, setServicesData] = useState<Service[]>(initialServices);
  const [servicesSectionData, setServicesSectionData] = useState<{
    eyebrow?: string;
    titleLine1?: string;
    titleLine2?: string;
  } | null>(null);

  const [preFooterCtaData, setPreFooterCtaData] = useState<{
    line1?: string;
    line2?: string;
    line3?: string;
    buttonText?: string;
    buttonUrl?: string;
  } | null>(null);

  const aboutDataRef = React.useRef(aboutData);

  useEffect(() => {
    aboutDataRef.current = aboutData;
    if (aboutData?.carousel && typeof window !== 'undefined') {
      const trustDotsEl = document.getElementById("trust-dots");
      const nextBtn = document.getElementById("trust-next");
      if (nextBtn) {
        const coachImg = document.getElementById("coach-img") as HTMLImageElement;
        const slide = aboutData.carousel[0];
        if (coachImg && slide) {
          coachImg.src = slide.img;
          coachImg.alt = slide.alt;
          const coachName = document.getElementById("coach-name");
          const coachRole = document.getElementById("coach-role");
          if (coachName) coachName.textContent = slide.name;
          if (coachRole) coachRole.textContent = slide.role;
        }
        if (trustDotsEl) {
          trustDotsEl.innerHTML = "";
          aboutData.carousel.forEach((_, i) => {
            const b = document.createElement("button");
            b.innerHTML = '<span class="bar"></span>';
            b.setAttribute("aria-current", i === 0 ? "true" : "false");
            trustDotsEl.appendChild(b);
          });
        }
      }
    }
  }, [aboutData]);

  useEffect(() => {
    fetchServices().then(data => {
      if (data && data.length > 0) {
        setServicesData(data);
      }
    });

    // Fetch Header from CMS
    api.get('/api/globals/header')
      .then(res => res.data)
      .then(data => {
        if (data && data.navItems && data.navItems.length > 0) {
          setHeaderLinks(data.navItems);
        }
        if (data && data.logo) {
          // Prefer S3 direct URL if available (AWS storage enabled), else use CMS proxy
          const resolvedLogoUrl = data.logo.s3Url || (data.logo.url ? `${process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3002'}${data.logo.url}` : null);
          if (resolvedLogoUrl) setLogoUrl(resolvedLogoUrl);
        }
        setLogoFetched(true); // fetch done — now show logo or fallback, no flash
      })
      .catch(() => {
        setLogoFetched(true); // even on error, show fallback
      });

    // Fetch Home Settings from CMS
    api.get('/api/globals/home')
      .then(res => res.data)
      .then(data => {
        if (data) {
          if (data.hero) {
            const cmsImages = data.hero.images?.map((imgObj: any) => {
              if (!imgObj.image) return null;
              return imgObj.image.s3Url || (imgObj.image.url ? `${process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3002'}${imgObj.image.url}` : null);
            }) || [];
            const cmsAvatars = data.hero.avatars?.map((imgObj: any) => {
              if (!imgObj.image) return null;
              return imgObj.image.s3Url || (imgObj.image.url ? `${process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3002'}${imgObj.image.url}` : null);
            }) || [];

            setHeroData({
              subtitle: data.hero.subtitle || undefined,
              title: data.hero.title || undefined,
              images: cmsImages,
              avatars: cmsAvatars,
              statsCount: data.hero.statsCount || undefined,
              statsText: data.hero.statsText || undefined,
              ctaText: data.hero.ctaText || undefined,
              ctaUrl: data.hero.ctaUrl || undefined,
            });
          }

          if (data.stats) {
            const cmsStatsBg = data.stats.bgImage?.s3Url || (data.stats.bgImage?.url ? `${process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3002'}${data.stats.bgImage.url}` : null);
            const cmsStatsItems = data.stats.items?.map((item: any) => ({
              number: Number(item.number) || 0,
              suffix: item.suffix || "+",
              label: item.label || "",
            })) || [];

            setStatsData({
              bgImage: cmsStatsBg,
              items: cmsStatsItems,
            });
          }

          if (data.about) {
            const cmsCarousel = data.about.carousel?.map((slide: any) => ({
              headline: [slide.word1, slide.word2, slide.word3, slide.word4],
              img: slide.image?.s3Url || (slide.image?.url ? `${process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3002'}${slide.image.url}` : ''),
              name: slide.locationName || '',
              role: slide.locationRole || '',
              alt: slide.locationName || '',
            })) || [];

            setAboutData({
              leftBadge: data.about.leftBadge ? {
                percent: data.about.leftBadge.percent || '100%',
                caption: data.about.leftBadge.caption || '',
              } : undefined,
              rightCard: data.about.rightCard ? {
                badge: data.about.rightCard.badge || '#01',
                title: data.about.rightCard.title || '',
                description: data.about.rightCard.description || '',
              } : undefined,
              carousel: cmsCarousel.length > 0 ? cmsCarousel : undefined,
            });
          }

          if (data.contactBanner) {
            setContactBannerData({
              heading: data.contactBanner.heading || undefined,
              subtext: data.contactBanner.subtext || undefined,
              ctaText: data.contactBanner.ctaText || undefined,
              ctaUrl: data.contactBanner.ctaUrl || undefined,
            });
          }

          if (data.expertise) {
            const cmsTabs = data.expertise.tabs?.map((t: any) => ({
              tabId: t.tabId || '',
              label: t.label || '',
              image: t.image?.s3Url || (t.image?.url ? `${process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3002'}${t.image.url}` : undefined),
              imageAlt: t.imageAlt || t.label || '',
              visualText: t.visualText || '',
            })) || [];
            setExpertiseData({
              eyebrow: data.expertise.eyebrow || undefined,
              heading: data.expertise.heading || undefined,
              headingHighlight: data.expertise.headingHighlight || undefined,
              description: data.expertise.description || undefined,
              visualText: data.expertise.visualText || undefined,
              tabs: cmsTabs.length > 0 ? cmsTabs : undefined,
            });
          }

          if (data.portfolio) {
            const cmsIconImg = data.portfolio.iconImage?.s3Url || (data.portfolio.iconImage?.url ? `${process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3002'}${data.portfolio.iconImage.url}` : undefined);
            const cmsCards = data.portfolio.cards?.map((c: any) => ({
              image: c.image?.s3Url || (c.image?.url ? `${process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3002'}${c.image.url}` : undefined),
              imageAlt: c.imageAlt || c.cardTitle || '',
              cardTitle: c.cardTitle || '',
              cardDesc: c.cardDesc || '',
              style: c.style || 'clay',
            })) || [];
            setPortfolioData({
              iconImage: cmsIconImg,
              title: data.portfolio.title || undefined,
              description: data.portfolio.description || undefined,
              cards: cmsCards.length > 0 ? cmsCards : undefined,
            });
          }

          if (data.whyChoose) {
            const cmsItems = data.whyChoose.items?.map((item: any) => ({
              val: item.val || '',
              lbl: item.lbl || '',
              icon: item.icon?.s3Url || (item.icon?.url ? `${process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3002'}${item.icon.url}` : undefined),
            })) || [];
            setWhyChooseData({
              eyebrow: data.whyChoose.eyebrow || undefined,
              title: data.whyChoose.title || undefined,
              items: cmsItems.length > 0 ? cmsItems : undefined,
            });
          }

          if (data.testimonials) {
            const cmsTestimonials = data.testimonials.items?.map((item: any) => ({
              quote: item.quote || '',
              name: item.name || '',
              role: item.role || '',
            })) || [];
            setTestimonialsData({
              eyebrow: data.testimonials.eyebrow || undefined,
              title: data.testimonials.title || undefined,
              items: cmsTestimonials.length > 0 ? cmsTestimonials : undefined,
            });
          }

          if (data.workflow) {
            const cmsTabs = data.workflow.tabs?.map((tab: any) => ({
              tabName: tab.tabName || '',
              steps: tab.steps?.map((step: any) => ({
                title: step.title || '',
                desc: step.desc || '',
                img: step.image?.s3Url || (step.image?.url ? `${process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3002'}${step.image.url}` : undefined),
              })) || [],
            })) || [];
            
            setWorkflowData({
              title: data.workflow.title || undefined,
              tabs: cmsTabs.length > 0 ? cmsTabs : undefined,
            });
          }

          if (data.faq) {
            const cmsItems = data.faq.items?.map((item: any) => ({
              question: item.question || '',
              answer: item.answer || '',
            })) || [];
            setFaqData({
              eyebrow: data.faq.eyebrow || undefined,
              title: data.faq.title || undefined,
              items: cmsItems.length > 0 ? cmsItems : undefined,
            });
          }

          if (data.preFooterCta) {
            setPreFooterCtaData({
              line1: data.preFooterCta.line1 || undefined,
              line2: data.preFooterCta.line2 || undefined,
              line3: data.preFooterCta.line3 || undefined,
              buttonText: data.preFooterCta.buttonText || undefined,
              buttonUrl: data.preFooterCta.buttonUrl || undefined,
            });
          }

          if (data.servicesSection) {
            setServicesSectionData({
              eyebrow: data.servicesSection.eyebrow || undefined,
              titleLine1: data.servicesSection.titleLine1 || undefined,
              titleLine2: data.servicesSection.titleLine2 || undefined,
            });
          }
        }
      })
      .catch(console.error);


    // Basic setup variables
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Font scaling
    const FONT_BASE = 16, BASE_W = 1920, COEF = 0.6666;
    function scaleFont() {
      const reduction = ((BASE_W - innerWidth) / BASE_W) * 100 * COEF;
      const size = FONT_BASE - (FONT_BASE * reduction) / 100;
      if (size > FONT_BASE) document.documentElement.style.fontSize = size + "px";
      else document.documentElement.style.removeProperty("font-size");
    }
    scaleFont();
    window.addEventListener("resize", scaleFont);

    // Lenis scroll
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

    // Spring engine
    class Spring {
      tension: number; friction: number; value: number; velocity: number; target: number; active: boolean;
      apply?: (v: number) => void;

      constructor(tension = 200, friction = 26) {
        this.tension = tension; this.friction = friction;
        this.value = 0; this.velocity = 0; this.target = 0; this.active = false;
      }
      set(t: number) { this.target = t; this.active = true; }
      step(dt: number) {
        const force = -this.tension * (this.value - this.target) - this.friction * this.velocity;
        this.velocity += force * dt;
        this.value += this.velocity * dt;
        if (Math.abs(this.value - this.target) < 0.0008 && Math.abs(this.velocity) < 0.0008) {
          this.value = this.target; this.velocity = 0; this.active = false;
        }
        return this.value;
      }
    }

    const springs: Spring[] = [];
    let lastT: number | null = null;
    let animFrame: number;

    function springLoop(t: number) {
      if (lastT === null) lastT = t;
      const dt = Math.min((t - lastT) / 1000, 0.064);
      lastT = t;
      for (const s of springs) { if (s.active && s.apply) s.apply(s.step(dt)); }
      runParallax();
      runServiceStack();
      animFrame = requestAnimationFrame(springLoop);
    }
    animFrame = requestAnimationFrame(springLoop);

    function progressReveal(el: HTMLElement, { fromY = 0, fromScale = 1, fromOpacity = 0, tension = 200, friction = 26 } = {}) {
      el.style.opacity = fromOpacity.toString();
      el.style.transform = `translateY(${fromY}px) scale(${fromScale})`;
      const sp = new Spring(tension, friction);
      sp.apply = (v) => {
        const y = fromY * (1 - v);
        const scale = fromScale + (1 - fromScale) * v;
        const o = fromOpacity + (1 - fromOpacity) * v;
        el.style.opacity = o.toString();
        el.style.transform = `translateY(${y}px) scale(${scale})`;
      };
      springs.push(sp);
      return sp;
    }

    function inviewOnce(el: HTMLElement, opts: any) {
      const delay = parseFloat(el.dataset.delay || opts.delay || "0");
      const sp = progressReveal(el, opts);
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => { sp.set(1); }, reduceMotion ? 0 : delay);
            io.unobserve(el);
          }
        });
      }, { threshold: 0.15 });
      io.observe(el);
      return sp;
    }

    // Clip-mask helpers
    function wrapClipLines(container: HTMLElement, lines: string[], { stagger = 120, baseDelay = 0, duration = 950, padBottom = "0.14em" } = {}) {
      container.innerHTML = "";
      const inners: HTMLElement[] = [];
      lines.forEach((text, i) => {
        const box = document.createElement("span");
        box.className = "clip-box";
        box.style.paddingBottom = padBottom;
        const inner = document.createElement("span");
        inner.className = "clip-inner";
        inner.textContent = text;
        inner.style.transitionDuration = duration + "ms";
        inner.style.transitionDelay = (baseDelay + i * stagger) + "ms";
        box.appendChild(inner);
        container.appendChild(box);
        inners.push(inner);
      });
      return inners;
    }

    function wrapClipWords(container: HTMLElement, text: string, { stagger = 140, baseDelay = 0, duration = 1100 } = {}) {
      container.innerHTML = "";
      const words = text.split(" ");
      const inners: HTMLElement[] = [];
      words.forEach((w, i) => {
        if (i > 0) container.appendChild(document.createTextNode(" "));
        const box = document.createElement("span");
        box.className = "word-clip";
        const inner = document.createElement("span");
        inner.className = "wi";
        inner.textContent = w;
        inner.style.transitionDuration = duration + "ms";
        inner.style.transitionDelay = (baseDelay + i * stagger) + "ms";
        box.appendChild(inner);
        container.appendChild(box);
        inners.push(inner);
      });
      return inners;
    }

    function wrapFadeWords(container: HTMLElement, text: string, { stagger = 28, baseDelay = 250, duration = 700 } = {}) {
      container.innerHTML = "";
      const words = text.split(" ");
      const spans: HTMLElement[] = [];
      words.forEach((w, i) => {
        if (i > 0) container.appendChild(document.createTextNode(" "));
        const s = document.createElement("span");
        s.className = "fade-word";
        s.textContent = w;
        s.style.transitionDuration = duration + "ms";
        s.style.transitionDelay = (baseDelay + i * stagger) + "ms";
        container.appendChild(s);
        spans.push(s);
      });
      return spans;
    }

    function fire(spans: HTMLElement[]) { requestAnimationFrame(() => requestAnimationFrame(() => spans.forEach(s => s.classList.add("in")))); }

    // Static Texts
    const heroTaglineEl = document.getElementById("hero-tagline");
    let heroTaglineLines: HTMLElement[] = [];
    if (heroTaglineEl) {
      heroTaglineLines = wrapClipLines(heroTaglineEl, ["From branding and website design to digital marketing", "and app development, We Brand Media helps businesses", "in Coimbatore establish a powerful online presence."], { stagger: 110, baseDelay: 350, duration: 900 });
    }

    const heroTitleEl = document.getElementById("hero-title");
    let heroTitleWords: HTMLElement[] = [];
    if (heroTitleEl) {
      heroTitleWords = wrapClipLines(heroTitleEl, ["We Build Brands That", "Drive Real Business Growth"], { stagger: 140, baseDelay: 0, duration: 1100 });
    }

    // Programs title now handled dynamically in JSX

    const fTitle = document.getElementById("facilities-title");
    if (fTitle) wrapClipLines(fTitle, ["Transforming Ideas", "Into Digital", "Experiences"], { stagger: 120, duration: 950 });

    const pInners = document.querySelectorAll("#programs-title .clip-inner");
    if (pInners.length) fire(Array.from(pInners) as HTMLElement[]);
    const fInners = document.querySelectorAll("#facilities-title .clip-inner");
    if (fInners.length) fire(Array.from(fInners) as HTMLElement[]);

    const fBody = document.getElementById("facilities-body");
    if (fBody) wrapFadeWords(fBody, "Every project reflects our commitment to creativity, innovation, and measurable business results.", { stagger: 28, baseDelay: 250, duration: 700 });

    const sTitle = document.getElementById("stats-title");
    if (sTitle) wrapClipLines(sTitle, ["Why Choose", "We Brand Media"], { stagger: 120, duration: 950 });

    const tTitle = document.getElementById("testimonials-title");
    if (tTitle) wrapClipLines(tTitle, ["Trusted by", "Growing Brands"], { stagger: 120, duration: 950 });

    const ctaTitle = document.getElementById("footer-cta-title");
    if (ctaTitle) wrapClipLines(ctaTitle, ["Ready to", "Grow Your Business?"], { stagger: 120, duration: 950 });

    const modalTitle = document.getElementById("modal-title");
    if (modalTitle) wrapClipLines(modalTitle, ["Get a Free", "Consultation"], { stagger: 90, duration: 800 });

    function ioClipFire(container: HTMLElement | null) {
      if (!container) return;
      const els = Array.from(container.querySelectorAll(".clip-inner, .fade-word")) as HTMLElement[];
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) { fire(els); io.unobserve(container); }
        });
      }, { threshold: 0.2 });
      io.observe(container);
    }

    ioClipFire(document.getElementById("programs-title")?.parentElement || null);
    ioClipFire(document.getElementById("facilities-title")?.parentElement || null);
    ioClipFire(document.getElementById("stats-title")?.parentElement || null);
    ioClipFire(document.getElementById("testimonials-title")?.parentElement || null);
    ioClipFire(document.getElementById("footer-cta-title")?.parentElement || null);

    // Inview reveals
    const pb = document.getElementById("percent-badge");
    if (pb) inviewOnce(pb, { fromScale: 0.9, tension: 220, friction: 22 });

    const bc = document.getElementById("badge-card");
    if (bc) inviewOnce(bc, { fromY: 24, tension: 200, friction: 26 });

    const cf = document.getElementById("coach-figure");
    if (cf) inviewOnce(cf, { fromY: 60, fromScale: 0.92, tension: 170, friction: 26 });

    const fi = document.getElementById("facilities-icon");
    if (fi) inviewOnce(fi, { fromScale: 0.85, tension: 240, friction: 20 });

    const fcb = document.getElementById("footer-cta-btn");
    if (fcb) { fcb.dataset.delay = "150"; inviewOnce(fcb, { fromY: 20, tension: 200, friction: 24 }); }

    const icb = document.getElementById("innovative-contact-box");
    if (icb) inviewOnce(icb, { fromY: 40, tension: 190, friction: 26 });

    const pfb = document.getElementById("pre-footer-box");
    if (pfb) inviewOnce(pfb, { fromY: 40, tension: 190, friction: 26 });

    document.querySelectorAll(".program-row").forEach(el => {
      inviewOnce(el as HTMLElement, { fromY: 26, tension: 190, friction: 26 });
    });
    document.querySelectorAll(".court-tile").forEach(el => {
      inviewOnce(el as HTMLElement, { fromY: 48, tension: 180, friction: 26 });
    });
    document.querySelectorAll(".stat-cell").forEach(el => {
      inviewOnce(el as HTMLElement, { fromY: 30, tension: 180, friction: 24 });
    });
    document.querySelectorAll(".testi-card").forEach(el => {
      inviewOnce(el as HTMLElement, { fromY: 40, tension: 180, friction: 26 });
      const hEl = el as HTMLElement;
      hEl.addEventListener("pointerenter", () => { if (matchMedia("(min-width:769px)").matches) hEl.style.transform = "translateY(-8px)"; });
      hEl.addEventListener("pointerleave", () => { hEl.style.transform = ""; });
    });

    // Loader logic
    const loaderEl = document.getElementById("loader");
    const loaderMark = document.querySelector(".loader-mark");
    const loaderFill = document.querySelector(".loader-fill") as HTMLElement;
    lockScroll();
    requestAnimationFrame(() => {
      loaderMark?.classList.add("in");
      if (loaderFill) loaderFill.style.transform = "scaleX(1)";
    });

    const MIN_VISIBLE_MS = reduceMotion ? 200 : 1400;
    const MAX_VISIBLE_MS = reduceMotion ? 200 : 2600;
    const EXIT_MS = reduceMotion ? 0 : 850;

    let ready = false;
    let loaderExitTimeout: NodeJS.Timeout;

    function onReady() {
      if (ready) return;
      ready = true;
      unlockScroll();
      loaderEl?.classList.add("exit");
      loaderExitTimeout = setTimeout(() => { loaderEl?.remove(); }, EXIT_MS);
      playHeroReveal();
    }

    function startCountdown() { setTimeout(onReady, MIN_VISIBLE_MS); }
    if (document.readyState === "complete") { startCountdown(); }
    else { window.addEventListener("load", startCountdown, { once: true }); }
    setTimeout(onReady, MAX_VISIBLE_MS);

    function playHeroReveal() {
      if (heroTitleWords.length) fire(heroTitleWords);
      if (heroTaglineLines.length) fire(heroTaglineLines);
      const cc = document.getElementById("collection-card");
      if (cc && cc.closest(".collection-slider")) {
        inviewOnce(cc.closest(".collection-slider") as HTMLElement, { fromY: 28, tension: 200, friction: 26, delay: 650 });
      }
      startCollectionAutoplay();
    }

    // Parallax
    function scrollProgress(el: HTMLElement) {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = vh + rect.height;
      return Math.min(1, Math.max(0, (vh - rect.top) / total));
    }

    const heroParallaxEl = document.getElementById("hero-parallax");
    const heroSection = document.getElementById("hero");
    const ghostWords = document.querySelectorAll(".ghost-word");
    const ghostParallaxRanges = [[-3, 3], [3, -3], [-2, 4], [4, -3]];

    function runParallax() {
      if (heroParallaxEl && heroSection) {
        const p = scrollProgress(heroSection);
        heroParallaxEl.style.transform = `translateY(${p * 12}%)`;
      }
      const trustSection = document.getElementById("trust");
      if (trustSection && ghostWords.length) {
        const p = scrollProgress(trustSection);
        ghostWords.forEach((w, i) => {
          const [from, to] = ghostParallaxRanges[i];
          const x = from + (to - from) * p;
          const base = (w as HTMLElement).dataset.baseTransform || "";
          (w as HTMLElement).style.transform = `${base} translateX(${x}%)`;
        });
      }
    }

    // Sticky service stack: cards float up and cover the previous one as the user scrolls
    function runServiceStack() {
      const rows = document.querySelectorAll(".service-row");
      if (!rows.length) return;
      if (!window.matchMedia("(min-width: 768px)").matches) return;
      const topPx = parseFloat(getComputedStyle(rows[0]).top);
      if (!isFinite(topPx)) return;
      const range = Math.max(window.innerHeight * 0.8, 1);
      for (let i = 0; i < rows.length - 1; i++) {
        const next = rows[i + 1] as HTMLElement;
        const dist = next.getBoundingClientRect().top - topPx;
        const depress = Math.min(1, Math.max(0, 1 - dist / range));
        (rows[i] as HTMLElement).style.setProperty("--stack-depress", depress.toFixed(3));
      }
    }

    // Hero Collection Slider
    const collectionSlides = [
      { img: "https://images.unsplash.com/photo-1542744094-24638ea0b4b6?auto=format&fit=crop&q=80&w=200", brand: "Case Study", title: "Brand Identity", cta: "View Project", alt: "Brand strategy meeting" },
      { img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=200", brand: "Web Design", title: "E-Commerce", cta: "View Live Site", alt: "Website wireframes" },
      { img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=200", brand: "Marketing", title: "Social Campaign", cta: "View Metrics", alt: "Social media campaign" },
    ];
    let collIndex = 0;
    const collCardEl = document.getElementById("collection-card");
    const collDotsEl = document.getElementById("collection-dots");

    function renderCollectionCard() {
      const s = collectionSlides[collIndex];
      if (collCardEl) {
        collCardEl.innerHTML = `
          <img src="${s.img}" alt="${s.alt}" loading="lazy" />
          <div class="collection-text">
            <div class="collection-brand">${s.brand}</div>
            <div class="collection-title">${s.title}</div>
            <a href="#portfolio" class="collection-cta">${s.cta} →</a>
          </div>`;
      }
    }

    function renderCollectionDots() {
      if (!collDotsEl) return;
      collDotsEl.innerHTML = "";
      collectionSlides.forEach((_, i) => {
        const b = document.createElement("button");
        b.innerHTML = '<span class="bar"></span>';
        b.setAttribute("aria-current", i === collIndex ? "true" : "false");
        b.addEventListener("click", () => { collIndex = i; crossfadeCollection(); resetAutoplay(); });
        collDotsEl.appendChild(b);
      });
    }

    function crossfadeCollection() {
      const sp = new Spring(210, 24);
      sp.apply = (v) => {
        if (collCardEl) {
          collCardEl.style.opacity = v.toString();
          collCardEl.style.transform = `translateY(${16 * (1 - v)}px) scale(${0.96 + 0.04 * v})`;
        }
      };
      sp.value = 0; sp.target = 0;
      if (collCardEl) collCardEl.style.opacity = "0";
      renderCollectionCard();
      renderCollectionDots();
      springs.push(sp);
      requestAnimationFrame(() => sp.set(1));
    }

    renderCollectionCard();
    renderCollectionDots();
    let collectionTimer: NodeJS.Timeout;
    function startCollectionAutoplay() {
      collectionTimer = setInterval(() => {
        collIndex = (collIndex + 1) % collectionSlides.length;
        crossfadeCollection();
      }, 3800);
    }
    function resetAutoplay() {
      clearInterval(collectionTimer);
      collectionTimer = setInterval(() => {
        collIndex = (collIndex + 1) % collectionSlides.length;
        crossfadeCollection();
      }, 3800);
    }

    // Trust Carousel
    const defaultTrustSlides = [
      { headline: ["Impactful", "Creative", "Modern", "Design"], img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600", name: "Coimbatore", role: "Tamil Nadu, India", alt: "Team collaborating" },
      { headline: ["Measurable", "Digital", "Business", "Growth"], img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=600", name: "Data Driven", role: "Performance Focus", alt: "Analytics dashboard" },
    ];
    const getTrustSlides = () => {
      return aboutDataRef.current?.carousel || defaultTrustSlides;
    };
    let trustIndex = 0;
    const ghostSlots = document.querySelectorAll(".ghost-word");
    const coachImg = document.getElementById("coach-img") as HTMLImageElement;
    const coachName = document.getElementById("coach-name");
    const coachRole = document.getElementById("coach-role");
    const trustDotsEl = document.getElementById("trust-dots");

    function renderGhostWords() {
      const slidesList = getTrustSlides();
      const slide = slidesList[trustIndex] || slidesList[0];
      if (!slide) return;
      ghostSlots.forEach((slot, i) => {
        slot.innerHTML = "";
        const inner = document.createElement("span");
        inner.className = "clip-inner";
        inner.textContent = slide.headline[i] || "";
        inner.style.transitionDuration = "700ms";
        inner.style.paddingBottom = "0.12em";
        (slot as HTMLElement).style.overflow = "hidden";
        (slot as HTMLElement).style.display = "inline-block";
        slot.appendChild(inner);
        requestAnimationFrame(() => requestAnimationFrame(() => inner.classList.add("in")));
      });
    }

    function renderCoach(fade: boolean) {
      const slidesList = getTrustSlides();
      const slide = slidesList[trustIndex] || slidesList[0];
      if (!coachImg || !slide) return;
      if (fade) {
        const sp = new Spring(260, 26);
        sp.apply = (v) => { coachImg.style.opacity = v.toString(); };
        coachImg.style.opacity = "0";
        springs.push(sp);
        setTimeout(() => {
          coachImg.src = slide.img;
          coachImg.alt = slide.alt;
          if (coachName) coachName.textContent = slide.name;
          if (coachRole) coachRole.textContent = slide.role;
          sp.set(1);
        }, 60);
      } else {
        coachImg.src = slide.img;
        coachImg.alt = slide.alt;
        if (coachName) coachName.textContent = slide.name;
        if (coachRole) coachRole.textContent = slide.role;
      }
    }

    function renderTrustDots() {
      if (!trustDotsEl) return;
      trustDotsEl.innerHTML = "";
      const slidesList = getTrustSlides();
      slidesList.forEach((_, i) => {
        const b = document.createElement("button");
        b.innerHTML = '<span class="bar"></span>';
        b.setAttribute("aria-current", i === trustIndex ? "true" : "false");
        b.addEventListener("click", () => { trustIndex = i; updateTrust(); });
        trustDotsEl.appendChild(b);
      });
    }

    function updateTrust(fade = true) {
      renderGhostWords();
      renderCoach(fade);
      renderTrustDots();
      const coachFig = document.getElementById("coach-figure");
      if (coachFig && fade) coachFig.classList.add("in");
    }

    document.getElementById("trust-prev")?.addEventListener("click", () => {
      const slidesList = getTrustSlides();
      trustIndex = (trustIndex - 1 + slidesList.length) % slidesList.length;
      updateTrust();
    });
    document.getElementById("trust-next")?.addEventListener("click", () => {
      const slidesList = getTrustSlides();
      trustIndex = (trustIndex + 1) % slidesList.length;
      updateTrust();
    });
    updateTrust(false);

    const trustElem = document.getElementById("about");
    if (trustElem) {
      const trustIO = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            renderGhostWords();
            setTimeout(() => {
              const coachFig = document.getElementById("coach-figure");
              if (coachFig) coachFig.classList.add("in");
            }, 2000);
            trustIO.unobserve(trustElem);
          }
        });
      }, { threshold: 0.2 });
      trustIO.observe(trustElem);
    }

    // Contact Form Logic
    const contactForm = document.getElementById("contact-form") as HTMLFormElement;
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const nameVal = (document.getElementById("f-name") as HTMLInputElement)?.value.trim();
        const msgVal = (document.getElementById("f-msg") as HTMLInputElement)?.value.trim();

        if (!nameVal || !msgVal) {
          alert("Please fill in your name and message.");
          return;
        }

        const text = `Hi We Brand Media! I'm ${nameVal}.\n\n${msgVal}`;
        const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(text)}`;

        window.open(whatsappUrl, '_blank');
        contactForm.reset();
      });
    }

    // Menu Logic
    const menuEl = document.getElementById("menu");
    const menuLinks = document.querySelectorAll(".menu-nav a");

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

    document.getElementById("burger")?.addEventListener("click", openMenu);
    document.querySelectorAll("[data-close-menu]").forEach(b => b.addEventListener("click", closeMenu));

    document.getElementById("menu-book-btn")?.addEventListener("click", () => {
      closeMenu();
      setTimeout(() => { const target = document.querySelector("#contact"); if (target) lenis.scrollTo(target as HTMLElement); }, 200);
    });

    menuLinks.forEach(a => {
      a.addEventListener("click", (e) => {
        const href = a.getAttribute("href");
        if (href && href.startsWith("/")) {
          closeMenu();
          window.location.href = href;
        } else if (href && href.startsWith("#")) {
          e.preventDefault();
          const target = document.querySelector(href);
          closeMenu();
          setTimeout(() => { if (target) lenis.scrollTo(target as HTMLElement); }, 200);
        }
      });
    });

    document.querySelectorAll(".hdr-left a").forEach(a => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const href = a.getAttribute("href");
        const target = href ? document.querySelector(href) : null;
        if (target) lenis.scrollTo(target as HTMLElement);
      });
    });

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (menuEl?.classList.contains("open")) closeMenu();
      }
    };
    window.addEventListener("keydown", handleKeydown);

    // FAQ Accordion Logic using Event Delegation
    const handleFaqClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const btn = target.closest(".faq-question");
      if (btn) {
        const item = btn.closest(".faq-item");
        if (item) {
          const isActive = item.classList.contains("active");
          document.querySelectorAll(".faq-item").forEach(faq => faq.classList.remove("active"));
          if (!isActive) item.classList.add("active");
        }
      }
    };
    document.addEventListener("click", handleFaqClick);

    // Expertise Tabs Logic using Event Delegation
    const handleExpertiseClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const btn = target.closest(".expertise-tab");
      if (btn) {
        const tabId = btn.getAttribute("data-tab");
        if (tabId) {
          // Update buttons
          document.querySelectorAll(".expertise-tab").forEach(t => t.classList.remove("active"));
          btn.classList.add("active");

          // Update images
          document.querySelectorAll(".expertise-img").forEach(img => img.classList.remove("active"));
          const activeImg = document.getElementById(`img-${tabId}`);
          if (activeImg) activeImg.classList.add("active");

          // Update visual text
          document.querySelectorAll(".expertise-visual-text").forEach(txt => {
            txt.classList.remove("active");
            (txt as HTMLElement).style.display = "none";
          });
          const activeTxt = document.getElementById(`text-${tabId}`);
          if (activeTxt) {
            activeTxt.classList.add("active");
            (activeTxt as HTMLElement).style.display = "block";
          }
        }
      }
    };
    document.addEventListener("click", handleExpertiseClick);

    // Coach figure click zoom animation
    const handleCoachClick = () => {
      const fig = document.getElementById("coach-figure");
      if (fig) {
        fig.classList.add("click-zoom");
        setTimeout(() => fig.classList.remove("click-zoom"), 300);
      }
    };
    const coachFigElem = document.getElementById("coach-figure");
    if (coachFigElem) coachFigElem.addEventListener("click", handleCoachClick);

    // Wave Animation Loop
    let waveAnimFrame: number;
    const waveTrack = document.getElementById("wave-track");
    if (waveTrack) {
      const waveIconsNode = waveTrack.querySelectorAll(".wave-icon");
      const updateWave = () => {
        const centerX = window.innerWidth / 2;
        const maxAmplitude = 120;
        const waveWidth = Math.max(window.innerWidth, 1000);
        waveIconsNode.forEach((icon: any) => {
          const rect = icon.getBoundingClientRect();
          const iconCenterX = rect.left + rect.width / 2;
          let norm = (iconCenterX - centerX) / (waveWidth / 1.5);
          if (norm > 1) norm = 1;
          if (norm < -1) norm = -1;
          const y = -(norm * norm) * maxAmplitude;
          icon.style.transform = `translateY(${y}px)`;
        });
        waveAnimFrame = requestAnimationFrame(updateWave);
      };
      updateWave();
    }

    // Custom Cursor tracking logic
    const cursorDot = document.getElementById("custom-cursor");
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorDot) {
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
      }
    };
    const handleMouseOverInteractive = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, input, .hero-img-card")) {
        cursorDot?.classList.add("hovering");
      } else {
        cursorDot?.classList.remove("hovering");
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOverInteractive);

    // Hero Sticky Scroll & 6 Image Animation Logic
    const heroStickyTrack = document.getElementById("hero-sticky-track");
    const imgCards = [
      document.getElementById("hero-img-1"),
      document.getElementById("hero-img-2"),
      document.getElementById("hero-img-3"),
      document.getElementById("hero-img-4"),
      document.getElementById("hero-img-5"),
      document.getElementById("hero-img-6"),
      document.getElementById("hero-img-7"),
      document.getElementById("hero-img-8"),
    ];

    const siteHeaderEl = document.querySelector(".site-header") as HTMLElement;

    function runHeroImageAnimation() {
      if (!heroStickyTrack) return;
      
      // Disable animation on mobile
      if (window.innerWidth < 768) {
        imgCards.forEach(img => { if (img) img.style.display = "none"; });
        if (siteHeaderEl) {
          siteHeaderEl.style.transform = "translateY(0)";
          siteHeaderEl.style.opacity = "1";
        }
        return;
      } else {
        imgCards.forEach(img => { if (img) img.style.display = "block"; });
      }

      const rect = heroStickyTrack.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const rawP = -rect.top / totalScrollable;
      const p = Math.min(1, Math.max(0, rawP));

      // Header smoothly moves upwards
      if (siteHeaderEl) {
        const headerP = Math.min(1, p / 0.15);
        siteHeaderEl.style.transform = `translateY(-${headerP * 120}%)`;
        siteHeaderEl.style.opacity = (1 - headerP).toString();
      }

      // Set 1 (Starts in view, moves up)
      if (imgCards[0]) {
        const p1 = Math.min(1, Math.max(0, p / 0.35));
        const y = 18 - p1 * 100; 
        const opacity = 1 - Math.max(0, (p1 - 0.8) * 5);
        imgCards[0].style.transform = `translate3d(8vw, ${y}vh, 0) rotate(-12deg) scale(1)`;
        imgCards[0].style.opacity = opacity.toString();
      }
      if (imgCards[1]) {
        const p1 = Math.min(1, Math.max(0, p / 0.35));
        const y = 28 - p1 * 100;
        const opacity = 1 - Math.max(0, (p1 - 0.8) * 5);
        imgCards[1].style.transform = `translate3d(72vw, ${y}vh, 0) rotate(14deg) scale(1)`;
        imgCards[1].style.opacity = opacity.toString();
      }

      // Center Blur 1
      if (imgCards[6]) {
        const pC1 = Math.min(1, Math.max(0, (p - 0.15) / 0.35));
        const y = 60 - pC1 * 70; 
        const opacity = pC1 > 0 ? (1 - Math.max(0, (pC1 - 0.8) * 5)) * Math.min(1, pC1 * 3) : 0;
        imgCards[6].style.transform = `translate3d(40vw, ${y}vh, 0) rotate(-5deg) scale(1.2)`;
        imgCards[6].style.opacity = (opacity * 0.6).toString();
        imgCards[6].style.filter = "blur(20px)";
      }

      // Set 2 (Moves from bottom to top)
      if (imgCards[2]) {
        const p2 = Math.min(1, Math.max(0, (p - 0.25) / 0.4));
        const y = 100 - p2 * 150; 
        const rot = -6 + p2 * 4;
        const opacity = p2 > 0 ? (1 - Math.max(0, (p2 - 0.8) * 5)) * Math.min(1, p2 * 3) : 0;
        imgCards[2].style.transform = `translate3d(12vw, ${y}vh, 0) rotate(${rot}deg) scale(1)`;
        imgCards[2].style.opacity = opacity.toString();
      }
      if (imgCards[3]) {
        const p2 = Math.min(1, Math.max(0, (p - 0.25) / 0.4));
        const y = 110 - p2 * 160; 
        const rot = 8 - p2 * 6;
        const opacity = p2 > 0 ? (1 - Math.max(0, (p2 - 0.8) * 5)) * Math.min(1, p2 * 3) : 0;
        imgCards[3].style.transform = `translate3d(70vw, ${y}vh, 0) rotate(${rot}deg) scale(1)`;
        imgCards[3].style.opacity = opacity.toString();
      }

      // Center Blur 2
      if (imgCards[7]) {
        const pC2 = Math.min(1, Math.max(0, (p - 0.45) / 0.35));
        const y = 70 - pC2 * 80; 
        const opacity = pC2 > 0 ? (1 - Math.max(0, (pC2 - 0.8) * 5)) * Math.min(1, pC2 * 3) : 0;
        imgCards[7].style.transform = `translate3d(45vw, ${y}vh, 0) rotate(8deg) scale(1.3)`;
        imgCards[7].style.opacity = (opacity * 0.6).toString();
        imgCards[7].style.filter = "blur(20px)";
      }

      // Set 3 (Moves from bottom to top)
      if (imgCards[4]) {
        const p3 = Math.min(1, Math.max(0, (p - 0.55) / 0.4));
        const y = 100 - p3 * 150; 
        const rot = -10 + p3 * 8;
        const opacity = p3 > 0 ? (1 - Math.max(0, (p3 - 0.8) * 5)) * Math.min(1, p3 * 3) : 0;
        imgCards[4].style.transform = `translate3d(15vw, ${y}vh, 0) rotate(${rot}deg) scale(1)`;
        imgCards[4].style.opacity = opacity.toString();
      }
      if (imgCards[5]) {
        const p3 = Math.min(1, Math.max(0, (p - 0.55) / 0.4));
        const y = 105 - p3 * 140; 
        const rot = 12 - p3 * 5;
        const opacity = p3 > 0 ? (1 - Math.max(0, (p3 - 0.8) * 5)) * Math.min(1, p3 * 3) : 0;
        imgCards[5].style.transform = `translate3d(68vw, ${y}vh, 0) rotate(${rot}deg) scale(1)`;
        imgCards[5].style.opacity = opacity.toString();
      }
    }

    // Initial position call & scroll binding via lenis/raf
    runHeroImageAnimation();
    lenis.on("scroll", runHeroImageAnimation);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOverInteractive);
      if (waveAnimFrame) cancelAnimationFrame(waveAnimFrame);
      if (coachFigElem) coachFigElem.removeEventListener("click", handleCoachClick);
      document.removeEventListener("click", handleFaqClick);
      document.removeEventListener("click", handleExpertiseClick);
      window.removeEventListener("keydown", handleKeydown);
      cancelAnimationFrame(animFrame);
      clearInterval(collectionTimer);
      clearTimeout(loaderExitTimeout);
      window.removeEventListener("resize", scaleFont);
    };

  }, []);

  const getHeroImgSrc = (index: number, fallback: any) => {
    if (heroData?.images && heroData.images[index]) {
      return heroData.images[index];
    }
    return fallback.src;
  };

  const img1 = getHeroImgSrc(0, heroImg1);
  const img2 = getHeroImgSrc(1, heroImg2);
  const img3 = getHeroImgSrc(2, heroImg3);
  const img4 = getHeroImgSrc(3, heroImg4);
  const img5 = getHeroImgSrc(4, heroImg5);
  const img6 = getHeroImgSrc(5, heroImg6);

  const titleText = heroData?.title || "Design Agency.";
  const titleWords = titleText.split(" ");

  return (
    <>
      {/* CUSTOM BLUE DOT CURSOR */}
      <div className="custom-cursor" id="custom-cursor"></div>

      {/* LOADER - blank until fetch resolves (~200ms), then shows logo or "We Brand" fallback */}
      <div id="loader">
        <div className="loader-mark">
          {logoFetched && (
            logoUrl && !logoError ? (
              <img src={logoUrl} alt="We Brand" style={{ maxHeight: '48px', maxWidth: '160px', objectFit: 'contain' }} onError={() => setLogoError(true)} />
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <circle cx="12" cy="12" r="9" /><path d="M4.8 5.6A9 9 0 0 0 4.8 18.4" /><path d="M19.2 5.6a9 9 0 0 1 0 12.8" />
                </svg>
                <span>We Brand</span>
              </>
            )
          )}
        </div>
        <div className="loader-track"><div className="loader-fill"></div></div>
      </div>

      <main>
        {/* STICKY HERO SECTION WRAPPER */}
        <div className="hero-sticky-container" id="hero-sticky-track">
          <section className="hero" id="hero">
            <div className="hero-plate-overlay"></div>

            {/* HEADER */}
            <Header logoUrl={logoUrl} />

            {/* FLOATING & ANIMATING IMAGES (3 SETS + 2 BLURRED) */}
            <div className="hero-floating-images">
              {/* Set 1 */}
              <div className="hero-img-card" id="hero-img-1">
                <img src={img1} alt="Hero portrait 1" />
              </div>
              <div className="hero-img-card" id="hero-img-2">
                <img src={img2} alt="Hero portrait 2" />
              </div>
              {/* Set 2 */}
              <div className="hero-img-card" id="hero-img-3">
                <img src={img3} alt="Hero portrait 3" />
              </div>
              <div className="hero-img-card" id="hero-img-4">
                <img src={img4} alt="Hero portrait 4" />
              </div>
              {/* Set 3 */}
              <div className="hero-img-card" id="hero-img-5">
                <img src={img5} alt="Hero portrait 5" />
              </div>
              <div className="hero-img-card" id="hero-img-6">
                <img src={img6} alt="Hero portrait 6" />
              </div>
              
              {/* Center Blurs */}
              <div className="hero-img-card blur-center" id="hero-img-7">
                <img src={img2} alt="Center Blur 1" />
              </div>
              <div className="hero-img-card blur-center" id="hero-img-8">
                <img src={img4} alt="Center Blur 2" />
              </div>
            </div>

            {/* HERO CENTER CONTENT */}
            <div className="hero-center-wrapper">
              <div className="hero-eyebrow-text">
                {heroData?.subtitle ? (
                  heroData.subtitle.split('\n').map((line, idx) => (
                    <React.Fragment key={idx}>
                      {idx > 0 && <br />}
                      {line}
                    </React.Fragment>
                  ))
                ) : (
                  <>
                    Best-in-class local<br />benefits for everyone, everywhere
                  </>
                )}
              </div>
              <h1 className="hero-main-title hover-title-wave" aria-label={titleText}>
                {titleWords.map((word, wordIdx) => {
                  const prevCharsCount = titleWords.slice(0, wordIdx).reduce((acc, w) => acc + w.length + 1, 0);
                  return (
                    <React.Fragment key={wordIdx}>
                      {wordIdx > 0 && <>&nbsp;</>}
                      <span className="hover-word">
                        {word.split("").map((char, charIdx) => (
                          <span 
                            key={charIdx} 
                            className="hover-char" 
                            style={{ "--char-i": prevCharsCount + charIdx } as React.CSSProperties}
                          >
                            {char}
                          </span>
                        ))}
                      </span>
                    </React.Fragment>
                  );
                })}
              </h1>
            </div>

            {/* HERO BOTTOM BAR */}
            <div className="hero-bottom-bar">
              <div className="hero-avatars-group">
                <div className="avatar-stack">
                  {heroData?.avatars && heroData.avatars.length > 0 ? (
                    heroData.avatars.map((avatar, idx) => {
                      if (!avatar) return null;
                      return <img key={idx} src={avatar} alt={`User ${idx + 1}`} className="avatar-img" />;
                    })
                  ) : (
                    <>
                      <img src={heroImg1.src} alt="User 1" className="avatar-img" />
                      <img src={heroImg2.src} alt="User 2" className="avatar-img" />
                      <img src={heroImg3.src} alt="User 3" className="avatar-img" />
                    </>
                  )}
                  <div className="avatar-plus-btn">+</div>
                </div>
                <div className="avatar-info">
                  <span className="avatar-count">{heroData?.statsCount || "2500+"}</span>
                  <span className="avatar-sub">{heroData?.statsText || "Engaged and counting"}</span>
                </div>
              </div>

              <a href={heroData?.ctaUrl || "#portfolio"} className="explore-projects-btn">
                {(heroData?.ctaText || "Explore Our Projects").replace(/\s*(->|→)\s*$/, '')}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1.25rem', height: '1.25rem', display: 'inline-block', verticalAlign: 'middle', transition: 'transform 0.3s ease' }}>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
          </section>
        </div>

        {/* INFINITE ANIMATED SERVICES TICKER */}
        <section className="services-marquee">
          <div className="marquee-track">
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

        {/* ANIMATED STATS (FULL WIDTH BG) */}
        <AnimatedStats statsData={statsData ?? undefined} />

        {/* ABOUT (TRUST) */}
        <section className="trust" id="about">
          <div className="trust-badges">
            <div className="percent-badge iv" id="percent-badge">
              <div className="num">{aboutData?.leftBadge?.percent || "100%"}</div>
              <div className="cap">{aboutData?.leftBadge?.caption || "Creative strategies tailored to your brand"}</div>
            </div>
            <div className="badge-card iv" id="badge-card">
              <div className="badge-chip">{aboutData?.rightCard?.badge || "#01"}</div>
              <div>
                <h3>{aboutData?.rightCard?.title || "Your Trusted Digital Marketing Agency"}</h3>
                <p style={{ whiteSpace: 'pre-line' }}>{aboutData?.rightCard?.description || "We Brand Media is a creative branding and digital marketing agency based in Coimbatore, helping startups, local businesses, entrepreneurs, educational institutions, and growing brands build a strong digital presence."}</p>
              </div>
            </div>
          </div>

          <div style={{ position: 'relative', marginTop: '5rem', marginBottom: '6rem' }}>
            <h2 className="ghost-heading" id="ghost-heading">
              <div className="ghost-row"><span className="ghost-word" data-slot="0"></span><span className="ghost-word" data-slot="1"></span></div>
              <div className="ghost-row"><span className="ghost-word ink" data-slot="2"></span><span className="ghost-word" data-slot="3"></span></div>
            </h2>

            <div className="coach-wrap">
              <figure className="coach-figure" id="coach-figure">
                <img id="coach-img" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="" loading="lazy" />
                <figcaption className="coach-caption">
                  <div className="name" id="coach-name"></div>
                  <div className="role" id="coach-role"></div>
                </figcaption>
              </figure>
            </div>
          </div>

          <div className="trust-controls">
            <button className="arrow-btn outline prev" id="trust-prev" aria-label="Previous">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
            <div className="dots dark" id="trust-dots"></div>
            <button className="arrow-btn solid" id="trust-next" aria-label="Next">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section className="services-section" id="services">
          <div className="services-container">
            <div className="services-header">
              <div className="eyebrow dark"><span className="dot"></span>{servicesSectionData?.eyebrow || 'Our Services'}</div>
              <h2 className="services-title" id="programs-title">
                <span className="clip-box" style={{ paddingBottom: '0.14em' }}>
                  <span className="clip-inner" style={{ transitionDuration: '950ms', transitionDelay: '0ms' }}>{servicesSectionData?.titleLine1 || 'Complete Digital Solutions'}</span>
                </span>
                <span className="clip-box" style={{ paddingBottom: '0.14em' }}>
                  <span className="clip-inner" style={{ transitionDuration: '950ms', transitionDelay: '120ms' }}>{servicesSectionData?.titleLine2 || 'Under One Roof'}</span>
                </span>
              </h2>
            </div>

            <div className="services-list">
              {servicesData.map((srv, i) => (
                <article
                  key={i}
                  className="service-row"
                  style={{ "--row-accent": srv.accent, "--row-tint": srv.tint, "--row-delay": (i % 4) * 0.45, zIndex: i + 1 } as React.CSSProperties}
                >
                  <div className="service-row-media">
                    <img src={srv.image} alt={srv.title} loading="lazy" />
                  </div>
                  <div className="service-row-content">
                    <span className="service-row-index">{String(i + 1).padStart(2, "0")}</span>
                    <h3>{srv.title}</h3>
                    <p>{srv.shortDescription || (srv as any).desc}</p>
                    <a href={`/services/${srv.slug}`} className="service-row-cta" aria-label={`Explore ${srv.title}`}>
                      <span>Explore</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* INNOVATIVE CONTACT (BELOW SERVICES) */}
        <section className="innovative-contact">
          <div className="innovative-contact-box iv" id="innovative-contact-box">
            <div className="inc-left">
              <div className="inc-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="none" />
                </svg>
              </div>
              <div className="inc-text">
                <h3>{contactBannerData?.heading || "We're getting a feeling you like us already!"}</h3>
                <p>{contactBannerData?.subtext || "Our doors (and video call links!) are open. Choose the way you'd like to chat, and we'll be there!"}</p>
              </div>
            </div>
            <div className="inc-right">
              <a href={contactBannerData?.ctaUrl || "/contact-us"} className="inc-btn">{contactBannerData?.ctaText || "Contact us."}</a>
              <a href={contactBannerData?.ctaUrl || "/contact-us"} className="inc-arrow-btn" aria-label="Contact Us">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="19" x2="19" y2="5"></line><polyline points="9 5 19 5 19 15"></polyline></svg>
              </a>
            </div>
          </div>
        </section>

        {/* WAVE ANIMATION SECTION */}
        <section className="wave-section">
          <div className="wave-container">
            <div className="wave-track" id="wave-track">
              {[...waveIcons, ...waveIcons, ...waveIcons].map((icon, i) => (
                <div key={i} className="wave-icon">{icon}</div>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERTISE SECTION */}
        <section className="expertise-section" id="expertise">
          <div className="expertise-header">
            <div className="eyebrow light"><span className="dot"></span>{expertiseData?.eyebrow || 'Our Expertise'}</div>
            <h2 className="expertise-title">
              {(() => {
                const fullHeading = expertiseData?.heading || 'Assuring seamless Digital Marketing & Brand Building solutions';
                const highlight = expertiseData?.headingHighlight || 'Digital Marketing & Brand Building';
                const idx = fullHeading.indexOf(highlight);
                if (idx === -1) return fullHeading;
                return <>{fullHeading.slice(0, idx)}<span className="highlight">{highlight}</span>{fullHeading.slice(idx + highlight.length)}</>;
              })()}
            </h2>
            <p className="expertise-desc">
              {expertiseData?.description || 'With over a decade of experience, we have served 250+ brands across 10+ countries and delivered 350+ projects — consistently helping our clients hit (and exceed) their brand marketing goals.'}
            </p>
          </div>

          <div className="expertise-container">
            <div className="expertise-tabs">
              {(expertiseData?.tabs || [
                { tabId: 'web', label: 'Web & Mobile Development' },
                { tabId: 'brand', label: 'Branding & Design' },
                { tabId: 'video', label: 'Video Content Production' },
                { tabId: 'social', label: 'Social Media Marketing' },
              ]).map((tab, i) => (
                <button key={tab.tabId} className={`expertise-tab${i === 0 ? ' active' : ''}`} data-tab={tab.tabId}>
                  <span>{tab.label}</span>
                  <div className="tab-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></div>
                </button>
              ))}
            </div>

            <div className="expertise-visual-wrap">
              <div className="expertise-visual">
                {(expertiseData?.tabs || [
                  { tabId: 'web', label: 'Web & Mobile Development', image: '/expertise.png', imageAlt: 'Web Development', visualText: 'We craft web & mobile solutions tailored to your business goals.' },
                  { tabId: 'brand', label: 'Branding & Design', image: '/branding.png', imageAlt: 'Branding', visualText: 'We craft brand identities that speak your story — visually, emotionally, and memorably.' },
                  { tabId: 'video', label: 'Video Content Production', image: '/dashboard.png', imageAlt: 'Video Content', visualText: 'We create high-impact video content that engages your audience.' },
                  { tabId: 'social', label: 'Social Media Marketing', image: '/ecommerce.png', imageAlt: 'Social Media', visualText: 'We drive brand growth and community engagement across social channels.' },
                ]).map((tab, i) => (
                  <img
                    key={tab.tabId}
                    src={tab.image || '/expertise.png'}
                    alt={tab.imageAlt || tab.label}
                    className={`expertise-img${i === 0 ? ' active' : ''}`}
                    id={`img-${tab.tabId}`}
                    loading="lazy"
                  />
                ))}
              </div>
              {(expertiseData?.tabs || [
                { tabId: 'web', label: 'Web & Mobile Development', visualText: 'We craft web & mobile solutions tailored to your business goals.' },
                { tabId: 'brand', label: 'Branding & Design', visualText: 'We craft brand identities that speak your story — visually, emotionally, and memorably.' },
                { tabId: 'video', label: 'Video Content Production', visualText: 'We create high-impact video content that engages your audience.' },
                { tabId: 'social', label: 'Social Media Marketing', visualText: 'We drive brand growth and community engagement across social channels.' },
              ]).map((tab, i) => (
                <div
                  key={tab.tabId}
                  className={`expertise-visual-text${i === 0 ? ' active' : ''}`}
                  id={`text-${tab.tabId}`}
                  style={{ display: i === 0 ? 'block' : 'none' }}
                >
                  {tab.visualText || 'We craft brand identities that speak your story — visually, emotionally, and memorably.'}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PORTFOLIO (FACILITIES) */}
        <section className="facilities" id="portfolio">
          <div className="facilities-grid">
            <div className="facilities-intro">
              <div className="facilities-icon iv" id="facilities-icon">
                <img
                  src={portfolioData?.iconImage || '/dashboard.png'}
                  alt="Portfolio icon"
                  loading="lazy"
                />
              </div>
              <h2 id="facilities-title" style={{ whiteSpace: 'pre-line' }}>
                {portfolioData?.title || 'Transforming Ideas\nInto Digital\nExperiences'}
              </h2>
              <p id="facilities-body">
                {portfolioData?.description || 'Every project reflects our commitment to creativity, innovation, and measurable business results.'}
              </p>
            </div>
            <div className="court-cards">
              {(portfolioData?.cards || [
                { image: '/ecommerce.png', imageAlt: 'E-Commerce project', cardTitle: 'E-Commerce Platforms', cardDesc: 'High conversion retail experiences built to scale.', style: 'clay' },
                { image: '/branding.png', imageAlt: 'Brand Identity project', cardTitle: 'Brand Identity', cardDesc: 'Memorable visuals that communicate core values.', style: 'blue' },
              ]).map((card, i) => (
                <figure
                  key={i}
                  className={`court-tile${i > 0 ? ' second' : ''} iv`}
                  id={`court-${i + 1}`}
                  data-delay={i * 140}
                >
                  <img src={card.image || '/ecommerce.png'} alt={card.imageAlt || card.cardTitle} loading="lazy" />
                  <figcaption className={`court-caption ${card.style || 'clay'}`}>
                    <div className="name">{card.cardTitle}</div>
                    <div className="desc">{card.cardDesc}</div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US (STATS) */}
        <section className="stats">
          <div className="eyebrow light"><span className="dot"></span>{whyChooseData?.eyebrow || 'Why choose us'}</div>
          <h2 id="stats-title">{whyChooseData?.title || 'Why Choose We Brand Media'}</h2>
          <dl className="stats-grid">
            {(() => {
              // Fallback SVG icons by position — used when CMS item has no uploaded icon
              const fallbackIcons = [
                <svg key="0" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>,
                <svg key="1" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>,
                <svg key="2" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>,
                <svg key="3" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
                <svg key="4" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>,
                <svg key="5" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>,
                <svg key="6" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>,
                <svg key="7" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>,
              ];

              const items = whyChooseData?.items || [
                { val: "Transparent", lbl: "Communication throughout" },
                { val: "Fast",        lbl: "Turnaround time" },
                { val: "Modern",      lbl: "Technology standards" },
                { val: "SEO",         lbl: "Focused development" },
                { val: "Data",        lbl: "Driven campaigns" },
                { val: "Local",       lbl: "Market expertise" },
                { val: "Long-Term",   lbl: "Growth strategies" },
                { val: "100%",        lbl: "Client satisfaction" },
              ];

              return items.map((stat: any, i: number) => (
                <div key={i} className="stat-cell iv" data-delay={i * 60}>
                  <dt className="sr-only">{stat.lbl}</dt>
                  <dd className="val" style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <span style={{ color: "#fff", display: "inline-flex" }}>
                      {stat.icon ? (
                        <img src={stat.icon} alt={stat.val} style={{ width: 28, height: 28, objectFit: 'contain' }} />
                      ) : (
                        fallbackIcons[i % fallbackIcons.length]
                      )}
                    </span>
                    {stat.val}
                  </dd>
                  <dd className="label">{stat.lbl}</dd>
                </div>
              ));
            })()}
          </dl>
        </section>

        <PortfolioVideoTicker />
        {/* TESTIMONIALS */}
        <section className="testimonials" id="testimonials">
          <div className="eyebrow dark"><span className="dot"></span>{testimonialsData?.eyebrow || 'What clients say'}</div>
          <h2 id="testimonials-title">{testimonialsData?.title || 'Trusted by Growing Brands'}</h2>
          <ul className="testi-grid">
            {(testimonialsData?.items || [
              { quote: "They completely transformed our brand identity. Our online presence has never been stronger.", name: "Arun Kumar", role: "Startup Founder" },
              { quote: "The website they built us is fast, modern, and actually drives leads to our sales team.", name: "Meera S.", role: "Marketing Director" },
              { quote: "Incredible ROI on our paid campaigns. We Brand Media truly understands the local market in Coimbatore.", name: "Ramesh V.", role: "Retail Business Owner" },
            ]).map((testi, i) => (
              <li key={i}>
                <article className="testi-card iv" data-delay={i * 120}>
                  <div>
                    <div className="testi-quote">&ldquo;</div>
                    <blockquote>{testi.quote}</blockquote>
                  </div>
                  <figcaption className="testi-fig"><div className="name">{testi.name}</div><div className="role">{testi.role}</div></figcaption>
                </article>
              </li>
            ))}
          </ul>
        </section>

        {/* WORKFLOW PROCESS */}
        <WorkflowProcess title={workflowData?.title} tabs={workflowData?.tabs} />

        <section className="faq-section" id="faq">
          <div className="eyebrow dark"><span className="dot"></span>{faqData?.eyebrow || 'Got Questions?'}</div>
          <h2 className="faq-title">{faqData?.title || 'Frequently Asked Questions'}</h2>
          <div className="faq-accordion">
            {(faqData?.items || [
              { question: 'What services does We Brand Media offer?', answer: 'We offer a full suite of digital services including Branding & Identity, Website & App Development, Social Media Management, SEO, and Performance Marketing to help your business grow online.' },
              { question: 'How long does it take to build a custom website?', answer: 'A standard custom website usually takes 3 to 6 weeks from strategy and design to development and launch. Complex web applications may take longer depending on features and integrations.' },
              { question: 'Do you work with startups and small businesses?', answer: 'Absolutely! We love helping startups and local businesses in Coimbatore and beyond establish a strong digital footprint. We tailor our strategies to fit your specific goals and budget.' },
              { question: 'Do you provide ongoing support after launch?', answer: 'Yes, we offer ongoing maintenance, website hosting, and continuous digital marketing campaigns to ensure your brand keeps growing and performing optimally post-launch.' },
            ]).map((item, i) => (
              <div key={i} className="faq-item">
                <button className="faq-question">
                  <span>{item.question}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 9l6 6 6-6" /></svg>
                </button>
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* PRE-FOOTER CONTACT */}
        <section className="pre-footer-contact">
          <div className="pre-footer-inner iv" id="pre-footer-box">
            <h2>
              {preFooterCtaData?.line1 || 'IDEA?'}<br />
              {preFooterCtaData?.line2 || 'STOP THINKING.'}<br />
              {preFooterCtaData?.line3 || 'START GROWING'}
            </h2>
            <div className="pre-footer-action">
              <a href={preFooterCtaData?.buttonUrl || '/contact-us'} className="pfc-btn">
                {preFooterCtaData?.buttonText || 'Contact Us'}
              </a>
              <a href={preFooterCtaData?.buttonUrl || '/contact-us'} className="pfc-arrow" aria-label={preFooterCtaData?.buttonText || 'Contact Us'}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="19" x2="19" y2="5"></line><polyline points="9 5 19 5 19 15"></polyline></svg>
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <Footer />

      </main>

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
    </>
  );
}
