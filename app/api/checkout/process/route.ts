import { MercadoPagoConfig, Payment } from 'mercadopago';
import { NextResponse } from 'next/server';

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN || '' 
});

export async function POST(request: Request) {
  try {
    const { token, payment_method_id, transaction_amount, installments, payer, metadata } = await request.json();

    const dashUrl = process.env.NEXT_PUBLIC_DASH_URL || '';
    const notificationUrl = dashUrl.includes('localhost') ? undefined : `${dashUrl}/api/webhooks/mercadopago`;

    const payment = new Payment(client);
    
    const body = {
        token,
        payment_method_id,
        transaction_amount: Number(transaction_amount),
        description: `Compra na Paragonn Store - ${metadata?.nick || 'Jogador'}`,
        installments: Number(installments),
        payer,
        metadata,
        notification_url: notificationUrl,
    };

    const result = await payment.create({ body });

    return NextResponse.json({ 
        status: result.status, 
        id: result.id,
        detail: result.status_detail 
    });

  } catch (error: any) {
    console.error('--- MERCADO PAGO ERROR LOG ---');
    if (error.cause) {
        console.error('CAUSES:', JSON.stringify(error.cause, null, 2));
    }
    console.error('MESSAGE:', error.message);
    
    return NextResponse.json({ 
        error: 'Erro ao processar pagamento com cartão',
        message: error.message,
        details: error.cause?.[0]?.description || 'Erro interno no gateway'
    }, { status: 500 });
  }
}
