'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { generateRecipes } from '@/app/actions/generateRecipeIdeas';

/**
 * DemoRecipeGenerator Component
 *
 * This component allows users to try the recipe generator without signing up.
 * It tracks usage in localStorage and shows a sign-up prompt after the demo limit.
 *
 * Key Features:
 * - Allows 2 free recipe generations
 * - Tracks usage across browser sessions using localStorage
 * - Shows a modal prompting sign-up when limit is reached
 * - Provides the same experience as the full app, but limited
 */
export default function DemoRecipeGenerator() {
  const router = useRouter();
  const [recipeLoading, setRecipeLoading] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [customIngredient, setCustomIngredient] = useState('');
  const [demoUsageCount, setDemoUsageCount] = useState(0);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  // Maximum number of demo recipes a user can generate
  const MAX_DEMO_RECIPES = 2;

  // Load demo usage from localStorage when component mounts
  // This persists the count even if the user refreshes the page
  useEffect(() => {
    const storedUsage = localStorage.getItem('demoRecipeUsage');
    if (storedUsage) {
      setDemoUsageCount(parseInt(storedUsage));
    }
  }, []);

  /**
   * Handles recipe generation
   * - Checks if user has exceeded demo limit
   * - Generates recipe using AI
   * - Updates localStorage with usage count
   * - Redirects to recipes page
   */
  const handleGenerateRecipe = async () => {
    // Check if user has exceeded demo limit
    if (demoUsageCount >= MAX_DEMO_RECIPES) {
      setShowSignUpModal(true);
      return;
    }

    // Validate that at least one ingredient is selected
    if (
      !Array.isArray(selectedIngredients) ||
      selectedIngredients.length === 0
    ) {
      alert('Please add at least one ingredient.');
      return;
    }

    setRecipeLoading(true);
    try {
      // Generate the recipe (no credit deduction for demo)
      const recipePreviewsString = await generateRecipes(selectedIngredients);
      const recipePreviews = JSON.parse(recipePreviewsString);

      // Increment demo usage count and save to localStorage
      const newCount = demoUsageCount + 1;
      setDemoUsageCount(newCount);
      localStorage.setItem('demoRecipeUsage', newCount.toString());

      // Store recipe and mark it as demo
      localStorage.setItem('recipePreviews', JSON.stringify(recipePreviews));
      localStorage.setItem('isDemoRecipe', 'true');

      // Navigate to the recipes page to view the generated recipe
      router.push('/recipes');
    } catch (error) {
      console.error('Error generating recipe:', error);
      alert('Failed to generate recipe. Please try again.');
      setRecipeLoading(false);
    }
  };

  /**
   * Handles custom ingredient form submission
   * Adds the ingredient to the selected list
   */
  const handleCustomIngredientSubmit = (e) => {
    e.preventDefault();
    if (customIngredient.trim()) {
      setSelectedIngredients((prev) => [...prev, customIngredient.trim()]);
      setCustomIngredient('');
    }
  };

  /**
   * Toggles ingredient selection
   * If ingredient is already selected, removes it
   * If not selected, adds it to the list
   */
  const handleIngredientRemove = (ingredient) => {
    setSelectedIngredients((prev) => prev.filter((i) => i !== ingredient));
  };

  // Show loading state while generating recipe
  if (recipeLoading) {
    return (
      <div className='flex justify-center flex-col gap-4 items-center mt-24'>
        <div className='loading loading-spinner loading-lg text-primary'></div>
        <div className='text-2xl font-bold text-primary'>
          Smart Recipe AI is generating your recipe, hang tight...
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='relative space-y-6 container mx-auto pb-20 pt-20 px-6'>
        {/* Demo Badge - shows remaining demo recipes */}
        <div className='bg-secondary/10 border border-secondary/30 text-secondary px-4 py-3 rounded-lg mb-6 max-w-3xl mx-auto'>
          <div className='flex items-center justify-between flex-wrap gap-3'>
            <div>
              <p className='font-semibold'>🎉 Demo Mode</p>
              <p className='text-sm text-neutral/70'>
                You have {MAX_DEMO_RECIPES - demoUsageCount} of {MAX_DEMO_RECIPES} free demo recipes remaining
              </p>
            </div>
            <Link
              href='/sign-up'
              className='btn btn-sm bg-secondary hover:bg-secondary/80 text-white border-none normal-case'
            >
              Sign Up for More
            </Link>
          </div>
        </div>

        {/* Page Header */}
        <div className='mb-8'>
          <h1 className='text-4xl font-bold mb-3 text-center'>
            Try Our Recipe Generator
          </h1>
          <p className='text-center text-gray-600'>
            Generate {MAX_DEMO_RECIPES} recipes for free - no account needed!
          </p>
        </div>

        <div>
          <h2 className='text-2xl font-bold text-center mb-6'>
            Your Ingredients
          </h2>
          <p className='text-center text-gray-600 mb-6'>
            Add the ingredients you'd like to include in your recipe
          </p>

          {/* Custom Ingredient Input Form */}
          <div className='max-w-xl mx-auto my-8'>
            <form onSubmit={handleCustomIngredientSubmit} className='flex gap-2'>
              <input
                type='text'
                value={customIngredient}
                onChange={(e) => setCustomIngredient(e.target.value)}
                placeholder='Add your ingredient (e.g., chicken, tomatoes)...'
                className='input input-bordered flex-1'
              />
              <button
                type='submit'
                className='btn bg-secondary border border-secondary/40 hover:border-secondary hover:bg-secondary/40 text-neutral normal-case'
              >
                Add
              </button>
            </form>
          </div>

          {/* Selected Ingredients Display */}
          {selectedIngredients.length > 0 && (
            <div className='max-w-5xl flex justify-center mx-auto my-12'>
              <div className='flex flex-wrap gap-2'>
                {selectedIngredients.map((ingredient) => (
                  <div
                    key={ingredient}
                    className='badge bg-primary/20 border border-primary/40 gap-2 p-4'
                  >
                    {ingredient}
                    <button
                      onClick={() => handleIngredientRemove(ingredient)}
                      className='btn btn-ghost btn-xs'
                      aria-label={`Remove ${ingredient}`}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Generate Recipe Button */}
          <div className='flex justify-center mt-16'>
            <button
              onClick={handleGenerateRecipe}
              disabled={selectedIngredients.length === 0}
              className='btn bg-primary hover:bg-primary/80 normal-case px-8 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              Generate Demo Recipe
            </button>
          </div>
        </div>
      </div>

      {/* Sign Up Modal - appears when demo limit reached */}
      {showSignUpModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-lg p-8 max-w-md w-full'>
            <h3 className='text-2xl font-bold mb-4'>
              🎉 You've Used All Your Demo Recipes!
            </h3>
            <p className='mb-6 text-gray-600'>
              Love what you see? Sign up now to get:
            </p>
            <ul className='mb-6 space-y-2 text-left'>
              <li>✓ 20 free credits every month</li>
              <li>✓ 1 credit = 1 recipe</li>
              <li>✓ Save unlimited favourite recipes</li>
              <li>✓ Access your recipes anywhere</li>
              <li>✓ No credit card required</li>
            </ul>
            <div className='flex gap-3'>
              <Link
                href='/sign-up'
                className='btn bg-primary hover:bg-primary/80 text-white flex-1 normal-case'
              >
                Sign Up Free
              </Link>
              <button
                onClick={() => setShowSignUpModal(false)}
                className='btn btn-ghost flex-1 normal-case'
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
