"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { setIsCartOpen, cart } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
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

        {/* Desktop Links */}
        <nav className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 36 }}>
          <a href={webUrl} style={{ fontSize: 13, fontWeight: 600, color: "var(--muted)", textDecoration: "none", textTransform: 'uppercase', letterSpacing: '0.05em' }}>Voltar ao Site</a>
          <Link href="/" style={{ fontSize: 13, fontWeight: 600, color: "#fff", textDecoration: "none", textTransform: 'uppercase', letterSpacing: '0.05em' }}>Loja</Link>
          <div style={{ width: 1, height: 16, background: 'var(--border)' }} />

          <button
            onClick={() => setIsCartOpen(true)}
            className="btn-outline"
            style={{ padding: '10px 20px', fontSize: 13, borderRadius: 100, position: 'relative' }}
          >
            🛒 Carrinho ({totalItems})
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="nav-mobile-btn"
          style={{ display: 'none', background: 'none', border: 'none', color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em' }}
        >
          {menuOpen ? 'FECHAR' : 'MENU'}
        </button>
      </div>

      {menuOpen && (
        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'var(--bg)', padding: 24, borderBottom: '1px solid var(--border)' }}>
          <a href={webUrl} style={{ display: 'block', color: 'var(--muted)', padding: '12px 0', textDecoration: 'none' }}>Voltar ao Site</a>
          <Link href="/" style={{ display: 'block', color: '#fff', padding: '12px 0', textDecoration: 'none' }}>Início Loja</Link>
          <button
            onClick={() => { setIsCartOpen(true); setMenuOpen(false); }}
            style={{ width: '100%', marginTop: 16, padding: '12px', background: 'var(--gold)', color: '#000', border: 'none', borderRadius: 8, fontWeight: 700 }}
          >
            CARRINHO ({totalItems})
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
            .nav-desktop { display: none !important; }
            .nav-mobile-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}
