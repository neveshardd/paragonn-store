"use client";

import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function CartSidebar({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { cart, removeFromCart, total } = useCart();

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000, display: 'flex', justifyContent: 'flex-end' }}>
        {/* Backdrop */}
        <div 
            onClick={onClose}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }} 
        />

        {/* Sidebar */}
        <div className="fade-left" style={{
            position: 'relative',
            width: '100%',
            maxWidth: 400,
            height: '100%',
            background: 'var(--surface)',
            borderLeft: '1px solid var(--border)',
            padding: 40,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '-20px 0 40px rgba(0,0,0,0.5)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-display)' }}>Seu Carrinho</h2>
                <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: 24 }}>&times;</button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
                {cart.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--muted)' }}>
                        Seu carrinho está vazio.
                    </div>
                ) : (
                    cart.map(item => (
                        <div key={item.id} style={{ display: 'flex', gap: 16, padding: 16, border: '1px solid var(--border)', borderRadius: 12, background: 'rgba(255,255,255,0.02)' }}>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 4 }}>{item.nome}</h4>
                                <div style={{ color: 'var(--gold)', fontWeight: 700, fontSize: 14 }}>
                                    {item.quantity}x R$ {item.preco.toFixed(2)}
                                </div>
                            </div>
                            <button 
                                onClick={() => removeFromCart(item.id)}
                                style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}
                            >
                                REMOVER
                            </button>
                        </div>
                    ))
                )}
            </div>

            {cart.length > 0 && (
                <div style={{ marginTop: 40, paddingTop: 32, borderTop: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                        <span style={{ color: 'var(--muted)', fontWeight: 500 }}>Total</span>
                        <span style={{ color: 'var(--gold)', fontSize: 24, fontWeight: 800 }}>R$ {total.toFixed(2)}</span>
                    </div>
                    
                    <Link 
                        href="/checkout" 
                        onClick={onClose}
                        className="btn-primary" 
                        style={{ width: '100%', textDecoration: 'none' }}
                    >
                        FINALIZAR COMPRA
                    </Link>
                </div>
            )}
        </div>

        <style>{`
            @keyframes slideIn {
                from { transform: translateX(100%); }
                to { transform: translateX(0); }
            }
            .fade-left { animation: slideIn 0.3s ease-out both; }
        `}</style>
    </div>
  );
}
