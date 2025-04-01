'use client';

import { useState } from 'react';
import RecipeModal from './RecipeModal';
import { motion } from 'motion/react';

export default function AIRecipeCard({ recipe }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            <span>🕒 {recipe.cookingTime || 'Time N/A'}</span>
            <span>📊 {recipe.difficulty || 'Difficulty N/A'}</span>
          </div>

          <motion.div
            className='origin-center w-fit'
            whileHover={{ scale: 1.05, rotate: 2, origin: 'center' }}
          >
            <button
              className='btn bg-secondary/20 border border-secondary/40 hover:border-secondary hover:bg-secondary/40 text-neutral normal-case flex items-center justify-start gap-2 px-4 transition-all'
              onClick={() => setIsModalOpen(true)}
            >
              View Recipe
            </button>
          </motion.div>
        </div>
      </div>

      <RecipeModal
        recipe={recipe}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
