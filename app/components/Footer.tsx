/* eslint-disable @next/next/no-img-element */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      background: "#13111a",
      borderTop: "1px solid #2a2540",
      padding: "80px 24px 40px",
      marginTop: "auto"
    }}>
      <div className="container">
        <div className="footer-grid" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 60,
          marginBottom: 60
        }}>
          {/* Info */}
          <div className="footer-col">
            <h3 style={{ fontSize: 13, fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24, fontFamily: 'var(--font-display)' }}>Sobre a Loja</h3>
            <p style={{ color: "#7a7590", fontSize: 13, marginBottom: 20, lineHeight: 1.6 }}>
              A loja oficial do servidor Paragonn. Qualidade, segurança e os melhores benefícios exclusivos para sua aventura com a gente.
            </p>
          </div>

          {/* Links */}
          <div className="footer-col">
            <h4 style={{ color: "#fff", fontSize: 13, fontWeight: 700, marginBottom: 28, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Institucional
            </h4>
            <nav style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {["Termos de Uso", "Privacidade", "Reembolso", "Suporte"].map((t) => (
                <a key={t} href="#" style={{ color: "#7a7590", fontSize: 14, textDecoration: "none", transition: 'color 0.2s' }}>{t}</a>
              ))}
            </nav>
          </div>

          {/* Pagamento */}
          <div className="footer-col">
            <h4 style={{ color: "#fff", fontSize: 13, fontWeight: 700, marginBottom: 28, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Pagamento Seguro
            </h4>
            <p style={{ color: "#7a7590", fontSize: 13, marginBottom: 20, lineHeight: 1.6 }}>
              Aceitamos diversas formas de pagamento processadas com segurança total.
            </p>
            <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
              <img src="https://logopng.com.br/logos/pix-106.png" alt="Pix" style={{ height: 18, filter: 'invert(1) hue-rotate(180deg) saturate(2)' }} />
              <img src="https://logodownload.org/wp-content/uploads/2019/06/mercado-pago-logo-1.png" alt="Mercado Pago" style={{ height: 28 }} />
            </div>
          </div>
        </div>

        <div style={{
          borderTop: "1px solid #2a2540",
          paddingTop: 40,
          textAlign: "center",
          fontSize: 12,
          color: "#7a7590",
          letterSpacing: '0.02em'
        }}>
          &copy; {currentYear} Paragonn Network. Todos os direitos reservados.
          <br />
          <span style={{ fontSize: 10, opacity: 0.6, marginTop: 8, display: 'inline-block' }}>
            Não somos afiliados à Mojang AB ou Microsoft.
          </span>
        </div>
      </div>

      <style>{`
          @media (max-width: 900px) {
              .footer-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
              .footer-col { text-align: center; }
              .footer-col div { justify-content: center !important; }
          }
      `}</style>
    </footer>
  );
}
