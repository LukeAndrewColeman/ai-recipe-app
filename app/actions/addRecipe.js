'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';

export async function addRecipe(data) {
  try {
    // Get or create default user
    const defaultUser = await prisma.user.findUnique({
      where: { email: 'default@example.com' },
    });

    if (!defaultUser) {
      return {
        success: false,
        message: 'Default user not found. Please run the seed script.',
      };
    }

    const recipeData = {
      title: String(data.title).trim(),
      description: String(data.description).trim(),
      ingredients: JSON.stringify(data.ingredients || []),
      instructions: JSON.stringify(data.instructions || []),
      cuisine: String(data.cuisine).toLowerCase().trim(),
      cookingTime: Number(data.cookingTime),
      userId: defaultUser.id, // Use the default user's ID
    };

    const recipe = await prisma.recipe.create({
      data: recipeData,
    });

    revalidatePath('/cuisines/[cuisine]');
    return { success: true, message: 'Recipe created successfully' };
  } catch (error) {
    console.error('Error in addRecipe:', error);
    return { success: false, message: error.message };
  }
}
