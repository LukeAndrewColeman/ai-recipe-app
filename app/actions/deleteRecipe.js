import { database } from '@/config/appwrite';

export async function deleteRecipe(recipeId) {
  try {
    const recipe = await database.deleteDocument(
      'smartRecipe AI',
      'recipes',
      recipeId
    );
    return { success: true, message: 'Recipe deleted successfully', recipe };
  } catch (error) {
    console.error('Error deleting recipe:', error);
    return { success: false, message: 'Failed to delete recipe' };
  }
}
