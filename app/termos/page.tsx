export default function TermosPage() {
  return (
    <main style={{ minHeight: '80vh', padding: '160px 24px 100px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, color: '#fff', marginBottom: 40 }}>Termos de Uso</h1>
        <div className="content" style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: 16 }}>
          <p style={{ marginBottom: 24 }}>
            Ao acessar e utilizar a loja do servidor Paragonn, você concorda, de forma irrevogável e irretratável, com os seguintes termos e condições gerais de uso. Recomendamos a leitura exaustiva e atenta antes de realizar qualquer transação financeira em nossa plataforma. O descumprimento de qualquer cláusula aqui disposta poderá resultar na suspensão imediata de seus privilégios no servidor.
          </p>

          <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>1. Natureza Jurídica dos Produtos Digitais</h2>
          <p style={{ marginBottom: 24 }}>
            Todos os itens, moedas virtuais, privilégios (VIPs), cosméticos, chaves e utilitários comercializados nesta loja são classificados como &quot;Serviços Digitais de Entrega Imediata&quot; e &quot;Bens Virtuais Intangíveis&quot;. Estes produtos são licenciados para uso exclusivo dentro do ambiente virtual do servidor Paragonn e não constituem propriedade do usuário. Estes itens não possuem qualquer valor monetário intrínseco fora de nossa infraestrutura, não sendo passíveis de conversão em moeda corrente (BRL, USD, etc.), troca por bens físicos ou transferência para outras plataformas de terceiros.
          </p>
          <p style={{ marginBottom: 24 }}>
            A Paragonn Network reserva-se o direito de alterar, modificar, balancear ou remover quaisquer itens virtuais do jogo sem aviso prévio, visando a manutenção do equilíbrio competitivo e a saúde do ecossistema do servidor. O usuário compreende que a licença de uso do item está vinculada à existência e operação contínua do servidor.
          </p>

          <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>2. Responsabilidade Integral da Conta e Segurança</h2>
          <p style={{ marginBottom: 24 }}>
            O usuário declara ser o titular legítimo da conta Minecraft utilizada ou possuir autorização expressa dos responsáveis legais para realizar transações. É de responsabilidade exclusiva do usuário manter a confidencialidade de suas credenciais de acesso. A Paragonn Network não se responsabiliza, em hipótese alguma, por perdas de itens, roubos de conta, estelionatos cometidos por terceiros, compartilhamento indevido de senhas ou qualquer forma de acesso não autorizado decorrente de negligência do usuário final.
          </p>
          <p style={{ marginBottom: 24 }}>
            Em casos de perda de acesso à conta Minecraft original (Mojang/Microsoft), não há obrigatoriedade por parte da administração em realizar a transferência de benefícios para uma nova conta, embora tais solicitações possam ser analisadas individualmente como mera liberalidade da administração.
          </p>

          <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>3. Regime de Punições, Banimentos e Conformidade</h2>
          <p style={{ marginBottom: 24 }}>
            A aquisição de qualquer produto ou serviço premium não outorga ao jogador qualquer tipo de imunidade diplomática ou isenção em relação às regras de conduta do servidor. Todos os jogadores, independentemente do volume de contribuições financeiras, estão sujeitos ao mesmo conjunto de regras disciplinares.
          </p>
          <p style={{ marginBottom: 24 }}>
            Jogadores que utilizarem artifícios ilícitos (Cheats, Hacks, Exploits), praticarem assédio, discurso de ódio, toxicidade extrema ou qualquer outra violação grave das diretrizes da comunidade poderão ser punidos com banimento temporário ou permanente. O usuário aceita que, em caso de banimento por infração às regras, não haverá qualquer tipo de ressarcimento, reembolso ou estorno dos valores investidos na loja, uma vez que a punição decorre da quebra do contrato de conduta por parte do usuário.
          </p>

          <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>4. Disponibilidade do Serviço e Manutenções</h2>
          <p style={{ marginBottom: 24 }}>
            Embora busquemos manter o servidor operante 24 horas por dia, 7 dias por semana, a Paragonn Network não garante o acesso ininterrupto. O servidor poderá ficar offline para manutenções programadas, atualizações de software, correções de bugs emergenciais ou devido a instabilidades em provedores de infraestrutura de terceiros. Tais períodos de inatividade não dão direito a compensações financeiras ou extensões automáticas de prazos de benefícios temporários, salvo decisão contrária da administração comunicada oficialmente.
          </p>

          <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>5. Modificações Unilaterais dos Termos</h2>
          <p style={{ marginBottom: 24 }}>
            Reservamo-nos o direito soberano de alterar, adicionar ou remover partes destes termos a qualquer momento, visando a segurança jurídica e operacional do projeto. É dever do usuário revisar estes termos periodicamente. A continuidade do uso do servidor e da loja após a publicação de alterações constitui a aceitação plena e sem reservas dos novos termos estabelecidos.
          </p>

          <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>6. Jurisdição e Resolução de Conflitos</h2>
          <p style={{ marginBottom: 24 }}>
            Para dirimir quaisquer controvérsias oriundas deste termo, as partes elegem o foro da comarca de sede da administração do servidor, com renúncia expressa a qualquer outro, por mais privilegiado que seja.
          </p>
        </div>
      </div>
    </main>
  );
}
