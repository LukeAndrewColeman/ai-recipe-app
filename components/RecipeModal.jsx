'use client';

import { useState } from 'react';
import { saveRecipe } from '@/app/actions/saveRecipe';
import { deleteRecipe } from '@/app/actions/deleteRecipe';

export default function RecipeModal({ recipe, isOpen, onClose }) {
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  if (!isOpen) return null;

  const handleSaveRecipe = async () => {
    try {
      setIsSaving(true);

      // Prepare recipe data
      const recipeData = {
        name: recipe.name || recipe.title,
        description: recipe.description,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        cuisine: recipe.cuisine,
        cookingTime: recipe.cookingTime?.replace(' mins', '') || '0',
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
    if (!recipe.id) return;

    try {
      setIsDeleting(true);
      const result = await deleteRecipe(recipe.id);

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
      <div className='rounded-lg max-w-3xl w-full my-8 backdrop-blur-xl'>
        <div className='p-6 border-b flex justify-between items-center bg-[#1B3C6F] text-white rounded-t-lg'>
          <h2 className='text-2xl font-bold'>
            {recipe?.title || recipe?.name || 'Untitled Recipe'}
          </h2>
          <div className='flex items-center gap-4'>
            {saveStatus && (
              <span
                className={`text-sm ${
                  saveStatus.success ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {saveStatus.message}
              </span>
            )}
            {!recipe.nutritionFacts ? (
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
            ) : (
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
            )}
            <button
              onClick={onClose}
              className='btn btn-circle btn-ghost text-white text-xl'
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className='p-6 space-y-8 max-h-[70vh] overflow-y-auto bg-white shadow-lg border'>
          {/* Description */}
          <div className='space-y-4'>
            <p className='text-gray-700 text-lg'>{recipe.description}</p>
          </div>

          {/* Quick Facts */}
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            {(recipe.cookingTime || recipe.prepTime) && (
              <div className='bg-white rounded-lg p-4 shadow-md'>
                <h3 className='font-semibold mb-1'>Cooking Time</h3>
                <p className='text-gray-700'>
                  {recipe.cookingTime} {recipe.prepTime}
                </p>
              </div>
            )}
            {recipe.difficulty && (
              <div className='bg-white rounded-lg p-4 shadow-md'>
                <h3 className='font-semibold mb-1'>Difficulty</h3>
                <p className='text-gray-700'>{recipe.difficulty}</p>
              </div>
            )}
            {recipe.servings && (
              <div className='bg-white rounded-lg p-4 shadow-md'>
                <h3 className='font-semibold mb-1'>Servings</h3>
                <p className='text-gray-700'>{recipe.servings}</p>
              </div>
            )}
          </div>

          {/* Ingredients */}
          <div className='bg-white rounded-lg p-6 shadow-md'>
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
          <div className='bg-white rounded-lg p-6 shadow-md '>
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

          {/* Nutrition Facts - Only show if data exists */}
          {recipe.nutritionFacts &&
            typeof recipe.nutritionFacts === 'object' && (
              <div className='bg-white rounded-lg p-6 shadow-md'>
                <h3 className='text-xl font-semibold mb-4'>Nutrition Facts</h3>
                <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
                  {Object.entries(recipe.nutritionFacts).map(([key, value]) => (
                    <div
                      key={key}
                      className='bg-white/50 p-3 rounded-lg text-center'
                    >
                      <h4 className='font-semibold capitalize mb-1'>{key}</h4>
                      <p className='text-gray-700'>{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
