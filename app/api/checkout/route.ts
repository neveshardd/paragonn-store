import { MercadoPagoConfig, Payment } from 'mercadopago';
import { NextResponse } from 'next/server';

const clientMP = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN || '' 
});

export async function POST(request: Request) {
    try {
        const { cart, nick, email } = await request.json();
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const total = cart.reduce((acc: number, item: any) => acc + (item.preco * item.quantity), 0);
        
        const dashUrl = process.env.NEXT_PUBLIC_DASH_URL || '';
        const notificationUrl = dashUrl.includes('localhost') ? undefined : `${dashUrl}/api/webhooks/mercadopago`;

        const payment = new Payment(clientMP);
        const result = await payment.create({
            body: {
                transaction_amount: Number(total.toFixed(2)),
                description: `PAGAMENTO: ${nick}`,
                payment_method_id: 'pix',
                payer: { 
                    email,
                    first_name: nick.split(' ')[0] || 'Jogador',
                    last_name: 'Paragonn'
                },
                metadata: {
                    nick,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    items: JSON.stringify(cart.map((i: any) => ({ id: i.id, cmd: i.comando || '' })))
                },
                notification_url: notificationUrl,
            }
        });

        if (result.point_of_interaction?.transaction_data) {
            return NextResponse.json({
                method: 'pix',
                qr_code: result.point_of_interaction.transaction_data.qr_code,
                qr_code_base64: result.point_of_interaction.transaction_data.qr_code_base64,
                id: result.id
            });
        }

        console.error('MP Pix Error Result:', result);
        return NextResponse.json({ error: 'Erro ao gerar dados do PIX' }, { status: 500 });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('--- MERCADO PAGO PIX ERROR ---');
        console.error('MESSAGE:', error.message);
        if (error.cause) console.error('CAUSE:', JSON.stringify(error.cause, null, 2));

        return NextResponse.json({ 
            error: 'Erro ao processar checkout', 
            details: error.message || 'internal_error' 
        }, { status: 500 });
    }
}
