export default function ReembolsoPage() {
  return (
    <main style={{ minHeight: '80vh', padding: '160px 24px 100px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, color: '#fff', marginBottom: 40 }}>Política de Reembolso</h1>

        <div className="content" style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: 16 }}>
          <p style={{ marginBottom: 24 }}>
            Devido à natureza digital e de consumo imediato dos nossos produtos virtuais, estabelecemos as seguintes diretrizes para solicitações de reembolso.
          </p>

          <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>1. Produtos Digitais</h2>
          <p style={{ marginBottom: 24 }}>
            Uma vez que um produto (VIP, chaves, cosméticos) é entregue em sua conta dentro do jogo, ele é considerado &quot;consumido&quot;. Por serem bens intangíveis de entrega imediata, não oferecemos reembolsos após a ativação bem-sucedida do item.
          </p>

          <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>2. Erros na Entrega</h2>
          <p style={{ marginBottom: 24 }}>
            Caso você realize um pagamento e o produto não seja entregue em até 24 horas, entre em contato imediatamente com o nosso suporte via Discord. Se não conseguirmos resolver o problema técnico e entregar o produto, processaremos o estorno total do valor.
          </p>

          <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>3. Chargebacks (Contestações)</h2>
          <p style={{ marginBottom: 24 }}>
            Abrir uma contestação injustificada (Chargeback) junto à operadora do cartão ou Mercado Pago resultará no banimento permanente imediato de todas as nossas plataformas (servidor e loja).
          </p>

          <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>4. Casos Excepcionais</h2>
          <p style={{ marginBottom: 24 }}>
            Situações não previstas nestas diretrizes serão analisadas individualmente pela administração do servidor.
          </p>
        </div>
      </div>
    </main>
  );
}
