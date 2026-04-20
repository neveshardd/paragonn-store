import ShopContent from "./components/ShopContent";
import GoalProgress from "./components/GoalProgress";

const WEBPANEL = process.env.WEBPANEL_URL ?? "http://localhost:5173";

async function getProdutos() {
  try {
    const res = await fetch(`${WEBPANEL}/api/produtos`, { next: { revalidate: 0 } });
    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    console.error("Erro ao buscar produtos:", err);
    return [];
  }
}

async function getCategorias() {
  try {
    const res = await fetch(`${WEBPANEL}/api/categorias`, { next: { revalidate: 0 } });
    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    console.error("Erro ao buscar categorias:", err);
    return [];
  }
}

async function getServidores() {
  try {
    const res = await fetch(`${WEBPANEL}/api/servidores`, { next: { revalidate: 0 } });
    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    console.error("Erro ao buscar servidores:", err);
    return [];
  }
}
async function getGoal() {
  try {
    const res = await fetch(`${WEBPANEL}/api/goal`, { next: { revalidate: 0 } });
    if (!res.ok) return null;
    return res.json();
  } catch (err) {
    console.error("Erro ao buscar meta:", err);
    return null;
  }
}

export default async function Home() {
  const [produtos, categorias, servidores, goal] = await Promise.all([
    getProdutos(),
    getCategorias(),
    getServidores(),
    getGoal()
  ]);

  return (
    <main style={{ minHeight: '100vh', paddingTop: 160, paddingBottom: 100, background: 'var(--bg)' }}>
      <div className="container">
        {/* Header Section (Centralizado) */}
        <section style={{ marginBottom: 80, textAlign: 'center' }}>
          <div className="fade-up">
            <span className="section-label">Loja Oficial Paragonn</span>
            <h1 className="section-title">
              Sua jornada começa <span className="text-gold">aqui.</span>
            </h1>
            <p style={{ maxWidth: 600, margin: '0 auto 32px', color: 'var(--muted)', fontSize: 17, lineHeight: 1.7 }}>
              Explore nossa coleção de itens, vantagens e pacotes exclusivos. 
              Todo o lucro é reinvestido na melhoria contínua dos nossos servidores.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
              <a href="#produtos" className="btn-primary">VER PRODUTOS</a>
              <a href="https://discord.gg/paragonn" target="_blank" className="btn-outline">NOSSO DISCORD</a>
            </div>
          </div>
        </section>

        {/* Divisor */}
        <div style={{ height: 1, background: 'linear-gradient(to right, transparent, var(--border), transparent)', marginBottom: 80 }}></div>

        <section id="produtos" style={{ marginBottom: 80 }}>
          <ShopContent produtos={produtos} categorias={categorias} servidores={servidores} />
        </section>

        {/* Divisor */}
        <div style={{ height: 1, background: 'linear-gradient(to right, transparent, var(--border), transparent)', marginTop: 80 }}></div>

        {/* Meta no final */}
        <section className="fade-up" style={{ maxWidth: 800, margin: '80px auto 0' }}>
            <GoalProgress target={goal?.target} current={goal?.current} />
        </section>
      </div>
    </main>
  );
}
