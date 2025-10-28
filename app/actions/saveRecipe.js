import { database } from '@/config/appwrite';
import { ID } from 'appwrite';

export async function saveRecipe(recipeData) {
  try {
    const recipe = await database.createDocument(
      'smartRecipe AI',
      'recipes',
      ID.unique(),
      recipeData
    );

    return { success: true, message: 'Recipe saved successfully' };
  } catch (error) {
    console.error('Error saving recipe:', error);
    return { success: false, message: 'Error saving recipe' };
  }
}
