"use client";

import React, { useState, useEffect } from "react";
import { services, fetchServices, Service } from "@/data/services";
import api from "@/utils/api";

export default function Footer() {
  const [footerData, setFooterData] = useState({
    companyLinks: [
      { label: 'About Us', url: '/about-us' },
      { label: 'Services', url: '/services' },
      { label: 'Portfolio', url: '/portfolio' },
      { label: 'Contact Us', url: '/contact-us' },
    ],
    bottomLinks: [
      { label: 'Privacy', url: '/privacy' },
      { label: 'Terms', url: '/terms' },
    ],
    socialLinks: [
      { platform: 'Instagram', url: '#' },
      { platform: 'LinkedIn', url: '#' },
      { platform: 'Facebook', url: '#' },
      { platform: 'WhatsApp', url: '#' },
    ],
    description: 'Creative branding and digital marketing agency based in Coimbatore, helping brands build a strong digital presence.',
    email: 'hello@webrandmedia.com',
    phone: '+91 98765 43210',
    address: 'Coimbatore, Tamil Nadu',
    logoUrl: null as string | null,
  });

  const [dynamicServices, setDynamicServices] = useState<Service[]>([]);

  useEffect(() => {
    fetchServices().then(setDynamicServices).catch(console.error);
    api.get('/api/globals/footer')
      .then(res => res.data)
      .then(data => {
        if (data) {
          setFooterData(prev => ({
            companyLinks: data.companyLinks?.length > 0 ? data.companyLinks : prev.companyLinks,
            bottomLinks: data.bottomLinks?.length > 0 ? data.bottomLinks : prev.bottomLinks,
            socialLinks: data.socialLinks?.length > 0 ? data.socialLinks : prev.socialLinks,
            description: data.description || prev.description,
            email: data.email || prev.email,
            phone: data.phone || prev.phone,
            address: data.address || prev.address,
            logoUrl: data.logo ? (data.logo.s3Url || (data.logo.url ? `${process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3002'}${data.logo.url}` : prev.logoUrl)) : prev.logoUrl,
          }));
        }
      })
      .catch(console.error);
  }, []);

  return (
    <footer className="site-footer">
      <div className="footer-cols">
        <div className="footer-brand">
          <div className="brand-mark">
            {footerData.logoUrl ? (
              <>
                <img src={footerData.logoUrl} alt="We Brand" style={{ maxHeight: '40px', objectFit: 'contain', marginRight: '8px' }} />
                <span>We Brand</span>
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M4.8 5.6A9 9 0 0 0 4.8 18.4" />
                  <path d="M19.2 5.6a9 9 0 0 1 0 12.8" />
                </svg>
                <span>We Brand</span>
              </>
            )}
          </div>
          <p>{footerData.description}</p>
          <address>
            <a href={`mailto:${footerData.email}`}>{footerData.email}</a>
            <a href={`tel:${footerData.phone?.replace(/\s/g, '')}`}>{footerData.phone}</a>
            <span className="muted">{footerData.address}</span>
          </address>
        </div>

        <nav className="footer-nav">
          <h4>Services</h4>
          <ul>
            {dynamicServices.map((srv) => (
              <li key={srv.id}>
                <a href={`/services/${srv.slug}`}>{srv.title}</a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer-nav">
          <h4>Company</h4>
          <ul>
            {footerData.companyLinks.map((link, i) => (
              <li key={i}><a href={link.url}>{link.label}</a></li>
            ))}
          </ul>
        </nav>

        <div className="footer-newsletter">
          <h4>Newsletter</h4>
          <p>Subscribe for our latest news and resources.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Email Address" required />
            <button type="submit" aria-label="Subscribe">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
          </form>
          <div className="footer-socials">
            {footerData.socialLinks.map((link, i) => (
              <a key={i} href={link.url} aria-label={link.platform}>
                {link.platform === 'Instagram' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>}
                {link.platform === 'LinkedIn' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>}
                {link.platform === 'Facebook' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>}
                {link.platform === 'WhatsApp' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div>© 2026 We Brand Media. All rights reserved.</div>
        <nav>
          {footerData.bottomLinks.map((link, i) => (
            <a key={i} href={link.url}>{link.label}</a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
