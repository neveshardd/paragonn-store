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
            <h3 style={{ fontSize: 11, fontWeight: 900, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 16, paddingLeft: 12 }}>
                Servidores
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 40 }}>
                <button 
                    onClick={() => { setSelectedServ(null); setSelectedCat(null); }}
                    style={{
                        textAlign: 'left',
                        padding: '12px 16px',
                        borderRadius: 12,
                        background: selectedServ === null ? 'var(--gold-linear)' : 'transparent',
                        color: selectedServ === null ? '#000' : 'var(--muted)',
                        cursor: 'pointer',
                        fontSize: 14,
                        fontWeight: selectedServ === null ? 700 : 500,
                        transition: 'all 0.2s',
                        border: 'none'
                    }}
                >
                    Todos os Servidores
                </button>
                {servidores.map(serv => (
                    <button 
                        key={serv.id}
                        onClick={() => { setSelectedServ(serv.id); setSelectedCat(null); }}
                        style={{
                            textAlign: 'left',
                            padding: '12px 16px',
                            borderRadius: 12,
                            background: selectedServ === serv.id ? 'var(--gold-linear)' : 'transparent',
                            color: selectedServ === serv.id ? '#000' : 'var(--muted)',
                            cursor: 'pointer',
                            fontSize: 14,
                            fontWeight: selectedServ === serv.id ? 700 : 500,
                            transition: 'all 0.2s',
                            border: 'none'
                        }}
                    >
                        {serv.nome}
                    </button>
                ))}
            </div>

            {/* Divisor */}
            <div style={{ height: 1, background: 'var(--border)', margin: '32px 12px' }}></div>

            {/* CATEGORIAS */}
            <h3 style={{ fontSize: 11, fontWeight: 900, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 16, paddingLeft: 12 }}>
                Categorias
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <button 
                    onClick={() => setSelectedCat(null)}
                    style={{
                        textAlign: 'left',
                        padding: '12px 16px',
                        borderRadius: 12,
                        background: selectedCat === null ? 'rgba(245, 166, 35, 0.12)' : 'transparent',
                        border: '1px solid',
                        borderColor: selectedCat === null ? 'var(--gold)' : 'transparent',
                        color: selectedCat === null ? 'var(--gold)' : 'var(--muted)',
                        cursor: 'pointer',
                        fontSize: 14,
                        fontWeight: selectedCat === null ? 700 : 500,
                        transition: 'all 0.2s'
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
                            padding: '12px 16px',
                            borderRadius: 12,
                            background: selectedCat === cat.id ? 'rgba(245, 166, 35, 0.12)' : 'transparent',
                            border: '1px solid',
                            borderColor: selectedCat === cat.id ? 'var(--gold)' : 'transparent',
                            color: selectedCat === cat.id ? 'var(--gold)' : 'var(--muted)',
                            cursor: 'pointer',
                            fontSize: 14,
                            fontWeight: selectedCat === cat.id ? 700 : 500,
                            transition: 'all 0.2s'
                        }}
                    >
                        {cat.nome}
                    </button>
                ))}
            </div>

             {/* Suporte Info */}
             <div className="card" style={{ marginTop: 40, padding: 24, background: 'rgba(255,255,255,0.01)' }}>
                <h4 style={{ fontSize: 12, fontWeight: 800, color: '#fff', marginBottom: 12 }}>Precisa de ajuda?</h4>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 20 }}>
                    Abra um ticket em nosso Discord ou Instagram.
                </p>
                <a href="#" className="btn-outline" style={{ display: 'flex', width: '100%', fontSize: 12 }}>SUPORTE</a>
            </div>
        </aside>

        {/* Product Grid Area */}
        <div style={{ flex: 1 }}>
            <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: 24, fontWeight: 800, color: '#fff', fontFamily: 'var(--font-display)' }}>
                    {selectedCat ? categorias.find(c => c.id === selectedCat)?.nome : 'Todos os Produtos'}
                </h2>
                <div style={{ fontSize: 13, color: 'var(--muted)' }}>
                    Mostrando <strong>{filteredProdutos.length}</strong> itens
                </div>
            </div>

            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
                gap: 24 
            }}>
                {filteredProdutos.map(prod => (
                    <article key={prod.id} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <div style={{ 
                            position: 'relative',
                            height: 180, 
                            background: 'linear-gradient(45deg, #15131f, #1a1726)', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            borderBottom: '1px solid var(--border)',
                            overflow: 'hidden'
                        }}>
                            {prod.imagem ? (
                              <img 
                                src={prod.imagem} 
                                alt={prod.nome} 
                                style={{ 
                                  width: '100%', 
                                  height: '100%', 
                                  objectFit: 'cover',
                                  transition: 'transform 0.5s ease'
                                }} 
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <div style={{ fontSize: 72, filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.5))' }}>
                                  {prod.categoriaId === 1 ? '💎' : prod.categoriaId === 2 ? '⚔️' : '🎁'}
                              </div>
                            )}
                            <div style={{ 
                                position: 'absolute', 
                                bottom: 16, 
                                left: 16, 
                                padding: '4px 12px', 
                                background: 'var(--gold-linear)', 
                                color: '#000', 
                                borderRadius: 100, 
                                fontSize: 10, 
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                pointerEvents: 'none'
                            }}>
                                {servidores.find(s => s.id === prod.servidorId)?.nome}
                            </div>
                        </div>

                        <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ marginBottom: 16 }}>
                                <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>
                                    {categorias.find(c => c.id === prod.categoriaId)?.nome}
                                </div>
                                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>{prod.nome}</h3>
                            </div>
                            
                            <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 32, flex: 1 }}>
                                {prod.descricao}
                            </p>
                            
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: 20, borderTop: '1px solid var(--border)' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 2 }}>Investimento</span>
                                    <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', fontFamily: 'var(--font-display)' }}>
                                        R$ {prod.preco.toFixed(2)}
                                    </div>
                                </div>
                                <button className="btn-primary" onClick={() => handleAdd(prod)} style={{ padding: '12px 20px', borderRadius: 12 }}>
                                    ADQUIRIR
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
            
            {filteredProdutos.length === 0 && (
                <div style={{ padding: '100px 0', textAlign: 'center', background: 'var(--surface)', borderRadius: 24, border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>🔎</div>
                    <h3 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Nenhum item nesta prateleira</h3>
                    <p style={{ color: 'var(--muted)', fontSize: 14 }}>Explore outras categorias ou altere o servidor selecionado.</p>
                </div>
            )}
        </div>
      </div>
      
      <style>{`
          @media (max-width: 1000px) {
              .shop-layout { grid-template-columns: 1fr !important; gap: 40px !important; }
              aside { position: relative !important; top: 0 !important; }
          }
      `}</style>
    </div>
  );
}
