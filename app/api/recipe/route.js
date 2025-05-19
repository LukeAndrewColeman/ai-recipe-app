import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { database, ID } from '@/config/server-appwrite';
import { Query } from 'appwrite';

export async function POST(request) {
  const body = await request.json();
  const { recipe } = body;
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const savedRecipe = await database.createDocument(
    'smartrecipeai',
    'recipes',
    ID.unique(),
    {
      ...recipe,
      userId: user.id,
    }
  );

  return NextResponse.json({ message: 'Recipe saved successfully' });
}

export async function GET(request) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const recipes = await database.listDocuments('smartrecipeai', 'recipes', [
    Query.equal('userId', user.id),
  ]);

  return NextResponse.json(recipes.documents);
}

export async function DELETE(request) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await request.json();
  await database.deleteDocument('smartrecipeai', 'recipes', id);

  return NextResponse.json({ message: 'Recipe deleted successfully' });
}
