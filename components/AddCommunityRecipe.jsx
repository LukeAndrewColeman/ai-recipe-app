'use client';

import { useState } from 'react';
import { addRecipe } from '@/app/actions/addRecipe';

export default function AddCommunityRecipe({ cuisine, onRecipeAdded }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Add state for form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [cookingTime, setCookingTime] = useState('');
  const [ingredientsText, setIngredientsText] = useState('');
  const [instructionsText, setInstructionsText] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Ensure ingredients and instructions are arrays
      const formattedIngredients = Array.isArray(ingredients)
        ? ingredients
        : [];
      const formattedInstructions = Array.isArray(instructions)
        ? instructions
        : [];

      const formData = {
        title,
        description,
        ingredients: formattedIngredients,
        instructions: formattedInstructions,
        cuisine,
        cookingTime,
      };

      const result = await addRecipe(formData);

      if (!result.success) {
        throw new Error(result.message || 'Failed to add recipe');
      }

      // Clear form
      setTitle('');
      setDescription('');
      setIngredients([]);
      setIngredientsText('');
      setInstructions([]);
      setInstructionsText('');
      setCookingTime('');
      setIsOpen(false); // Close the modal on success

      // Call the callback if provided
      if (onRecipeAdded) onRecipeAdded();
    } catch (error) {
      const errorMessage =
        error?.message || 'Failed to add recipe. Please try again.';
      console.error('Failed to add recipe:', errorMessage);
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add handlers for form inputs
  const handleIngredientsChange = (e) => {
    const newText = e.target.value;
    setIngredientsText(newText);
    // Split by newline and filter out empty lines
    const ingredientsArray = newText
      .split('\n')
      .filter((line) => line.trim())
      .map((item) => item.trim());
    setIngredients(ingredientsArray);
  };

  const handleInstructionsChange = (e) => {
    const newText = e.target.value;
    setInstructionsText(newText);
    setInstructions(newText.split('\n').filter((line) => line.trim()));
  };

  return (
    <div className='my-8'>
      <button
        onClick={() => setIsOpen(true)}
        className='btn bg-secondary/20 border border-secondary/40 hover:border-secondary hover:bg-secondary/40 text-neutral normal-case flex items-center justify-start gap-2 px-4 transition-all'
      >
        Add Community Recipe
      </button>

      {isOpen && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-2xl font-bold'>Add Community Recipe</h2>
              <button
                onClick={() => setIsOpen(false)}
                className='btn btn-ghost'
              >
                ✕
              </button>
            </div>

            {error && (
              <div className='alert alert-error mb-4'>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label className='label'>
                  <span className='label-text'>Recipe Title</span>
                </label>
                <input
                  type='text'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className='input input-bordered w-full'
                  required
                  minLength={3}
                  maxLength={100}
                />
              </div>

              <div>
                <label className='label'>
                  <span className='label-text'>Description</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className='textarea textarea-bordered w-full min-h-[100px]'
                  required
                  minLength={10}
                  maxLength={500}
                  rows={4}
                />
              </div>

              <div>
                <label className='label'>
                  <span className='label-text'>Ingredients (one per line)</span>
                </label>
                <textarea
                  value={ingredientsText}
                  onChange={handleIngredientsChange}
                  className='textarea textarea-bordered w-full min-h-[150px]'
                  required
                  placeholder={'1 cup flour\n2 eggs'}
                  rows={6}
                />
              </div>

              <div>
                <label className='label'>
                  <span className='label-text'>
                    Instructions (one step per line)
                  </span>
                </label>
                <textarea
                  value={instructionsText}
                  onChange={handleInstructionsChange}
                  className='textarea textarea-bordered w-full min-h-[200px]'
                  required
                  placeholder={'1. Mix dry ingredients\n2. Add wet ingredients'}
                  rows={8}
                />
              </div>

              <div className='flex flex-col gap-4 mt-6'>
                <div>
                  <label className='label'>
                    <span className='label-text'>
                      Cooking Time (in minutes)
                    </span>
                  </label>
                  <input
                    type='number'
                    value={cookingTime}
                    onChange={(e) => setCookingTime(e.target.value)}
                    className='input input-bordered w-full'
                    required
                    min={1}
                    max={999}
                    placeholder='e.g. 45'
                  />
                </div>
              </div>

              <div className='flex justify-end gap-2'>
                <button
                  type='button'
                  onClick={() => setIsOpen(false)}
                  className='btn btn-ghost'
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='btn bg-secondary/20 border border-secondary/40 hover:border-secondary hover:bg-secondary/40 text-neutral normal-case flex items-center justify-start gap-2 px-4 transition-all'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className='loading loading-spinner'></span>
                      Saving...
                    </>
                  ) : (
                    'Add Recipe'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
