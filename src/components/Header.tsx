import React from "react";
import Link from "next/link";

export default function Header({ logoUrl }: { logoUrl?: string | null }) {
  return (
    <header className="site-header" id="site-header">
      <div className="hdr-col hdr-left">
        <Link href="/" className="brand-mark">
          {logoUrl ? (
            <>
              <img src={logoUrl} alt="We Brand" style={{ maxHeight: '40px', objectFit: 'contain', marginRight: '8px' }} />
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
        </Link>
      </div>

      <div className="hdr-col hdr-right">
        <Link href="/contact-us" className="book-link">Let's Talk</Link>
        <button className="burger" id="burger" aria-label="Open menu">
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
