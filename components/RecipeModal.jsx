'use client';

import { useState, useContext } from 'react';
import { saveRecipe } from '@/app/actions/saveRecipe';
import { deleteRecipe } from '@/app/actions/deleteRecipe';
import { usePathname } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';

export default function RecipeModal({ recipe, isOpen, onClose }) {
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const currentPath = usePathname();

  if (!isOpen) return null;

  const handleSaveRecipe = async () => {
    try {
      setIsSaving(true);

      const recipeData = {
        title: recipe.name || recipe.title,
        description: recipe.description,
        ingredients: JSON.stringify(recipe.ingredients),
        instructions: JSON.stringify(recipe.instructions),
        cookingTime: recipe.cookingTime?.replace(' mins', '') || '0',
        servings: recipe.servings,
        difficulty: recipe.difficulty,
        cuisine: recipe.cuisine,
        userId: user.$id,
      };

      const result = await saveRecipe(recipeData);

      setSaveStatus({
        success: result.success,
        message: result.message,
      });

      // Clear status after 3 seconds
      setTimeout(() => {
        setSaveStatus(null);
      }, 3000);
    } catch (error) {
      console.error('Error saving recipe:', error);
      setSaveStatus({
        success: false,
        message: 'Failed to save recipe',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteRecipe = async () => {
    if (!recipe.$id) return;

    try {
      setIsDeleting(true);
      const result = await deleteRecipe(recipe.$id);

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
    <div className='fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto'>
      <div className='rounded-xl max-w-3xl w-full mb-8 backdrop-blur-xl'>
        <div className='flex justify-end'>
          {saveStatus && (
            <span className='text-white'>{saveStatus.message}</span>
          )}
          <button
            onClick={onClose}
            className='btn btn-circle btn-ghost text-white text-xl mb-1 ml-auto'
          >
            ✕
          </button>
        </div>
        <div className='p-6 border-b flex flex-col md:flex-row justify-between md:items-center gap-4 bg-[#1B3C6F] text-white rounded-t-xl'>
          <h2 className='text-2xl font-bold max-w-[30rem]'>
            {recipe?.title || recipe?.name || 'Untitled Recipe'}
          </h2>
          <div className='flex items-center gap-4'>
            {currentPath === '/recipebook' ? (
              <button
                onClick={handleDeleteRecipe}
                disabled={isDeleting}
                className='btn bg-red-500/20 border border-red-500/40 hover:border-red-500 hover:bg-red-500/40 normal-case flex items-center justify-center gap-2 px-4 transition-all text-white'
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
            ) : user ? (
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
            ) : (
              <a
                href='/auth/login'
                className='btn bg-secondary/20 border border-secondary/40 hover:border-secondary hover:bg-secondary/40 normal-case flex items-center justify-center gap-2 px-4 transition-all text-white'
              >
                Login to save recipes
              </a>
            )}
          </div>
        </div>

        {/* Modal Content */}
        <div className='p-4 md:p-0 max-h-[70vh] overflow-y-auto bg-white shadow-lg border rounded-b-xl'>
          {/* Description */}
          <div className='p-2 md:p-6'>
            <p className='text-gray-700 text-lg'>{recipe.description}</p>
          </div>

          {/* Quick Facts */}
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            {(recipe.cookingTime || recipe.prepTime) && (
              <div className='bg-white rounded-lg p-2 md:p-6'>
                <h3 className='font-semibold mb-1'>Cooking Time</h3>
                <p className='text-gray-700'>
                  {recipe.cookingTime} {recipe.prepTime}
                </p>
              </div>
            )}
            {recipe.difficulty && (
              <div className='bg-white rounded-lg p-2 md:p-6'>
                <h3 className='font-semibold mb-1'>Difficulty</h3>
                <p className='text-gray-700'>{recipe.difficulty}</p>
              </div>
            )}
            {recipe.servings && (
              <div className='bg-white rounded-lg p-2 md:p-6'>
                <h3 className='font-semibold mb-1'>Servings</h3>
                <p className='text-gray-700'>{recipe.servings}</p>
              </div>
            )}
          </div>

          {/* Ingredients */}
          <div className='bg-white rounded-lg p-2 md:p-6  '>
            <h3 className='text-xl font-semibold mb-4'>Ingredients</h3>
            <ul className='space-y-2'>
              {recipe.ingredients ? (
                (typeof recipe.ingredients === 'string'
                  ? JSON.parse(recipe.ingredients)
                  : recipe.ingredients
                ).map((ingredient, index) => (
                  <li
                    key={index}
                    className='flex items-center gap-2 text-gray-700'
                  >
                    <span className=''>•</span> {ingredient}
                  </li>
                ))
              ) : (
                <li className='text-gray-700'>No ingredients listed</li>
              )}
            </ul>
          </div>

          {/* Instructions */}
          <div className='bg-white rounded-lg p-2 md:p-6'>
            <h3 className='text-xl font-semibold mb-4'>Instructions</h3>
            <ol className='space-y-4'>
              {recipe.instructions ? (
                (typeof recipe.instructions === 'string'
                  ? JSON.parse(recipe.instructions)
                  : recipe.instructions
                ).map((step, index) => (
                  <li key={index} className='flex gap-4 text-gray-700'>
                    <span className='font-bold min-w-[1.5rem]'>
                      {index + 1}.
                    </span>
                    <span>{step}</span>
                  </li>
                ))
              ) : (
                <li className='text-gray-700'>No instructions available</li>
              )}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
