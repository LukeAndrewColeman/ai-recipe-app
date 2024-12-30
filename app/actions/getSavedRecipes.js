'use server';

import prisma from '@/lib/prisma';

export async function getSavedRecipes(userId) {
  try {
    const favorites = await prisma.favorite.findMany({
      where: {
        userId: parseInt(userId),
      },
      include: {
        recipe: true,
      },
    });

    const recipes = favorites.map((favorite) => ({
      id: favorite.recipe.id,
      name: favorite.recipe.title,
      description: favorite.recipe.description,
      cookingTime: favorite.recipe.cookingTime
        ? `${favorite.recipe.cookingTime} mins`
        : 'N/A',
      difficulty: 'Medium',
      ingredients: favorite.recipe.ingredients,
      instructions: favorite.recipe.instructions,
      cuisine: favorite.recipe.cuisine,
    }));

    return recipes;
  } catch (error) {
    return [];
  }
}
