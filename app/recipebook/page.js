'use client';

import { useEffect, useState, useContext } from 'react';
import { getSavedRecipes } from '@/app/actions/getSavedRecipes';
import RecipeList from '@/components/RecipeList';
import { AuthContext } from '@/context/AuthContext';
import { motion } from 'motion/react';
export default function RecipeBook() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      if (user) {
        const result = await getSavedRecipes(user.$id);
        if (result.documents) {
          console.log(result.documents);
          setRecipes(result.documents);
        }
      }
    };

    fetchSavedRecipes();
  }, [user]);

  if (!user) {
    return (
      <div className='container mx-auto px-4 py-10'>
        <div className='mb-8'>
          <h1 className='text-4xl font-bold mb-3'>Your Recipe Book</h1>
          <p className='text-neutral/70'>
            Your collection of saved recipes from around the world.
          </p>
        </div>
        <div className='text-center py-12 bg-base-100 rounded-lg border border-primary/10'>
          <div className='max-w-md mx-auto space-y-4'>
            <p className='text-neutral/70'>
              Log in or create an account to start saving your favorite recipes.
            </p>
            <a
              href='/auth/login'
              className='btn bg-secondary/20 border border-secondary/40 hover:border-secondary hover:bg-secondary/40 normal-case flex items-center justify-center gap-2 px-8 transition-all mx-auto w-fit'
            >
              Register or Log In →
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-10'>
      <div className='mb-8'>
        <h1 className='text-4xl font-bold mb-3'>{user.name}'s Recipe Book</h1>
        <p className='text-neutral/70'>
          Your collection of saved recipes from around the world.
        </p>
      </div>

      {loading ? (
        <div className='text-center py-12'>
          <div className='loading loading-spinner loading-lg'></div>
          <p className='mt-4 text-neutral/70'>Loading your recipes...</p>
        </div>
      ) : error ? (
        <div className='text-center py-12 text-error'>
          <p>{error}</p>
        </div>
      ) : recipes.length === 0 ? (
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
