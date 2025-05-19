'use client';

import { useEffect, useState } from 'react';
import RecipeList from '@/components/RecipeList';
import { motion } from 'motion/react';
import { useUser } from '@clerk/nextjs';

export default function RecipeBook() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  const fetchSavedRecipes = async () => {
    try {
      if (user) {
        setIsLoading(true);
        const response = await fetch('/api/recipe');
        const data = await response.json();
        setRecipes(data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching saved recipes:', error);
    }
  };

  useEffect(() => {
    fetchSavedRecipes();
  }, [user]);

  if (!user) {
    return (
      <div className='container mx-auto px-4 py-10'>
        <div className='mb-8'>
          <h1 className='text-4xl font-bold mb-3'>Your Recipe Book</h1>
          <p className='text-neutral/70'>
            Your collection of saved AI generated recipes from around the world.
          </p>
        </div>
        <div className='text-center py-12 bg-base-100 rounded-lg border border-primary/10'>
          <div className='max-w-md mx-auto space-y-4'>
            <p className='text-neutral/70'>
              Log in or create an account to start saving your favorite recipes.
            </p>
            <a
              href='/sign-in'
              className='btn bg-secondary/20 border border-secondary/40 hover:border-secondary hover:bg-secondary/40 normal-case flex items-center justify-center gap-2 px-8 transition-all mx-auto w-fit'
            >
              Register or Log In →
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (user && isLoading) {
    return (
      <div className='flex justify-center flex-col gap-4 items-center mt-24'>
        <div className='loading loading-spinner loading-lg text-primary'></div>
        <div className='text-2xl font-bold text-primary'>
          Loading your recipes...
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-10'>
      <div className='mb-8'>
        <h1 className='text-4xl font-bold mb-3 text-primary'>
          {user.firstName ? `${user.firstName}'s` : 'Your'} Recipe Book
        </h1>
        <p className='text-neutral/70'>
          Your collection of saved AI generated recipes from around the world.
        </p>
      </div>
      {recipes.length === 0 ? (
        <div className='text-center py-12 bg-base-100 rounded-lg border border-primary/10'>
          <p className='text-neutral/70'>
            You haven't saved any recipes yet. Browse recipes to get started!
          </p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <RecipeList recipes={recipes} />
        </motion.div>
      )}
    </div>
  );
}
