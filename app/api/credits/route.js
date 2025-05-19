import { NextResponse } from 'next/server';
import { database } from '@/config/server-appwrite';
import { Query } from 'appwrite';
import { currentUser } from '@clerk/nextjs/server';

export async function POST(req, res) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userDoc = await database.listDocuments('smartrecipeai', 'users', [
    Query.equal('clerkUserId', user.id),
  ]);

  const credits = userDoc.documents[0].credits;

  if (credits <= 0) {
    return NextResponse.json({ error: 'No credits left' }, { status: 400 });
  }

  const newCredits = credits - 1;

  const updatedUserDoc = await database.updateDocument(
    'smartrecipeai',
    'users',
    userDoc.documents[0].$id,
    {
      credits: newCredits,
    }
  );
  return NextResponse.json({ success: true, updatedUserDoc });
}

export async function GET(req, res) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userDoc = await database.listDocuments('smartrecipeai', 'users', [
    Query.equal('clerkUserId', user.id),
  ]);

  const credits = userDoc.documents[0].credits;
  return NextResponse.json({ credits });
}
