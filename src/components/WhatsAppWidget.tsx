"use client";

import { useState, useEffect } from "react";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    // Fetch Header from CMS
    import("@/utils/api").then((mod) => {
      const api = mod.default;
      api.get('/api/globals/header')
        .then(res => res.data)
        .then(data => {
          if (data && data.whatsappLogo) {
            const resolvedLogoUrl = data.whatsappLogo.s3Url || (data.whatsappLogo.url ? `${process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3002'}${data.whatsappLogo.url}` : null);
            if (resolvedLogoUrl) setLogoUrl(resolvedLogoUrl);
          }
        })
        .catch(console.error);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    setMessage("");
    setIsOpen(false);
  };

  return (
    <div className="wa-widget-container">
      <div className={`wa-widget-popup ${isOpen ? "open" : ""}`}>
        <div className="wa-widget-header">
          <div className="wa-widget-profile">
            <div className="wa-widget-avatar">
              {logoUrl ? (
                <img src={logoUrl} alt="We Brand" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <circle cx="12" cy="12" r="9"/>
                  <path d="M4.8 5.6A9 9 0 0 0 4.8 18.4"/>
                  <path d="M19.2 5.6a9 9 0 0 1 0 12.8"/>
                </svg>
              )}
            </div>
            <div className="wa-widget-info">
              <h3>We Brand Media</h3>
              <span>Typically replies in minutes</span>
            </div>
          </div>
          <button className="wa-widget-close" onClick={() => setIsOpen(false)} aria-label="Close Chat">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="wa-widget-body">
          <div className="wa-widget-bubble received">
            Hi there! 👋 Welcome to We Brand. How can we help your business grow today?
          </div>
        </div>

        <form className="wa-widget-footer" onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Type your message..." 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button type="submit" aria-label="Send Message">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </form>
      </div>

      <button 
        className={`wa-widget-toggle ${isOpen ? "hidden" : ""}`} 
        onClick={() => setIsOpen(true)}
        aria-label="Open WhatsApp Chat"
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </button>
    </div>
  );
}
