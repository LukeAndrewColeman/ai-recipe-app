'use client';

import { useEffect } from 'react';
import { notFound } from 'next/navigation';
import { use } from 'react';
import RecipeContent from '@/components/RecipeContent';

const VALID_CUISINES = [
  // Asian Cuisine
  'chinese',
  'japanese',
  'korean',
  'thai',
  'vietnamese',
  'indian',
  'malaysian',
  'indonesian',
  'filipino',
  'mongolian',
  'nepalese',
  'sri-lankan',

  // European Cuisine
  'italian',
  'french',
  'english',
  'greek',
  'spanish',
  'german',
  'portuguese',
  'polish',
  'hungarian',
  'turkish',
  'russian',
  'scandinavian',

  // American Cuisine
  'american',
  'mexican',
  'brazilian',
  'peruvian',
  'argentinian',
  'colombian',
  'cuban',
  'cajun',
  'bbq',
  'soul-food',

  // Regional Specialties
  'dim-sum',
  'street-food',
  'tapas',
  'sushi',
  'pizza',

  // Other Cuisines
  'mediterranean',
  'middle-eastern',
  'caribbean',
  'african',
  'fusion',

  // Dietary Preferences
  'vegetarian',
  'vegan',
  'gluten-free',
  'keto',
  'paleo',
  'halal',
  'kosher',

  // Cooking Styles
  'seafood',
  'grilled',
  'slow-cooked',
  'smoked',
  'raw',
  'fermented',
];

export default function CuisinePage({ params }) {
  const resolvedParams = use(params);
  const { cuisine } = resolvedParams;

  useEffect(() => {
    if (!VALID_CUISINES.includes(cuisine?.toLowerCase())) {
      notFound();
    }
  }, [cuisine]);

  if (!cuisine) return null;

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-8'>
        <h1 className='text-4xl font-bold mb-3 capitalize'>
          {cuisine} Recipes
        </h1>
        <p className='text-gray-600'>
          Discover delicious {cuisine.toLowerCase()} recipes and cooking
          inspiration.
        </p>
      </div>
      <RecipeContent cuisine={cuisine} />
    </div>
  );
}
