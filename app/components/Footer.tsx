import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ 
        background: "#13111a", 
        borderTop: "1px solid #2a2540", 
        padding: "80px 24px 40px",
        marginTop: "auto"
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
            gap: 64, 
            marginBottom: 64 
        }}>
          {/* Brand */}
          <div style={{ textAlign: 'left' }}>
            <Image 
                src="/logo.png" 
                alt="Paragonn" 
                width={140} 
                height={48} 
                style={{ width: 'auto', height: '40px', marginBottom: 24, opacity: 0.8 }}
            />
            <p style={{ color: "#7a7590", fontSize: 14, lineHeight: 1.7, maxWidth: 300 }}>
              A loja oficial do servidor Paragonn. Qualidade, segurança e os melhores benefícios exclusivos para sua aventura com a gente.
            </p>
          </div>

          {/* Links */}
          <div>
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
          <div>
            <h4 style={{ color: "#fff", fontSize: 13, fontWeight: 700, marginBottom: 28, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Pagamento Seguro
            </h4>
            <p style={{ color: "#7a7590", fontSize: 13, marginBottom: 20, lineHeight: 1.6 }}>
              Aceitamos diversas formas de pagamento processadas com segurança total.
            </p>
            <div style={{ display: 'flex', gap: 12, opacity: 0.5 }}>
                 <div style={{ width: 44, height: 28, background: 'rgba(255,255,255,0.1)', border: '1px solid #2a2540', borderRadius: 4 }}></div>
                 <div style={{ width: 44, height: 28, background: 'rgba(255,255,255,0.1)', border: '1px solid #2a2540', borderRadius: 4 }}></div>
                 <div style={{ width: 44, height: 28, background: 'rgba(255,255,255,0.1)', border: '1px solid #2a2540', borderRadius: 4 }}></div>
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
          <br/>
          <span style={{ fontSize: 10, opacity: 0.6, marginTop: 8, display: 'inline-block' }}>
            Não somos afiliados à Mojang AB ou Microsoft.
          </span>
        </div>
      </div>
    </footer>
  );
}
