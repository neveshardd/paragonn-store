"use client";

import { useCart } from "../context/CartContext";
import { useState } from "react";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, total, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [nick, setNick] = useState("");
  const [email, setEmail] = useState("");
  const [payment, setPayment] = useState<"pix" | "cartao" | "paypal" | null>(null);

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nick || !email || !payment) {
        alert("Preencha todos os campos!");
        return;
    }
    setStep(2);
    // clearCart() se quiser limpar após sucesso
  };

  if (cart.length === 0 && step === 1) {
    return (
        <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center' }}>
            <h1 className="section-title">Seu carrinho está vazio</h1>
            <p style={{ color: 'var(--muted)', marginBottom: 32 }}>Adicione alguns itens para continuar com a compra.</p>
            <Link href="/" className="btn-primary">VOLTAR À LOJA</Link>
        </div>
    );
  }

  return (
    <main style={{ minHeight: '100vh', paddingTop: 180, paddingBottom: 100, maxWidth: 1000, margin: '0 auto', padding: '180px 24px 100px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: step === 1 ? '1.5fr 1fr' : '1fr', gap: 48 }}>
        
        {step === 1 ? (
            <>
                {/* Form Side */}
                <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 24, padding: 48 }}>
                    <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 32, fontFamily: 'var(--font-display)' }}>Finalizar Pedido</h1>
                    
                    <form onSubmit={handleFinish} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                            <div>
                                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 10 }}>Seu Nick</label>
                                <input 
                                    required
                                    type="text" 
                                    value={nick}
                                    onChange={e => setNick(e.target.value)}
                                    placeholder="Ex: Notch"
                                    style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 12, color: '#fff' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 10 }}>Seu E-mail</label>
                                <input 
                                    required
                                    type="email" 
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="voce@exemplo.com"
                                    style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 12, color: '#fff' }}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 16 }}>Forma de Pagamento</label>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                                {[
                                    { id: 'pix', label: 'Pix Instantâneo' },
                                    { id: 'cartao', label: 'Cartão de Crédito' },
                                    { id: 'paypal', label: 'PayPal Global' }
                                ].map(m => (
                                    <div 
                                        key={m.id}
                                        onClick={() => setPayment(m.id as any)}
                                        style={{
                                            padding: '20px 16px',
                                            borderRadius: 16,
                                            border: '1px solid',
                                            borderColor: payment === m.id ? 'var(--gold)' : 'var(--border)',
                                            background: payment === m.id ? 'rgba(245, 166, 35, 0.05)' : 'transparent',
                                            cursor: 'pointer',
                                            textAlign: 'center',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <div style={{ color: payment === m.id ? 'var(--gold)' : '#fff', fontWeight: 700, fontSize: 13 }}>{m.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button className="btn-primary" type="submit" style={{ width: '100%', padding: 18, fontSize: 16, marginTop: 12 }}>
                            CONCLUIR PAGAMENTO
                        </button>
                    </form>
                </div>

                {/* Summary Side */}
                <div style={{ background: 'rgba(245, 166, 35, 0.03)', border: '1px solid var(--border)', borderRadius: 24, padding: 32, height: 'fit-content' }}>
                    <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 24 }}>Resumo do Pedido</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
                        {cart.map(item => (
                            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                                <span style={{ color: 'var(--muted)' }}>{item.quantity}x {item.nome}</span>
                                <span style={{ color: '#fff', fontWeight: 600 }}>R$ {(item.preco * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>Total</span>
                        <span style={{ fontSize: 24, fontWeight: 800, color: 'var(--gold)' }}>R$ {total.toFixed(2)}</span>
                    </div>
                </div>
            </>
        ) : (
            <div style={{ textAlign: 'center', maxWidth: 500, margin: '0 auto', background: 'var(--surface)', padding: 64, borderRadius: 32, border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 64, marginBottom: 32 }}>🔥</div>
                <h1 style={{ fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 16 }}>Pedido Registrado!</h1>
                <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: 40 }}>
                    Enviamos as instruções para o seu e-mail (<strong>{email}</strong>). 
                    O produto será ativado no nick <strong>{nick}</strong> assim que o pagamento for confirmado via <strong>{payment?.toUpperCase()}</strong>.
                </p>
                <Link href="/" className="btn-primary" style={{ width: '100%', textDecoration: 'none' }}>
                    VOLTAR PARA A LOJA
                </Link>
            </div>
        )}

      </div>
    </main>
  );
}
