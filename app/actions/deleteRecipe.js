'use server';

import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client
const prisma = new PrismaClient();

export async function deleteRecipe(recipeId) {
  try {
    // Just delete the recipe - the cascade will handle favorites automatically
    await prisma.recipe.delete({
      where: {
        id: recipeId,
      },
    });

    return {
      success: true,
      message: 'Recipe deleted successfully',
    };
  } catch (error) {
    console.error('Error deleting recipe:', error);
    return {
      success: false,
      message: 'Failed to delete recipe',
    };
  }
}
