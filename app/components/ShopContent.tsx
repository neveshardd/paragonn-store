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
  const [selectedServ, setSelectedServ] = useState<number | null>(servidores[0]?.id || null);
  const { addToCart, setIsCartOpen } = useCart();

  const filteredProdutos = produtos.filter(p => {
    const matchesServ = selectedServ ? p.servidorId === selectedServ : true;
    const matchesCat = selectedCat ? p.categoriaId === selectedCat : true;
    return matchesServ && matchesCat;
  });

  const handleAdd = (prod: Produto) => {
    addToCart(prod);
    setIsCartOpen(true);
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
      <div className="shop-layout" style={{ display: 'flex', gap: 64, alignItems: 'flex-start' }}>
        {/* Sidebar */}
        <aside style={{ width: 260, position: 'sticky', top: 120, flexShrink: 0 }}>
            {/* SERVIDORES */}
            <h3 style={{ fontSize: 11, fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 16, paddingLeft: 16 }}>
                Servidores
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40, padding: '0 8px' }}>
                {servidores.map(serv => (
                    <button 
                        key={serv.id}
                        onClick={() => setSelectedServ(serv.id)}
                        style={{
                            padding: '8px 16px',
                            borderRadius: 100,
                            background: selectedServ === serv.id ? 'var(--gold)' : 'rgba(255,255,255,0.05)',
                            border: 'none',
                            color: selectedServ === serv.id ? '#000' : 'var(--muted)',
                            cursor: 'pointer',
                            fontSize: 12,
                            fontWeight: 700,
                            transition: 'all 0.2s'
                        }}
                    >
                        {serv.nome}
                    </button>
                ))}
            </div>

            {/* CATEGORIAS */}
            <h3 style={{ fontSize: 11, fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 16, paddingLeft: 16 }}>
                Categorias
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <button 
                    onClick={() => setSelectedCat(null)}
                    style={{
                        textAlign: 'left',
                        padding: '14px 18px',
                        borderRadius: 12,
                        background: selectedCat === null ? 'rgba(245, 166, 35, 0.08)' : 'transparent',
                        border: '1px solid',
                        borderColor: selectedCat === null ? 'var(--gold)' : 'transparent',
                        color: selectedCat === null ? 'var(--gold)' : 'var(--muted)',
                        cursor: 'pointer',
                        fontSize: 14,
                        fontWeight: selectedCat === null ? 700 : 500
                    }}
                >
                    Todos os Produtos
                </button>
                {categorias.map(cat => (
                    <button 
                        key={cat.id}
                        onClick={() => setSelectedCat(cat.id)}
                        style={{
                            textAlign: 'left',
                            padding: '14px 18px',
                            borderRadius: 12,
                            background: selectedCat === cat.id ? 'rgba(245, 166, 35, 0.08)' : 'transparent',
                            border: '1px solid',
                            borderColor: selectedCat === cat.id ? 'var(--gold)' : 'transparent',
                            color: selectedCat === cat.id ? 'var(--gold)' : 'var(--muted)',
                            cursor: 'pointer',
                            fontSize: 14,
                            fontWeight: selectedCat === cat.id ? 700 : 500
                        }}
                    >
                        {cat.nome}
                    </button>
                ))}
            </div>
        </aside>

        {/* Grid de Produtos */}
        <div style={{ flex: 1 }}>
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
                gap: 32 
            }}>
                {filteredProdutos.map(prod => (
                    <article key={prod.id} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <div style={{ height: 180, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56, opacity: 0.15 }}>
                            📦
                        </div>
                        <div style={{ padding: 32, flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 12 }}>{prod.nome}</h3>
                            <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 28, flex: 1 }}>{prod.descricao}</p>
                            
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: 20, borderTop: '1px solid var(--border)' }}>
                                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--gold)' }}>
                                    R$ {prod.preco.toFixed(2)}
                                </div>
                                <button className="btn-primary" onClick={() => handleAdd(prod)} style={{ padding: '10px 20px', fontSize: 13 }}>
                                    ADICIONAR
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
            
            {filteredProdutos.length === 0 && (
                <div style={{ padding: '100px 0', textAlign: 'center' }}>
                    <div style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 8 }}>Nenhum produto encontrado</div>
                    <p style={{ fontSize: 14, color: 'var(--muted)' }}>Tente explorar outras categorias ou mude o servidor.</p>
                </div>
            )}
        </div>
      </div>
      
      <style>{`
          @media (max-width: 900px) {
              .shop-layout { flex-direction: column !important; gap: 40px !important; }
              aside { position: relative !important; top: 0 !important; width: 100% !important; max-width: 100% !important; }
          }
      `}</style>
    </div>
  );
}
