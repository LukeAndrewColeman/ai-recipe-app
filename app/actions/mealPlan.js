'use server';

import prisma from '@/lib/prisma';

export async function saveMealPlan(day, mealtime, recipeId) {
  try {
    console.log('saveMealPlan called with:', {
      day,
      mealtime,
      recipeId,
      recipeIdType: typeof recipeId,
      parsedRecipeId: parseInt(recipeId),
    });

    const session = await auth();
    if (!session?.user) {
      console.log('No authenticated user found');
      return {
        success: false,
        message: 'You must be logged in to modify meal plans',
      };
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, email: true },
    });

    if (!user) {
      console.log('User not found in database');
      return {
        success: false,
        message: 'User not found',
      };
    }

    // Verify recipe exists first
    const recipe = await prisma.recipe.findUnique({
      where: { id: parseInt(recipeId) },
    });

    if (!recipe) {
      console.log('Recipe not found:', recipeId);
      return {
        success: false,
        message: 'Recipe not found',
      };
    }

    console.log('Found recipe:', recipe);
    console.log('User found:', user);

    // Delete existing meal plan for this slot if it exists
    await prisma.mealPlan.deleteMany({
      where: {
        userId: user.id,
        day: day,
        mealtime: mealtime,
      },
    });

    // Create new meal plan entry
    const newMealPlan = await prisma.mealPlan.create({
      data: {
        userId: user.id,
        recipeId: parseInt(recipeId),
        day: day,
        mealtime: mealtime,
      },
      include: {
        recipe: {
          select: {
            id: true,
            title: true,
            description: true,
            ingredients: true,
            instructions: true,
            cookingTime: true,
            cuisine: true,
          },
        },
      },
    });

    console.log('Created new meal plan:', newMealPlan);

    return {
      success: true,
      message: 'Meal plan saved successfully',
      mealPlan: newMealPlan,
    };
  } catch (error) {
    console.error('Full error:', error);
    return {
      success: false,
      message: error.message || 'Failed to save meal plan',
    };
  }
}

export async function getUserMealPlan() {
  try {
    const session = await auth();
    if (!session?.user) {
      console.log('No authenticated user found');
      return [];
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      console.log('User not found in database');
      return [];
    }

    console.log('Fetching meal plan for user:', user.id);

    const mealPlan = await prisma.mealPlan.findMany({
      where: {
        userId: user.id,
      },
      include: {
        recipe: {
          select: {
            id: true,
            title: true,
            description: true,
            ingredients: true,
            instructions: true,
            cookingTime: true,
            cuisine: true,
          },
        },
      },
      orderBy: [{ day: 'asc' }, { mealtime: 'asc' }],
    });

    console.log('Found meal plan:', mealPlan);

    // Transform the data to match the expected format
    const transformedMealPlan = mealPlan.map((meal) => ({
      ...meal,
      recipe: {
        ...meal.recipe,
        name: meal.recipe.title, // Add name field for consistency
      },
    }));

    console.log('Transformed meal plan:', transformedMealPlan);
    return transformedMealPlan;
  } catch (error) {
    console.error('Error in getUserMealPlan:', error);
    return [];
  }
}

export async function removeMealPlan(day, mealtime) {
  try {
    const session = await auth();
    if (!session?.user) {
      return {
        success: false,
        message: 'You must be logged in to modify meal plans',
      };
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    // Delete the meal plan entry
    await prisma.mealPlan.delete({
      where: {
        userId_day_mealtime: {
          userId: user.id,
          day: day,
          mealtime: mealtime,
        },
      },
    });

    return {
      success: true,
      message: 'Meal removed successfully',
    };
  } catch (error) {
    console.error('Error removing meal plan:', error);
    return {
      success: false,
      message: 'Failed to remove meal',
    };
  }
}
