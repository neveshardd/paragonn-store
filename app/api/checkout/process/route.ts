import { MercadoPagoConfig, Payment } from 'mercadopago';
import { NextResponse } from 'next/server';

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN || '' 
});

export async function POST(request: Request) {
  try {
    const { token, issuer_id, payment_method_id, transaction_amount, installments, payer, metadata } = await request.json();

    const dashUrl = process.env.NEXT_PUBLIC_DASH_URL || '';
    const notificationUrl = dashUrl.includes('localhost') ? undefined : `${dashUrl}/api/webhooks/mercadopago`;

    const payment = new Payment(client);
    
    const result = await payment.create({
      body: {
        token,
        issuer_id,
        payment_method_id,
        transaction_amount,
        installments,
        payer,
        metadata,
        notification_url: notificationUrl,
      }
    });

    return NextResponse.json({ 
        status: result.status, 
        id: result.id,
        detail: result.status_detail 
    });

  } catch (error) {
    console.error('Process Payment Error:', error);
    return NextResponse.json({ error: 'Erro ao processar pagamento com cartão' }, { status: 500 });
  }
}
