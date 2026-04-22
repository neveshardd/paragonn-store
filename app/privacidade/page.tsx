export default function PrivacidadePage() {
  return (
    <main style={{ minHeight: '80vh', padding: '160px 24px 100px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, color: '#fff', marginBottom: 40 }}>Política de Privacidade</h1>

        <div className="content" style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: 16 }}>
          <p style={{ marginBottom: 24 }}>
            A sua privacidade é uma prioridade fundamental para a Paragonn Network. Esta política de privacidade detalha, de forma transparente e exaustiva, as práticas de coleta, processamento, armazenamento e proteção de dados pessoais e informações de navegação coletadas durante a sua interação com nossa loja virtual e infraestrutura de servidores. Ao utilizar nossos serviços, você consente com os termos aqui estabelecidos.
          </p>

          <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>1. Natureza e Extensão da Coleta de Dados</h2>
          <p style={{ marginBottom: 24 }}>
            Durante o processo de compra e navegação, coletamos um conjunto limitado, porém essencial, de dados para garantir a operabilidade do serviço. Isso inclui, mas não se limita a: o seu pseudônimo de usuário (Nick) no Minecraft, endereço de Protocolo de Internet (IP), identificadores de hardware (em caso de conexão ao servidor), endereço de correio eletrônico (e-mail) para fins de faturamento e comunicação de suporte, além de logs de transações financeiras.
          </p>
          <p style={{ marginBottom: 24 }}>
            Informamos que a coleta de dados de navegação também pode ocorrer de forma automatizada por meio de ferramentas de análise de tráfego, visando a otimização da performance do site e a detecção de tentativas de intrusão ou ataques de negação de serviço (DDoS).
          </p>

          <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>2. Finalidade e Base Legal do Processamento</h2>
          <p style={{ marginBottom: 24 }}>
            Os dados coletados são processados rigorosamente para as seguintes finalidades: (a) Identificação inequívoca do usuário para a entrega técnica dos produtos virtuais adquiridos; (b) Emissão de comprovantes e notas de transação; (c) Prestação de assistência e suporte técnico especializado; (d) Prevenção de atividades fraudulentas, chargebacks maliciosos e lavagem de dinheiro; (e) Manutenção da segurança cibernética de nossa infraestrutura.
          </p>
          <p style={{ marginBottom: 24 }}>
            A base legal para o processamento de seus dados fundamenta-se na execução do contrato de compra e venda de serviços digitais e no legítimo interesse da administração em manter um ambiente seguro e funcional para toda a comunidade.
          </p>

          <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>3. Segurança das Transações e Dados Financeiros</h2>
          <p style={{ marginBottom: 24 }}>
            A Paragonn Network adota protocolos de segurança de ponta. É importante ressaltar que não armazenamos, processamos ou temos acesso direto a dados sensíveis de pagamento, tais como números de cartões de crédito, códigos CVV ou chaves privadas de autenticação bancária. Todo o fluxo financeiro é delegado a gateways de pagamento certificados internacionalmente e em conformidade com o padrão PCI-DSS (Mercado Pago). A comunicação entre o seu navegador e nossos servidores é protegida por criptografia SSL/TLS de alta camada.
          </p>

          <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>4. Compartilhamento e Sigilo de Informações</h2>
          <p style={{ marginBottom: 24 }}>
            Mantemos o compromisso estrito de não comercializar, alugar, ceder ou compartilhar seus dados pessoais com agências de marketing, corretoras de dados ou quaisquer terceiros para fins publicitários. O compartilhamento de informações ocorrerá exclusivamente: (I) com processadores de pagamento necessários para concluir sua compra; (II) em cumprimento de ordens judiciais ou requisições de autoridades policiais competentes; (III) para proteção de direitos legais da Paragonn Network em casos de fraude comprovada.
          </p>

          <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>5. Uso de Cookies e Tecnologias de Rastreamento</h2>
          <p style={{ marginBottom: 24 }}>
            Utilizamos &quot;cookies&quot; (pequenos arquivos de texto armazenados no seu dispositivo) para finalidades puramente funcionais e técnicas. Eles nos permitem reconhecer o seu navegador, manter os itens em seu carrinho de compras enquanto você navega, e preservar as suas preferências de interface. Você tem a liberdade de configurar seu navegador para recusar cookies, contudo, isso poderá impossibilitar a finalização de compras ou o acesso a determinadas áreas da loja.
          </p>

          <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>6. Direitos do Titular e Retenção</h2>
          <p style={{ marginBottom: 24 }}>
            Armazenamos seus dados pelo tempo estritamente necessário para cumprir as finalidades descritas nesta política e para obedecer a obrigações legais de manutenção de registros financeiros. O usuário poderá, a qualquer momento, solicitar esclarecimentos sobre os dados armazenados através de nossos canais oficiais de suporte.
          </p>
        </div>
      </div>
    </main>
  );
}
