"use client";

import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import Link from "next/link";

export default function CartSidebar({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { cart, removeFromCart, total, subtotal, discount, coupon, applyCoupon } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleContinueShopping = () => {
    onClose();
    router.push('/');
  };

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    
    setLoading(true);
    setError("");
    
    try {
      const dashUrl = process.env.NEXT_PUBLIC_DASH_URL || "http://localhost:5173";
      const res = await fetch(`${dashUrl}/api/cupons/validar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codigo: couponCode })
      });

      const data = await res.json();
      if (res.ok) {
        applyCoupon(data);
        setCouponCode("");
      } else {
        setError(data.error || "Cupom inválido");
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000, display: 'flex', justifyContent: 'flex-end' }}>
        {/* Backdrop */}
        <div 
            onClick={onClose}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }} 
        />

        {/* Sidebar */}
        <div className="fade-left cart-sidebar-container" style={{
            position: 'relative',
            width: '100%',
            maxWidth: 440,
            height: '100%',
            background: 'var(--surface)',
            borderLeft: '1px solid var(--border)',
            padding: '32px 24px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '-20px 0 40px rgba(0,0,0,0.5)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', fontFamily: 'var(--font-display)' }}>Seu Carrinho</h2>
                <button 
                    onClick={onClose} 
                    style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 20, width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    &times;
                </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16, paddingRight: 4 }}>
                {cart.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--muted)' }}>
                        <div style={{ fontSize: 48, marginBottom: 16 }}>🛒</div>
                        <p style={{ marginBottom: 24, fontSize: 15 }}>Seu carrinho está vazio.</p>
                        <button 
                            onClick={handleContinueShopping}
                            className="btn-outline"
                            style={{ padding: '12px 32px', fontSize: 13 }}
                        >
                            VER PRODUTOS
                        </button>
                    </div>
                ) : (
                    <>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {cart.map(item => (
                                <div key={item.id} style={{ display: 'flex', gap: 16, padding: 16, border: '1px solid var(--border)', borderRadius: 16, background: 'rgba(255,255,255,0.01)', position: 'relative' }}>
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 4, paddingRight: 40 }}>{item.nome}</h4>
                                        <div style={{ color: 'var(--gold)', fontWeight: 800, fontSize: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <span style={{ fontSize: 12, opacity: 0.6, fontWeight: 500, color: 'var(--text)' }}>{item.quantity}x</span>
                                            R$ {(item.preco * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => removeFromCart(item.id)}
                                        style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontSize: 11, fontWeight: 700, opacity: 0.8 }}
                                    >
                                        REMOVER
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Coupon Section */}
                        <div style={{ marginTop: 24, padding: 20, background: 'rgba(255,255,255,0.02)', borderRadius: 16, border: '1px solid var(--border)' }}>
                            <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Possui um cupom?</label>
                            {coupon ? (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0, 255, 100, 0.05)', padding: '12px 16px', borderRadius: 10, border: '1px solid #00ff64' }}>
                                    <div>
                                        <div style={{ color: '#00ff64', fontSize: 13, fontWeight: 800 }}>{coupon.codigo}</div>
                                        <div style={{ color: 'rgba(0, 255, 100, 0.7)', fontSize: 11 }}>{coupon.desconto}% de desconto aplicado</div>
                                    </div>
                                    <button onClick={() => applyCoupon(null)} style={{ background: 'none', border: 'none', color: '#00ff64', fontSize: 18, cursor: 'pointer' }}>&times;</button>
                                </div>
                            ) : (
                                <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: 8 }}>
                                    <input 
                                        type="text" 
                                        placeholder="CÓDIGO" 
                                        value={couponCode}
                                        onChange={e => setCouponCode(e.target.value.toUpperCase())}
                                        style={{ flex: 1, background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 14px', color: '#fff', fontSize: 13, fontWeight: 600 }}
                                    />
                                    <button 
                                        type="submit" 
                                        disabled={loading}
                                        style={{ padding: '0 16px', background: 'var(--gold)', color: '#000', border: 'none', borderRadius: 10, fontSize: 11, fontWeight: 800, cursor: 'pointer' }}
                                    >
                                        {loading ? '...' : 'APLICAR'}
                                    </button>
                                </form>
                            )}
                            {error && <p style={{ color: '#ff4d4d', fontSize: 11, marginTop: 8, fontWeight: 600 }}>{error}</p>}
                        </div>
                    </>
                )}
            </div>

            {cart.length > 0 && (
                <div style={{ marginTop: 32, paddingTop: 32, borderTop: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: 'var(--muted)', fontSize: 13, fontWeight: 600 }}>Subtotal</span>
                            <span style={{ color: '#fff', fontSize: 15, fontWeight: 700 }}>R$ {subtotal.toFixed(2)}</span>
                        </div>
                        {discount > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: '#00ff64', fontSize: 13, fontWeight: 600 }}>Desconto ({coupon?.desconto}%)</span>
                                <span style={{ color: '#00ff64', fontSize: 15, fontWeight: 700 }}>- R$ {discount.toFixed(2)}</span>
                            </div>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                            <span style={{ color: '#fff', fontWeight: 800, fontSize: 16, textTransform: 'uppercase' }}>Total</span>
                            <span style={{ color: 'var(--gold)', fontSize: 32, fontWeight: 900, fontFamily: 'var(--font-display)' }}>R$ {total.toFixed(2)}</span>
                        </div>
                    </div>
                    
                    <Link 
                        href="/checkout" 
                        onClick={onClose}
                        className="btn-primary" 
                        style={{ width: '100%', textDecoration: 'none', textAlign: 'center', padding: '18px', fontSize: 14 }}
                    >
                        FINALIZAR COMPRA
                    </Link>

                    <button 
                        onClick={handleContinueShopping}
                        style={{ 
                            width: '100%', 
                            marginTop: 12, 
                            background: 'none', 
                            border: '1px solid var(--border)', 
                            color: 'var(--muted)', 
                            padding: '16px', 
                            borderRadius: '12px',
                            fontSize: '13px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            transition: 'all 0.2s'
                        }}
                    >
                        Continuar Comprando
                    </button>
                </div>
            )}
        </div>

        <style>{`
            @keyframes slideIn {
                from { transform: translateX(100%); }
                to { transform: translateX(0); }
            }
            .fade-left { animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) both; }
            @media (max-width: 480px) {
                .cart-sidebar-container {
                    max-width: 100% !important;
                }
            }
        `}</style>
    </div>
  );
}
