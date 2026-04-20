"use client";

import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import Link from "next/link";

declare global {
  interface Window {
    MercadoPago: any;
  }
}

export default function CheckoutPage() {
    const { cart, total, clearCart } = useCart();
    const [step, setStep] = useState(1);
    const [nick, setNick] = useState("");
    const [email, setEmail] = useState("");
    const [payment, setPayment] = useState<"pix" | "cartao" | null>(null);
    const [loading, setLoading] = useState(false);
    const [pixData, setPixData] = useState<{ qr_code: string, qr_code_base64: string } | null>(null);

    // Estado do formulário de cartão
    const [cardData, setCardData] = useState({
        cardNumber: "",
        cardExpirationMonth: "",
        cardExpirationYear: "",
        securityCode: "",
        cardholderName: "",
        identificationType: "CPF",
        identificationNumber: ""
    });

    useEffect(() => {
        // Carrega o script do MP se não existir
        if (typeof window !== "undefined" && !window.MercadoPago) {
            const script = document.createElement('script');
            script.src = "https://sdk.mercadopago.com/js/v2";
            script.onload = () => {
                console.log("Mercado Pago SDK carregado");
            };
            document.body.appendChild(script);
        }
    }, []);

    const handleNextStep = (e: React.FormEvent) => {
        e.preventDefault();
        if (!nick || !email || !payment) {
            alert("Preencha todos os campos!");
            return;
        }
        
        if (payment === 'pix') {
            generatePix();
        } else {
            setStep(2);
        }
    };

    const processCardPayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const mp = new window.MercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY);
            
            const cleanCardNumber = cardData.cardNumber.replace(/\s/g, "");
            const cleanIdentificationNumber = cardData.identificationNumber.replace(/\D/g, "");

            // Detecção básica de bandeira
            let paymentMethod = 'master';
            if (cleanCardNumber.startsWith('4')) paymentMethod = 'visa';
            else if (cleanCardNumber.startsWith('3')) paymentMethod = 'amex';
            else if (cleanCardNumber.startsWith('6') || cleanCardNumber.startsWith('50')) paymentMethod = 'elo';
            else if (cleanCardNumber.startsWith('5')) paymentMethod = 'master';

            // Cria o token do cartão de forma transparente
            const tokenResponse = await mp.createCardToken({
                cardNumber: cleanCardNumber,
                cardExpirationMonth: cardData.cardExpirationMonth,
                cardExpirationYear: cardData.cardExpirationYear,
                securityCode: cardData.securityCode,
                cardholderName: cardData.cardholderName,
                identificationType: cardData.identificationType,
                identificationNumber: cleanIdentificationNumber,
            });

            if (tokenResponse.id) {
                const res = await fetch('/api/checkout/process', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        token: tokenResponse.id,
                        transaction_amount: total,
                        payment_method_id: paymentMethod, 
                        installments: 1,
                        payer: { email },
                        metadata: { nick, items: JSON.stringify(cart.map(i => ({ id: i.id, cmd: i.comando }))) }
                    })
                });
                const data = await res.json();
                if (data.status === 'approved') {
                    alert("Pagamento Aprovado!");
                    setStep(1); clearCart();
                } else {
                    alert("Pagamento " + (data.status || 'recusado') + ": " + (data.detail || 'Verifique os dados'));
                }
            } else {
                const errorMsg = tokenResponse.cause?.[0]?.message || "Dados do cartão inválidos";
                alert("Erro: " + errorMsg);
            }
        } catch (err) {
            console.error(err);
            alert("Erro na conexão com o Mercado Pago");
        } finally {
            setLoading(false);
        }
    };

    const generatePix = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cart, nick, email, method: 'pix' })
            });
            const data = await res.json();
            if (data.method === 'pix') {
                setPixData(data);
                setStep(2);
                clearCart();
            } else {
                alert(data.error || "Erro ao gerar PIX");
            }
        } catch (err) {
            alert("Erro ao conectar com a API");
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0 && step === 1) {
        return (
            <main style={{ minHeight: '80vh', paddingTop: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '180px 24px' }}>
                <h1 style={{ fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 16 }}>Seu carrinho está vazio</h1>
                <p style={{ color: 'var(--muted)', marginBottom: 32, fontSize: 16 }}>Adicione alguns itens para continuar com a compra.</p>
                <Link href="/" className="btn-primary" style={{ textDecoration: 'none' }}>VOLTAR À LOJA</Link>
            </main>
        );
    }

    return (
        <main style={{ minHeight: '100vh', paddingTop: 180, paddingBottom: 100, maxWidth: 1000, margin: '0 auto', padding: '180px 24px 100px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: step === 1 ? '1.5fr 1fr' : '1fr', gap: 48 }}>

                {step === 1 ? (
                    <>
                        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 24, padding: 48 }}>
                            <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 32, fontFamily: 'var(--font-display)' }}>Finalizar Pedido</h1>
                            <form onSubmit={handleNextStep} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 10 }}>Seu Nick</label>
                                        <input required type="text" value={nick} onChange={e => setNick(e.target.value)} placeholder="Ex: Notch" style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 12, color: '#fff' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 10 }}>Seu E-mail</label>
                                        <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="voce@exemplo.com" style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 12, color: '#fff' }} />
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 16 }}>Forma de Pagamento</label>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                                        {[
                                            { id: 'pix', label: 'Pix Instantâneo' },
                                            { id: 'cartao', label: 'Cartão de Crédito' }
                                        ].map(m => (
                                            <div key={m.id} onClick={() => setPayment(m.id as any)} style={{ padding: '20px 16px', borderRadius: 16, border: '1px solid', borderColor: payment === m.id ? 'var(--gold)' : 'var(--border)', background: payment === m.id ? 'rgba(245, 166, 35, 0.05)' : 'transparent', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s' }}>
                                                <div style={{ color: payment === m.id ? 'var(--gold)' : '#fff', fontWeight: 700, fontSize: 13 }}>{m.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <button className="btn-primary" type="submit" disabled={loading} style={{ width: '100%', padding: 18, fontSize: 16, marginTop: 12 }}>
                                    {loading ? 'PROCESSANDO...' : 'REVISAR PEDIDO'}
                                </button>
                            </form>
                        </div>
                        <div style={{ background: 'rgba(245, 166, 35, 0.03)', border: '1px solid var(--border)', borderRadius: 24, padding: 32, height: 'fit-content' }}>
                            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 24 }}>Resumo</h2>
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
                    <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto', background: 'var(--surface)', padding: '64px 32px', borderRadius: 32, border: '1px solid var(--border)' }}>
                        
                        {payment === 'pix' && pixData && (
                            <div className="fade-up">
                                <h1 style={{ fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 24 }}>Finalize seu PIX</h1>
                                <div style={{ background: '#fff', padding: 12, borderRadius: 12, display: 'inline-block', marginBottom: 24 }}>
                                    <img src={`data:image/png;base64,${pixData.qr_code_base64}`} alt="PIX" style={{ width: 180, height: 180 }} />
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', padding: 16, borderRadius: 12, marginBottom: 24 }}>
                                    <p style={{ color: 'var(--muted)', fontSize: 12, marginBottom: 8, textTransform: 'uppercase' }}>Código Copia e Cola</p>
                                    <div style={{ fontSize: 11, wordBreak: 'break-all', fontFamily: 'monospace', color: 'var(--gold)', marginBottom: 16 }}>{pixData.qr_code}</div>
                                    <button onClick={() => { navigator.clipboard.writeText(pixData.qr_code); alert("Copiado!"); }} className="btn-outline" style={{ width: '100%', fontSize: 13 }}>COPIAR CÓDIGO</button>
                                </div>
                                <p style={{ fontSize: 13, color: 'var(--muted)' }}>Aguardando pagamento... (Aprovação instantânea)</p>
                            </div>
                        )}

                        {payment === 'cartao' && (
                            <div className="fade-up" style={{ textAlign: 'left' }}>
                                <h1 style={{ fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 32, textAlign: 'center' }}>Dados do Cartão</h1>
                                <form onSubmit={processCardPayment} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: 12, color: 'var(--muted)', marginBottom: 8 }}>NÚMERO DO CARTÃO</label>
                                        <input required type="text" placeholder="0000 0000 0000 0000" value={cardData.cardNumber} onChange={e => setCardData({...cardData, cardNumber: e.target.value})} style={{ width: '100%', padding: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 10, color: '#fff' }} />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: 12, color: 'var(--muted)', marginBottom: 8 }}>MÊS (MM)</label>
                                            <input required type="text" placeholder="01" value={cardData.cardExpirationMonth} onChange={e => setCardData({...cardData, cardExpirationMonth: e.target.value})} style={{ width: '100%', padding: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 10, color: '#fff' }} />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: 12, color: 'var(--muted)', marginBottom: 8 }}>ANO (AA)</label>
                                            <input required type="text" placeholder="28" value={cardData.cardExpirationYear} onChange={e => setCardData({...cardData, cardExpirationYear: e.target.value})} style={{ width: '100%', padding: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 10, color: '#fff' }} />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: 12, color: 'var(--muted)', marginBottom: 8 }}>CVV</label>
                                            <input required type="text" placeholder="123" value={cardData.securityCode} onChange={e => setCardData({...cardData, securityCode: e.target.value})} style={{ width: '100%', padding: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 10, color: '#fff' }} />
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: 12, color: 'var(--muted)', marginBottom: 8 }}>NOME IMPRESSO NO CARTÃO</label>
                                        <input required type="text" placeholder="JOÃO D SILVA" value={cardData.cardholderName} onChange={e => setCardData({...cardData, cardholderName: e.target.value})} style={{ width: '100%', padding: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 10, color: '#fff' }} />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16 }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: 12, color: 'var(--muted)', marginBottom: 8 }}>TIPO</label>
                                            <select value={cardData.identificationType} onChange={e => setCardData({...cardData, identificationType: e.target.value})} style={{ width: '100%', padding: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 10, color: '#fff' }}>
                                                <option value="CPF">CPF</option>
                                                <option value="CNPJ">CNPJ</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: 12, color: 'var(--muted)', marginBottom: 8 }}>NÚMERO DO DOCUMENTO</label>
                                            <input required type="text" placeholder="000.000.000-00" value={cardData.identificationNumber} onChange={e => setCardData({...cardData, identificationNumber: e.target.value})} style={{ width: '100%', padding: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 10, color: '#fff' }} />
                                        </div>
                                    </div>
                                    <button className="btn-primary" type="submit" disabled={loading} style={{ width: '100%', padding: 18, fontSize: 16, marginTop: 12 }}>
                                        {loading ? 'PROCESSANDO...' : 'PAGAR AGORA'}
                                    </button>
                                </form>
                            </div>
                        )}

                        <button onClick={() => setStep(1)} style={{ marginTop: 40, background: 'transparent', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: 13, textDecoration: 'underline' }}>
                            CANCELAR E VOLTAR
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}
