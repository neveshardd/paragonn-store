"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { setIsCartOpen, cart } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const webUrl = process.env.NEXT_PUBLIC_STORE_URL || "http://localhost:3000";

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: isScrolled ? "12px 24px" : "24px",
        background: isScrolled ? "rgba(12, 11, 15, 0.9)" : "transparent",
        backdropFilter: isScrolled ? "blur(12px)" : "none",
        borderBottom: isScrolled ? "1px solid var(--border)" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ maxWidth: 1240, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: 'none', gap: 10 }}>
            <Image
              src="/logo.png"
              alt="Paragonn"
              width={148}
              height={52}
              style={{ width: "auto", height: "38px" }}
              priority
            />
            <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--gold)', letterSpacing: '0.25em', textTransform: 'uppercase', borderLeft: '1px solid var(--border)', paddingLeft: 12, height: 20, display: 'flex', alignItems: 'center' }}>
              Loja
            </div>
          </Link>
        </div>

        {/* Desktop & Mobile Links */}
        <nav style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <a href={webUrl} className="nav-link-site" style={{ fontSize: 13, fontWeight: 600, color: "var(--muted)", textDecoration: "none", textTransform: 'uppercase', letterSpacing: '0.05em' }}>Ir para o Site</a>

          <div className="nav-divider" style={{ width: 1, height: 16, background: 'var(--border)' }} />

          {/* Cart Icon with Badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>

            {totalItems > 0 && (
              <span style={{
                position: 'absolute',
                top: -8,
                right: -10,
                background: 'var(--gold)',
                color: '#000',
                fontSize: 10,
                fontWeight: 900,
                minWidth: 18,
                height: 18,
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 4px',
                boxShadow: '0 0 15px rgba(245, 166, 35, 0.4)'
              }}>
                {totalItems}
              </span>
            )}
          </button>
        </nav>
      </div>

      <style>{`
        @media (max-width: 768px) {
            .nav-link-site, .nav-divider { display: none !important; }
        }
      `}</style>
    </header>
  );
}
