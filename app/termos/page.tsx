export default function TermosPage() {
  return (
    <main style={{ minHeight: '80vh', padding: '160px 24px 100px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, color: '#fff', marginBottom: 40 }}>Termos de Uso</h1>
        
        <div className="content" style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: 16 }}>
          <p style={{ marginBottom: 24 }}>
            Ao acessar e utilizar a loja do servidor Paragonn, você concorda com os seguintes termos e condições. Recomendamos a leitura atenta antes de realizar qualquer compra.
          </p>

          <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>1. Natureza dos Produtos</h2>
          <p style={{ marginBottom: 24 }}>
            Todos os itens vendidos nesta loja são bens virtuais (digitais) para serem utilizados exclusivamente dentro do servidor Paragonn. Estes itens não possuem valor monetário fora do nosso ecossistema e não podem ser trocados por dinheiro real.
          </p>

          <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>2. Responsabilidade da Conta</h2>
          <p style={{ marginBottom: 24 }}>
            O usuário é o único responsável pela segurança de sua conta no Minecraft. Não nos responsabilizamos por perdas de itens decorrentes de invasões, compartilhamento de senhas ou negligência do usuário.
          </p>

          <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>3. Punições e Banimentos</h2>
          <p style={{ marginBottom: 24 }}>
            A aquisição de produtos (VIPs, chaves, etc.) não isenta o jogador de seguir as regras do servidor. Jogadores que violarem as regras poderão ser punidos ou banidos permanentemente, sem direito a reembolso dos produtos adquiridos.
          </p>

          <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>4. Alterações nos Termos</h2>
          <p style={{ marginBottom: 24 }}>
            Reservamo-nos o direito de alterar estes termos a qualquer momento, sem aviso prévio. O uso continuado da loja após tais alterações constitui sua aceitação dos novos termos.
          </p>
        </div>
      </div>
    </main>
  );
}
