export default function PrivacidadePage() {
  return (
    <main style={{ minHeight: '80vh', padding: '160px 24px 100px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, color: '#fff', marginBottom: 40 }}>Política de Privacidade</h1>
        
        <div className="content" style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: 16 }}>
          <p style={{ marginBottom: 24 }}>
            A sua privacidade é importante para nós. Esta política explica quais informações coletamos e como as utilizamos no servidor e na loja Paragonn.
          </p>

          <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>1. Coleta de Informações</h2>
          <p style={{ marginBottom: 24 }}>
            Coletamos informações básicas como o seu nick no Minecraft, endereço de e-mail (para envio de recibos) e dados de transação processados pelos nossos intermediadores de pagamento (Mercado Pago).
          </p>

          <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>2. Uso dos Dados</h2>
          <p style={{ marginBottom: 24 }}>
            Os dados coletados são utilizados exclusivamente para a entrega dos produtos adquiridos, suporte técnico e prevenção de fraudes. Não vendemos ou compartilhamos suas informações com terceiros para fins publicitários.
          </p>

          <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>3. Segurança Financeira</h2>
          <p style={{ marginBottom: 24 }}>
            Não armazenamos dados sensíveis de cartões de crédito em nossos servidores. Todo o processamento financeiro é realizado por plataformas seguras e certificadas (Mercado Pago).
          </p>

          <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>4. Cookies</h2>
          <p style={{ marginBottom: 24 }}>
            Utilizamos cookies apenas para manter a funcionalidade do carrinho de compras e sua sessão na loja.
          </p>
        </div>
      </div>
    </main>
  );
}
