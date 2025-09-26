'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { useUser } from '@clerk/nextjs';

export default function RecipeModal({ recipe, isOpen, onClose }) {
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const { user } = useUser();
  const currentPath = usePathname();

  if (!isOpen) return null;

  const handleDeleteRecipe = async () => {
    if (!recipe.$id) return;

    try {
      setIsDeleting(true);
      const response = await fetch('/api/recipe', {
        method: 'DELETE',
        body: JSON.stringify({ id: recipe.$id }),
      });
      const result = await response.json();

      setSaveStatus({
        success: result.success,
        message: result.message,
      });

      if (result.success) {
        setTimeout(() => {
          onClose();
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
      setSaveStatus({
        success: false,
        message: 'Failed to delete recipe',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className='fixed inset-0 bg-black/80 z-50 flex justify-center p-4 md:p-8 overflow-y-auto'>
      <div className='rounded-xl max-w-3xl w-full mb-8 backdrop-blur-xl'>
        <div className='p-6 border-b bg-secondary rounded-t-lg'>
          <div className='flex justify-end'>
            {saveStatus && (
              <span className='text-white'>{saveStatus.message}</span>
            )}
            <button
              onClick={onClose}
              className='btn btn-circle btn-ghost text-xl mb-1 ml-auto'
            >
              ✕
            </button>
          </div>
          <div className='flex flex-col md:flex-row justify-between md:items-center gap-4'>
            <h2 className='text-2xl font-bold max-w-[30rem]'>
              {recipe?.title || recipe?.name || 'Untitled Recipe'}
            </h2>
            <div className='flex items-center gap-4'>
              {currentPath === '/recipe-book' ? (
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 2, origin: 'center' }}
                >
                  <button
                    onClick={handleDeleteRecipe}
                    disabled={isDeleting}
                    className='btn bg-red-500/80 border border-red-500/40 hover:border-red-500 hover:bg-red-500/60 normal-case flex items-center justify-center gap-2 px-4 transition-all text-white'
                  >
                    {isDeleting ? (
                      <>
                        <span className='loading loading-spinner loading-sm'></span>
                        Deleting...
                      </>
                    ) : (
                      'Delete Recipe'
                    )}
                  </button>
                </motion.div>
              ) : user ? (
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 2, origin: 'center' }}
                >
                  <button
                    onClick={handleSaveRecipe}
                    disabled={isSaving}
                    className='btn bg-secondary/20 border border-secondary/40 hover:border-secondary hover:bg-secondary/40 normal-case flex items-center justify-center gap-2 px-4 transition-all text-white'
                  >
                    {isSaving ? (
                      <>
                        <span className='loading loading-spinner loading-sm'></span>
                        Saving...
                      </>
                    ) : (
                      'Save Recipe'
                    )}
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 2, origin: 'center' }}
                >
                  <a
                    href='/auth/login'
                    className='btn bg-secondary/20 border border-secondary/40 hover:border-secondary hover:bg-secondary/40 normal-case flex items-center justify-center gap-2 px-4 transition-all text-white'
                  >
                    Login to save recipes
                  </a>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className='p-4 md:p-6 max-h-[70vh] overflow-y-auto bg-white shadow-lg border rounded-b-xl'>
          {/* Description */}
          <div className='mb-6'>
            <p className='text-gray-700'>{recipe.description}</p>
          </div>

          {/* Quick Facts */}
          <div className='flex flex-wrap gap-4 mb-6'>
            {recipe.cookingTime && (
              <div className='bg-primary/10 text-primary rounded-lg p-2 text-sm'>
                <p>{recipe.cookingTime}</p>
              </div>
            )}
            {recipe.difficulty && (
              <div className='bg-primary/10 text-primary rounded-lg p-2 text-sm'>
                <p>{recipe.difficulty}</p>
              </div>
            )}
            {recipe.servings && (
              <div className='bg-primary/10 text-primary rounded-lg p-2 text-sm'>
                <p>{recipe.servings} servings</p>
              </div>
            )}
          </div>

          {/* Content */}
          <div className='mb-6'>
            <div className='space-y-6'>
              {JSON.stringify(recipe.ingredients) && (
                <div>
                  <h3 className='text-xl font-semibold mb-2'>Ingredients</h3>
                  <ul className='list-disc pl-5 space-y-1'>
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className='text-gray-700'>
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {JSON.stringify(recipe.instructions) && (
                <div>
                  <h3 className='text-xl font-semibold mb-2'>Instructions</h3>
                  <ol className='list-decimal pl-5 space-y-2'>
                    {recipe.instructions.map((instruction, index) => (
                      <li key={index} className='text-gray-700'>
                        {instruction}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {JSON.stringify(recipe.tipsAndVariations) && (
                <div>
                  <h3 className='text-xl font-semibold mb-2'>
                    Tips & Variations
                  </h3>
                  <ul className='list-disc pl-5 space-y-1'>
                    {recipe.tipsAndVariations.map((tip, index) => (
                      <li key={index} className='text-gray-700'>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {recipe.whyYoullLoveIt && (
                <div>
                  <h3 className='text-xl font-semibold mb-2'>
                    Why You'll Love It
                  </h3>
                  <p className='text-gray-700'>{recipe.whyYoullLoveIt}</p>
                </div>
              )}

              {recipe.storageInstructions && (
                <div>
                  <h3 className='text-xl font-semibold mb-2'>
                    Storage Instructions
                  </h3>
                  <p className='text-gray-700'>{recipe.storageInstructions}</p>
                </div>
              )}

              {recipe.finalThoughts && (
                <div>
                  <h3 className='text-xl font-semibold mb-2'>Final Thoughts</h3>
                  <p className='text-gray-700'>{recipe.finalThoughts}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
