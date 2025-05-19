import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { database } from '@/config/server-appwrite';
import { Query } from 'appwrite';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Use your Stripe webhook secret from your environment variables
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
  try {
    // Get the raw body as text
    const body = await req.text();

    // Get the signature from the headers
    const signature = headers().get('stripe-signature');

    // Verify the webhook signature
    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      );
    }

    // Handle the event based on its type
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const userId = session.metadata?.userId;
        const credits = parseInt(session.metadata?.credits, 10);
        console.log('credits', credits);

        if (!userId || !credits) {
          console.error('Missing userId or credits in session metadata');
          return NextResponse.json(
            { error: 'Missing userId or credits in session metadata' },
            { status: 400 }
          );
        }

        // Find the user in your database
        const userDoc = await database.listDocuments('smartrecipeai', 'users', [
          Query.equal('clerkUserId', userId),
        ]);

        if (!userDoc.documents.length) {
          console.error('User not found in database');
          return NextResponse.json(
            { error: 'User not found in database' },
            { status: 404 }
          );
        }

        // Update the user's credits
        const currentCredits = userDoc.documents[0].credits;
        const newCredits = currentCredits + credits;

        await database.updateDocument(
          'smartrecipeai',
          'users',
          userDoc.documents[0].$id,
          {
            credits: newCredits,
          }
        );

        console.log(
          `Updated user credits from ${currentCredits} to ${newCredits}`
        );
        break;
      }

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object;
        console.log('Payment failed!');
        // Here you can:
        // 1. Update your database to mark the payment as failed
        // 2. Send a notification to the customer about the failed payment
        // 3. Log the failure reason for debugging
        break;

      case 'payment_intent.canceled':
        const canceledPayment = event.data.object;
        console.log('Payment was canceled!');
        // Here you can:
        // 1. Update your database to mark the payment as canceled
        // 2. Handle any cleanup needed for the canceled payment
        break;

      case 'customer.subscription.created':
        const subscription = event.data.object;
        console.log('Subscription created!');
        // Handle new subscription
        // Update your database, send welcome emails, etc.
        break;

      case 'customer.subscription.updated':
        const updatedSubscription = event.data.object;
        console.log('Subscription updated!');
        // Handle subscription update
        // Update your database, notify customer of changes, etc.
        break;

      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object;
        console.log('Subscription cancelled!');
        // Handle subscription cancellation
        // Update your database, send cancellation confirmation, etc.
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the webhook
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
