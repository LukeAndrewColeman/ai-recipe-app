import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { currentUser } from '@clerk/nextjs/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { priceId, credits } = await req.json();
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: user.emailAddresses[0].emailAddress,
      metadata: {
        userId: user.id,
        credits: credits,
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/recipe-book`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/buy-credits`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
