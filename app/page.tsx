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

async function getDiscordLink() {
  try {
    const res = await fetch(`${WEBPANEL}/api/configuracoes`, { cache: 'no-store' });
    if (!res.ok) return 'https://discord.gg/paragonn';
    const configs = await res.json();
    return configs.discord_link || 'https://discord.gg/paragonn';
  } catch (err) {
    return 'https://discord.gg/paragonn';
  }
}

export default async function Home() {
  const [produtos, categorias, servidores, goal, discordLink] = await Promise.all([
    getProdutos(),
    getCategorias(),
    getServidores(),
    getGoal(),
    getDiscordLink()
  ]);

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
            <div className="hero-buttons" style={{ display: 'flex', gap: 16, justifyContent: 'center', alignItems: 'stretch' }}>
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
