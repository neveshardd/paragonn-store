import { MercadoPagoConfig, Payment } from 'mercadopago';
import { NextResponse } from 'next/server';

const clientMP = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN || '' 
});

export async function POST(request: Request) {
  try {
    const { cart, nick, email, method } = await request.json();
    const total = Number(cart.reduce((acc: number, item: any) => acc + (item.preco * item.quantity), 0).toFixed(2));

    // Só envia notification_url se for uma URL validável (não localhost)
    const dashUrl = process.env.NEXT_PUBLIC_DASH_URL || '';
    const notificationUrl = dashUrl.includes('localhost') ? undefined : `${dashUrl}/api/webhooks/mercadopago`;

    if (method === 'pix') {
        const payment = new Payment(clientMP);
        const result = await payment.create({
            body: {
                transaction_amount: total,
                description: `PAGAMENTO: ${nick}`,
                payment_method_id: 'pix',
                payer: { email },
                metadata: {
                    nick,
                    items: JSON.stringify(cart.map((i: any) => ({ id: i.id, cmd: i.comando || '' })))
                },
                notification_url: notificationUrl,
            }
        });

        return NextResponse.json({ 
            method: 'pix',
            qr_code: result.point_of_interaction?.transaction_data?.qr_code,
            qr_code_base64: result.point_of_interaction?.transaction_data?.qr_code_base64,
            payment_id: result.id
        });
    }

    return NextResponse.json({ error: 'Método de pagamento inválido' }, { status: 400 });

  } catch (error: any) {
    console.error('Checkout error:', error.message || error);
    // Log detalhado para o usuário
    if (error.cause) console.error('Error Cause:', error.cause);
    
    return NextResponse.json({ 
      error: 'Erro ao processar checkout', 
      details: error.message 
    }, { status: 500 });
  }
}
