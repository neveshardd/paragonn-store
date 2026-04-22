export default function ReembolsoPage() {
  return (
    <main style={{ minHeight: '80vh', padding: '160px 24px 100px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, color: '#fff', marginBottom: 40 }}>Política de Reembolso</h1>

        <div className="content" style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: 16 }}>
          <p style={{ marginBottom: 24 }}>
            Esta Política de Reembolso estabelece as diretrizes e procedimentos relativos à devolução de valores e cancelamento de transações. Devido à natureza digital, intangível e de consumo imediato dos produtos virtuais oferecidos pela Paragonn Network, as solicitações de reembolso seguem critérios rigorosos e específicos para garantir a sustentabilidade do projeto e a justiça entre todos os usuários.
          </p>

          <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>1. Consumibilidade de Produtos Digitais</h2>
          <p style={{ marginBottom: 24 }}>
            O usuário declara estar ciente de que todos os produtos comercializados (VIPs, moedas, chaves de caixas, multiplicadores, cosméticos) são bens digitais que são entregues e ativados de forma automatizada e instantânea na conta indicada. De acordo com o Código de Defesa do Consumidor e normas internacionais de e-commerce para conteúdo digital, uma vez que o serviço foi prestado e o conteúdo foi acessado ou utilizado dentro do ambiente do jogo, o direito de arrependimento torna-se inaplicável devido à imediata fruição do benefício.
          </p>
          <p style={{ marginBottom: 24 }}>
            Portanto, não oferecemos reembolsos, trocas ou devoluções de valores para itens que foram corretamente entregues e creditados na conta do jogador, independentemente de o usuário ter &quot;se arrependido&quot; da compra após o uso.
          </p>

          <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>2. Falhas Técnicas na Entrega e Prazos</h2>
          <p style={{ marginBottom: 24 }}>
            A Paragonn Network garante a entrega dos produtos adquiridos. Caso ocorra uma falha técnica sistêmica que impeça a entrega automática do item no prazo de 24 horas após a confirmação do pagamento pelo gateway, o usuário deverá abrir um ticket de suporte oficial em nosso Discord munido do comprovante de transação.
          </p>
          <p style={{ marginBottom: 24 }}>
            Nesta hipótese, a nossa equipe técnica realizará a entrega manual do produto. O reembolso total do valor pago somente será processado caso a administração, após análise técnica, constate a impossibilidade absoluta de realizar a entrega do item por problemas estruturais do servidor. Nestes casos, o estorno será realizado pelo mesmo método de pagamento original.
          </p>

          <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>3. Chargebacks, Contestações e Fraude Financeira</h2>
          <p style={{ marginBottom: 24 }}>
            A abertura de uma contestação de pagamento (Chargeback) junto à operadora do cartão de crédito ou plataforma de pagamento (Mercado Pago) sem consulta prévia ao suporte da Paragonn Network é considerada uma violação grave de nossos Termos de Uso e uma tentativa de fraude.
          </p>
          <p style={{ marginBottom: 24 }}>
            Nesses casos, a Paragonn Network reserva-se o direito de: (I) Banir permanentemente a conta do usuário de todos os nossos servidores e loja; (II) Bloquear o endereço IP e UUID do usuário; (III) Inserir os dados do usuário em listas de restrição de pagamento compartilhadas entre servidores de Minecraft; (IV) Tomar as medidas legais cabíveis para recuperação do crédito e combate à má-fé.
          </p>

          <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>4. Punições In-Game e Reembolsos</h2>
          <p style={{ marginBottom: 24 }}>
            Conforme disposto em nossos Termos de Uso, a aquisição de benefícios não isenta o usuário do cumprimento das regras do servidor. Se um usuário for banido, silenciado ou punido por violar as regras de conduta da comunidade, ele não terá direito a qualquer tipo de reembolso ou compensação pelos dias de VIP ou itens perdidos durante o período da punição. O investimento financeiro não garante o direito de infringir as normas de convivência.
          </p>

          <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>5. Erros de Digitação do Nick</h2>
          <p style={{ marginBottom: 24 }}>
            É responsabilidade exclusiva do comprador digitar o Nick (nome de usuário) do Minecraft corretamente no momento da compra. Caso o item seja entregue em uma conta inexistente ou de terceiros devido a um erro de digitação do comprador, a administração não terá obrigação de realizar o estorno ou a transferência, embora possamos auxiliar caso a conta de destino ainda não tenha consumido os benefícios.
          </p>

          <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>6. Considerações Finais</h2>
          <p style={{ marginBottom: 24 }}>
            Quaisquer casos omissos ou situações excepcionais serão julgados de forma discricionária pela equipe de administração da Paragonn Network, sempre visando o bom senso e a integridade da comunidade.
          </p>
        </div>
      </div>
    </main>
  );
}
