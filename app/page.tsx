import ShopContent from "./components/ShopContent";

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

export default async function Home() {
  const [produtos, categorias, servidores] = await Promise.all([
    getProdutos(),
    getCategorias(),
    getServidores()
  ]);

  return (
    <main style={{ minHeight: '100vh', paddingTop: 180, paddingBottom: 100, background: 'var(--bg)' }}>
      {/* Hero Simples da Loja */}
      <section style={{ textAlign: 'center', marginBottom: 80, padding: '0 24px' }}>
          <div className="fade-up">
              <h1 className="section-title" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
                Loja Oficial <span className="text-gold">Paragonn</span>
              </h1>
              <p style={{ maxWidth: 600, margin: '20px auto 0', color: 'var(--muted)', fontSize: 16, lineHeight: 1.6 }}>
                  Escolha seu servidor e adquira benefícios exclusivos para sua aventura.
              </p>
          </div>
      </section>

      <ShopContent produtos={produtos} categorias={categorias} servidores={servidores} />
    </main>
  );
}
