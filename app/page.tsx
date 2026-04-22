import ShopContent from "./components/ShopContent";
import GoalProgress from "./components/GoalProgress";

export const revalidate = 0;

const WEBPANEL = process.env.NEXT_PUBLIC_DASH_URL ?? "http://localhost:5173";

async function getProdutos() {
  try {
    const res = await fetch(`${WEBPANEL}/api/produtos`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    console.error("Erro ao buscar produtos:", err);
    return [];
  }
}

async function getCategorias() {
  try {
    const res = await fetch(`${WEBPANEL}/api/categorias`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    console.error("Erro ao buscar categorias:", err);
    return [];
  }
}

async function getServidores() {
  try {
    const res = await fetch(`${WEBPANEL}/api/servidores`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    console.error("Erro ao buscar servidores:", err);
    return [];
  }
}
async function getGoal() {
  try {
    const res = await fetch(`${WEBPANEL}/api/goal`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch (err) {
    console.error("Erro ao buscar meta:", err);
    return null;
  }
}

async function getConfigs() {
  try {
    const res = await fetch(`${WEBPANEL}/api/configuracoes`, { cache: 'no-store' });
    if (!res.ok) return { discord_link: 'https://discord.gg/paragonn', server_ip: 'play.paragonn.com.br' };
    const configs = await res.json();
    return {
      discord_link: configs.discord_link || 'https://discord.gg/paragonn',
      server_ip: configs.server_ip || 'play.paragonn.com.br'
    };
  } catch (err) {
    console.error('Erro ao buscar configurações do Painel:', err);
    return { discord_link: 'https://discord.gg/paragonn', server_ip: 'play.paragonn.com.br' };
  }
}

export default async function Home() {
  const [produtos, categorias, servidores, goal, configs] = await Promise.all([
    getProdutos(),
    getCategorias(),
    getServidores(),
    getGoal(),
    getConfigs()
  ]);

  const { discord_link: discordLink, server_ip: serverIP } = configs;

  return (
    <main className="main-content" style={{ minHeight: '100vh', paddingBottom: 100, background: 'var(--bg)' }}>
      <div className="container">
        {/* Header Section (Centralizado) */}
        <section className="hero-section" style={{ marginBottom: 80, textAlign: 'center' }}>
          <div className="fade-up">
            <h1 className="section-title">
              Sua jornada começa <span className="text-gold">aqui.</span>
            </h1>
            <p className="hero-description" style={{ maxWidth: 600, margin: '0 auto 32px', color: 'var(--muted)', fontSize: 17, lineHeight: 1.7 }}>
              Explore nossa coleção de itens, vantagens e pacotes exclusivos.
              Todo o lucro é reinvestido na melhoria contínua dos nossos servidores.
            </p>
            <div className="hero-buttons" style={{ display: 'flex', gap: 16, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
              <a href="#produtos" className="btn-primary" style={{ height: 54, display: 'flex', alignItems: 'center' }}>VER PRODUTOS</a>
              <a href={discordLink} target="_blank" className="btn-outline" style={{ height: 54, display: 'flex', alignItems: 'center' }}>NOSSO DISCORD</a>
            </div>
          </div>
        </section>

        {/* Divisor */}
        <div className="section-divider" style={{ height: 1, background: 'linear-gradient(to right, transparent, var(--border), transparent)', marginBottom: 80 }}></div>

        <section id="produtos" style={{ marginBottom: 80 }}>
          <ShopContent produtos={produtos} categorias={categorias} servidores={servidores} discordLink={discordLink} />
        </section>

        {/* Divisor */}
        <div className="section-divider" style={{ height: 1, background: 'linear-gradient(to right, transparent, var(--border), transparent)', marginTop: 80 }}></div>

        {/* Meta no final */}
        <section className="fade-up" style={{ maxWidth: 800, margin: '80px auto 0' }}>
          <GoalProgress target={goal?.target} current={goal?.current} />
        </section>
      </div>

      <style>{`
          .main-content { padding-top: 160px; }
          @media (max-width: 768px) {
              .main-content { padding-top: 120px; }
              .hero-section { margin-bottom: 60px !important; }
              .hero-description { font-size: 15px !important; margin-bottom: 24px !important; }
              .hero-buttons { flex-direction: column; width: 100%; max-width: 300px; margin: 0 auto; gap: 20px !important; }
              .hero-buttons a { width: 100%; justify-content: center; }
              .section-divider { margin-bottom: 40px !important; margin-top: 40px !important; }
          }
      `}</style>
    </main>
  );
}
