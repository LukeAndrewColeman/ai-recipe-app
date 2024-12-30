'use server';

import prisma from '@/lib/prisma';
import { auth } from '@/app/auth';

export async function saveRecipe(recipeData) {
  try {
    // Get the current session
    const session = await auth();
    if (!session?.user) {
      return {
        success: false,
        message: 'You must be logged in to save recipes',
      };
    }

    // Get the user from the database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    const userId = user.id;

    // First, check if the recipe already exists in the Recipe table
    let recipe = await prisma.recipe.findFirst({
      where: {
        title: recipeData.name || recipeData.title,
        description: recipeData.description,
      },
    });

    // If recipe doesn't exist, create it
    if (!recipe) {
      recipe = await prisma.recipe.create({
        data: {
          title: recipeData.name || recipeData.title,
          description: recipeData.description,
          ingredients: JSON.stringify(recipeData.ingredients || []),
          instructions: JSON.stringify(recipeData.instructions || []),
          cuisine: recipeData.cuisine || 'international',
          cookingTime: parseInt(recipeData.cookingTime) || 0,
          userId: userId, // Using default user as creator
        },
      });
    }

    // Check if the favorite already exists
    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_recipeId: {
          userId,
          recipeId: recipe.id,
        },
      },
    });

    if (existingFavorite) {
      return {
        success: false,
        message: 'Recipe already saved to favorites',
      };
    }

    // Create new favorite
    await prisma.favorite.create({
      data: {
        userId,
        recipeId: recipe.id,
      },
    });

    return {
      success: true,
      message: 'Recipe saved to favorites successfully',
    };
  } catch (error) {
    console.error('Error saving recipe:', error);
    return {
      success: false,
      message: 'Failed to save recipe',
    };
  }
}
