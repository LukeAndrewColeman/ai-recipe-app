'use client';

import { useEffect, useState } from 'react';
import AIRecipeCard from '@/components/AIRecipeCard';
import LoadingRecipeCard from '@/components/LoadingRecipeCard';
import { getSavedRecipes } from '@/app/actions/getSavedRecipes';

const RecipeBook = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const userId = 2; // Default user
        const recipes = await getSavedRecipes(userId);
        setSavedRecipes(recipes);
      } catch (error) {
        console.error('Error fetching saved recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedRecipes();
  }, []);

  return (
    <div className='container mx-auto px-4 py-10'>
      <div className='mb-8'>
        <h1 className='text-4xl font-bold mb-3'>My Recipe Book</h1>
        <p className='text-neutral/70'>
          Your collection of saved recipes from around the world.
        </p>
      </div>

      {loading ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {[...Array(3)].map((_, index) => (
            <LoadingRecipeCard key={index} />
          ))}
        </div>
      ) : savedRecipes.length === 0 ? (
        <div className='text-center py-12 bg-base-100 rounded-lg border border-primary/10'>
          <div className='max-w-md mx-auto space-y-4'>
            <p className='text-xl text-neutral/70'>Your recipe book is empty</p>
            <p className='text-neutral/60'>
              Start exploring cuisines and save your favorite recipes to build
              your collection.
            </p>
            <a
              href='/selector'
              className='btn bg-secondary/20 border border-secondary/40 hover:border-secondary hover:bg-secondary/40 normal-case flex items-center justify-center gap-2 px-8 transition-all mx-auto w-fit'
            >
              Explore Cuisines →
            </a>
          </div>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {savedRecipes.map((recipe) => (
            <AIRecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeBook;
