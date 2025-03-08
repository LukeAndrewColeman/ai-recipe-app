import { database } from '@/config/appwrite';
import { Query } from 'appwrite';

export async function getSavedRecipes(userId) {
  if (!userId) {
    return { success: false, message: 'User ID is required' };
  }

  try {
    const recipes = await database.listDocuments('smartrecipeai', 'recipes', [
      Query.equal('userId', userId),
    ]);
    return recipes;
  } catch (error) {
    console.error('Error fetching saved recipes:', error);
    return { success: false, message: 'Error fetching saved recipes' };
  }
}
