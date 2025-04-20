'use client';

import { useState } from 'react';
import { getFullRecipeDetails } from '@/app/actions/generateRecipeIdeas';
import RecipeModal from './RecipeModal';
import { motion } from 'motion/react';

export default function AIRecipeCard({ recipe, cuisine }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fullRecipe, setFullRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleViewRecipe = async () => {
    setLoading(true);
    setError(null);
    try {
      const details = await getFullRecipeDetails(
        cuisine,
        recipe.id,
        recipe.name
      );
      setFullRecipe(details.recipe);
      setIsModalOpen(true);
    } catch (err) {
      setError('Failed to load recipe details');
      console.error('Error loading recipe details:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!recipe || typeof recipe !== 'object') {
    console.error('Invalid recipe data:', recipe);
    return (
      <div className='card bg-base-100 shadow-xl'>
        <div className='card-body'>
          <p className='text-red-500'>Invalid recipe data</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='card bg-base-100 border border-primary/10 hover:border-primary/30 shadow-md hover:shadow-xl transition-all'>
        <div className='card-body'>
          <div className='flex justify-between items-start'>
            <h3 className='card-title text-neutral'>
              {recipe.name || 'Untitled Recipe'}
            </h3>
          </div>
          <p className='text-neutral/70'>
            {recipe.description || 'No description available'}
          </p>

          {/* Quick Facts */}
          <div className='flex gap-4 text-sm text-neutral/60 mt-2'>
            <span className='bg-primary/10 text-primary rounded-lg p-2'>
              {recipe.cookingTime || 'Time N/A'}
            </span>
            <span className='bg-primary/10 text-primary rounded-lg p-2'>
              {recipe.difficulty || 'Difficulty N/A'}
            </span>
          </div>

          <motion.div
            className='origin-center w-fit'
            whileHover={{ scale: 1.05, rotate: 2, origin: 'center' }}
          >
            <button
              className='btn bg-secondary/20 border border-secondary/40 hover:border-secondary hover:bg-secondary/40  normal-case flex items-center justify-start gap-2 px-4 transition-all mt-4 text-gray-800'
              onClick={handleViewRecipe}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className='loading loading-spinner loading-sm text-gray-800'></span>
                  Preparing recipe details...
                </>
              ) : (
                'View Recipe'
              )}
            </button>
          </motion.div>

          {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
        </div>
      </div>

      {isModalOpen && fullRecipe && (
        <RecipeModal
          recipe={fullRecipe}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setFullRecipe(null);
          }}
        />
      )}
    </>
  );
}

// Icon Components
function ClockIcon({ className }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={className}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z'
      />
    </svg>
  );
}

function UsersIcon({ className }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={className}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z'
      />
    </svg>
  );
}
