'use client';

import RecipeContent from '@/components/RecipeContent';

export default function CuisinePage({ params }) {
  const { cuisine, ingredients } = params;

  if (!cuisine || !ingredients) return null;

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-8'>
        <h1 className='text-4xl font-bold mb-3 capitalize'>
          {cuisine} Recipes
        </h1>
        <p className='text-gray-600'>
          Discover delicious {cuisine} recipes and cooking inspiration.
        </p>
      </div>
      <RecipeContent cuisine={cuisine} ingredients={ingredients} />
    </div>
  );
}
