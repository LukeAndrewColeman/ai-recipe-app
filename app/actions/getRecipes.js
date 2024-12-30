'use server';

import prisma from '@/lib/prisma';

export async function getRecipesByCuisine(cuisine) {
  try {
    const recipes = await prisma.recipe.findMany({
      where: {
        cuisine: cuisine.toLowerCase(),
      },
    });
    return recipes;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
}
