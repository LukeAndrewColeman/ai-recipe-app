import { NextResponse } from 'next/server';
import { database, ID } from '@/config/server-appwrite';
import { Query } from 'appwrite';

export async function POST(req, res) {
  const body = await req.json();
  const { user } = body;

  const clerkUserId = user.id;
  const email = user.emailAddresses?.[0]?.emailAddress || '';

  if (!clerkUserId) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  if (!email) {
    return NextResponse.json(
      { error: 'User does not have an email address.' },
      { status: 400 }
    );
  }

  const existingUser = await database.listDocuments('smartRecipe AI', 'users', [
    Query.equal('clerkUserId', clerkUserId),
  ]);

  if (existingUser.total > 0) {
    return NextResponse.json(
      { error: 'User already exists.' },
      { status: 400 }
    );
  }

  const data = {
    clerkUserId,
    email,
    stripeSubscriptionId: null,
    credits: 20,
  };

  const newUser = await database.createDocument(
    'smartRecipe AI',
    'users',
    ID.unique(),
    data
  );

  return NextResponse.json(newUser);
}
