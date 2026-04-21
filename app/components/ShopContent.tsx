"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";

type Produto = {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
  imagem: string | null;
  categoriaId: number;
  servidorId: number;
};

type Categoria = {
  id: number;
  nome: string;
};

type Servidor = {
  id: number;
  nome: string;
};

export default function ShopContent({ 
  produtos, 
  categorias,
  servidores
}: { 
  produtos: Produto[], 
  categorias: Categoria[],
  servidores: Servidor[]
}) {
  const [selectedCat, setSelectedCat] = useState<number | null>(null);
  const [selectedServ, setSelectedServ] = useState<number | null>(null);
  const { addToCart, setIsCartOpen } = useCart();

  const filteredProdutos = produtos.filter(p => {
    const matchesServ = selectedServ !== null ? p.servidorId === selectedServ : true;
    const matchesCat = selectedCat !== null ? p.categoriaId === selectedCat : true;
    return matchesServ && matchesCat;
  });

  const handleAdd = (prod: Produto) => {
    addToCart(prod);
    setIsCartOpen(true);
  };

  return (
    <div>
      <div className="shop-layout" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 48, alignItems: 'flex-start' }}>
        
        {/* Sidebar Navigation */}
        <aside style={{ position: 'sticky', top: 100 }}>
            {/* SERVIDORES */}
            <div className="filter-group">
                <h3 className="filter-label">Servidores</h3>
                <div className="filter-list servers-scroll">
                    <button 
                        onClick={() => { setSelectedServ(null); setSelectedCat(null); }}
                        className={selectedServ === null ? 'filter-btn active' : 'filter-btn'}
                    >
                        Todos
                    </button>
                    {servidores.map(serv => (
                        <button 
                            key={serv.id}
                            onClick={() => { setSelectedServ(serv.id); setSelectedCat(null); }}
                            className={selectedServ === serv.id ? 'filter-btn active' : 'filter-btn'}
                        >
                            {serv.nome}
                        </button>
                    ))}
                </div>
            </div>

            {/* Divisor Desktop */}
            <div className="desktop-divider"></div>

            <div className="filter-group">
                <h3 className="filter-label">Categorias</h3>
                <div className="filter-list categories-scroll">
                    <button 
                        onClick={() => setSelectedCat(null)}
                        className={selectedCat === null ? 'cat-btn active' : 'cat-btn'}
                    >
                        Tudo
                    </button>
                    {categorias.map(cat => (
                        <button 
                            key={cat.id}
                            onClick={() => setSelectedCat(cat.id)}
                            className={selectedCat === cat.id ? 'cat-btn active' : 'cat-btn'}
                        >
                            {cat.nome}
                        </button>
                    ))}
                </div>
            </div>

             {/* Suporte Info */}
             <div className="support-card desktop-only">
                <h4>Precisa de ajuda?</h4>
                <p>Abra um ticket em nosso Discord ou Instagram.</p>
                <a href="#" className="btn-outline">SUPORTE</a>
            </div>
        </aside>

        {/* Product Grid Area */}
        <div style={{ flex: 1 }}>
            <div className="grid-header">
                <h2>
                    {selectedCat ? categorias.find(c => c.id === selectedCat)?.nome : 'Destaques'}
                </h2>
                <div className="item-count">
                    <strong>{filteredProdutos.length}</strong> itens
                </div>
            </div>

            <div className="product-grid">
                {filteredProdutos.map(prod => (
                    <article key={prod.id} className="card product-card">
                        <div className="product-image-container">
                            {prod.imagem ? (
                              <img 
                                src={prod.imagem} 
                                alt={prod.nome} 
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <div className="product-placeholder">
                                  {prod.categoriaId === 1 ? '💎' : prod.categoriaId === 2 ? '⚔️' : '🎁'}
                              </div>
                            )}
                            <div className="product-server-tag">
                                {servidores.find(s => s.id === prod.servidorId)?.nome}
                            </div>
                        </div>

                        <div className="product-info">
                            <div className="product-meta">
                                <div className="product-category">
                                    {categorias.find(c => c.id === prod.categoriaId)?.nome}
                                </div>
                                <h3 className="product-title">{prod.nome}</h3>
                            </div>
                            
                            <p className="product-description">
                                {prod.descricao}
                            </p>
                            
                            <div className="product-footer">
                                <div className="price-tag">
                                    <span className="price-label">Investimento</span>
                                    <div className="price-value">
                                        R$ {prod.preco.toFixed(2)}
                                    </div>
                                </div>
                                <button className="btn-primary buy-btn" onClick={() => handleAdd(prod)}>
                                    ADQUIRIR
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
            
            {filteredProdutos.length === 0 && (
                <div className="empty-state">
                    <div style={{ fontSize: 48, marginBottom: 16 }}>🔎</div>
                    <h3>Nenhum item encontrado</h3>
                    <p>Explore outras categorias ou altere o servidor selecionado.</p>
                </div>
            )}
        </div>
      </div>
      
      <style>{`
          .shop-layout { display: grid; grid-template-columns: 280px 1fr; gap: 48px; align-items: flex-start; }
          .filter-group { display: flex; flexDirection: column; gap: 6px; margin-bottom: 24px; }
          .filter-label { fontSize: 11px; fontWeight: 900; color: var(--muted); textTransform: uppercase; letterSpacing: 0.15em; marginBottom: 16px; paddingLeft: 12px; }
          .filter-list { display: flex; flexDirection: column; gap: 6px; }
          .filter-btn, .cat-btn { textAlign: left; padding: 12px 16px; borderRadius: 12px; cursor: pointer; fontSize: 14px; transition: all 0.2s; border: none; background: transparent; color: var(--muted); }
          .filter-btn.active { background: var(--gold-linear); color: #000; fontWeight: 700; }
          .cat-btn.active { background: rgba(245, 166, 35, 0.12); border: 1px solid var(--gold); color: var(--gold); fontWeight: 700; }
          .desktop-divider { height: 1px; background: var(--border); margin: 32px 12px; }
          .support-card { marginTop: 40px; padding: 24px; background: rgba(255,255,255,0.01); borderRadius: 16px; border: 1px solid var(--border); }
          .support-card h4 { fontSize: 12px; fontWeight: 800; color: #fff; marginBottom: 12px; }
          .support-card p { fontSize: 13px; color: var(--muted); lineHeight: 1.6; marginBottom: 20px; }
          .grid-header { marginBottom: 32px; display: flex; justifyContent: space-between; alignItems: center; }
          .grid-header h2 { fontSize: 24px; fontWeight: 800; color: #fff; }
          .item-count { fontSize: 13px; color: var(--muted); }
          .product-grid { display: grid; gridTemplateColumns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; }
          .product-card { display: flex; flexDirection: column; height: 100%; padding: 0; overflow: hidden; }
          .product-image-container { position: relative; height: 180px; background: #15131f; display: flex; alignItems: center; justifyContent: center; borderBottom: 1px solid var(--border); overflow: hidden; }
          .product-image-container img { width: 100%; height: 100%; objectFit: cover; transition: transform 0.5s ease; }
          .product-placeholder { fontSize: 72px; filter: drop-shadow(0 15px 30px rgba(0,0,0,0.5)); }
          .product-server-tag { position: absolute; bottom: 16px; left: 16px; padding: 4px 12px; background: var(--gold-linear); color: #000; borderRadius: 100px; fontSize: 10px; fontWeight: 900; textTransform: uppercase; pointerEvents: none; }
          .product-info { padding: 28px; flex: 1; display: flex; flexDirection: column; }
          .product-category { fontSize: 11px; fontWeight: 800; color: var(--gold); textTransform: uppercase; letterSpacing: 0.1em; marginBottom: 6px; }
          .product-title { fontSize: 20px; fontWeight: 800; color: #fff; lineHeight: 1.2; marginBottom: 16px; }
          .product-description { fontSize: 14px; color: var(--muted); lineHeight: 1.6; marginBottom: 32px; flex: 1; }
          .product-footer { display: flex; alignItems: center; justifyContent: space-between; marginTop: auto; paddingTop: 20px; borderTop: 1px solid var(--border); }
          .price-label { fontSize: 11px; fontWeight: 700; color: var(--muted); textTransform: uppercase; marginBottom: 2px; display: block; }
          .price-value { fontSize: 22px; fontWeight: 900; color: #fff; }
          .empty-state { padding: 100px 0; textAlign: center; background: var(--surface); borderRadius: 24px; border: 1px solid var(--border); }
          .empty-state h3 { color: #fff; fontSize: 20px; fontWeight: 700; marginBottom: 8px; }
          .empty-state p { color: 'var(--muted)'; fontSize: 14px; }

          @media (max-width: 1000px) {
              .shop-layout { grid-template-columns: 1fr; gap: 32px; }
              aside { position: relative; top: 0; width: 100%; }
              .filter-list { flexDirection: row; overflow-x: auto; padding-bottom: 8px; scrollbar-width: none; }
              .filter-list::-webkit-scrollbar { display: none; }
              .filter-btn, .cat-btn { white-space: nowrap; padding: 10px 20px; }
              .desktop-divider, .desktop-only { display: none; }
              .grid-header { margin-bottom: 24px; }
              .product-grid { grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); }
          }
          @media (max-width: 480px) {
              .product-grid { grid-template-columns: 1fr; }
              .product-info { padding: 20px; }
              .product-title { fontSize: 18px; }
              .price-value { fontSize: 20px; }
              .buy-btn { padding: 10px 16px; fontSize: 12px; }
          }
      `}</style>
    </div>
  );
}
