'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { generateRecipes } from '@/app/actions/generateRecipeIdeas';
import { ingredients } from '@/lib/constants';
import { useUser } from '@clerk/nextjs';

export default function RecipeGenerator() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [credits, setCredits] = useState(0);
  const [creditsLoading, setCreditsLoading] = useState(false);
  const [recipeLoading, setRecipeLoading] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [customIngredient, setCustomIngredient] = useState('');
  const { user } = useUser();
  const [expandedCategories, setExpandedCategories] = useState({});

  const fetchCredits = async () => {
    if (!user) return;

    try {
      setCreditsLoading(true);
      const response = await fetch('/api/credits');
      const data = await response.json();
      setCredits(data.credits);
      console.log('Credits:', data.credits);
      setCreditsLoading(false);
    } catch (error) {
      console.error('Error fetching credits:', error);
      setCreditsLoading(false);
    }
  };

  const updateCredits = async () => {
    try {
      const response = await fetch('/api/credits', {
        method: 'POST',
        body: '',
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Credits updated:', data);
      } else {
        throw new Error('Failed to update credits');
      }
    } catch (error) {
      console.error('Error updating credits:', error);
    }
  };

  const handleGenerateRecipe = async () => {
    if (
      !Array.isArray(selectedIngredients) ||
      selectedIngredients.length === 0
    ) {
      alert('Please select at least one ingredient.');
      return;
    }
    setRecipeLoading(true);
    try {
      await updateCredits();
      const recipePreviewsString = await generateRecipes(selectedIngredients);
      const recipePreviews = JSON.parse(recipePreviewsString);
      localStorage.setItem('recipePreviews', JSON.stringify(recipePreviews));
      router.push('/recipes');
    } catch (error) {
      console.error('Error generating recipe:', error);
      setRecipeLoading(false);
    }
  };

  const handleCustomIngredientSubmit = (e) => {
    e.preventDefault();
    if (customIngredient.trim()) {
      setSelectedIngredients((prev) => [...prev, customIngredient.trim()]);
      setCustomIngredient('');
    }
  };

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  useEffect(() => {
    fetchCredits();
    setMounted(true);
  }, []);

  if (user && credits <= 0 && !creditsLoading) {
    return (
      <div className='flex flex-col items-center justify-center mt-32'>
        <h1 className='text-4xl font-bold mb-3 text-primary'>
          Sorry, no credits left
        </h1>
        <p className='text-neutral/70'>
          Please buy more credits to continue creating delicious and healthy
          recipes
        </p>
        <Link href='/buy-credits'>
          <button className='btn bg-secondary/20 border border-secondary/40 hover:border-secondary hover:bg-secondary/40 text-neutral normal-case flex items-center justify-start gap-2 px-4 transition-all mt-6'>
            Buy more credits
          </button>
        </Link>
      </div>
    );
  }

  if (user && creditsLoading) {
    return (
      <div className='flex justify-center flex-col gap-4 items-center mt-24'>
        <div className='loading loading-spinner loading-lg text-primary'></div>
        <div className='text-2xl font-bold text-primary'>
          Checking your credits...
        </div>
      </div>
    );
  }

  if (user && recipeLoading) {
    return (
      <div className='flex justify-center flex-col gap-4 items-center mt-24'>
        <div className='loading loading-spinner loading-lg text-primary'></div>
        <div className='text-2xl font-bold text-primary'>
          SmartRecipe AI is generating your recipe, hang tight...
        </div>
      </div>
    );
  }

  const handleIngredientSelect = (ingredient) => {
    setSelectedIngredients((prev) => {
      if (prev.includes(ingredient)) {
        return prev.filter((i) => i !== ingredient);
      }
      return [...prev, ingredient];
    });
  };

  if (!mounted) return null;

  return (
    <div className='relative space-y-6 container mx-auto pb-20 pt-10 px-6'>
      <div className='mb-8'>
        <h1 className='text-4xl font-bold mb-3 text-primary'>
          Generate a Recipe
        </h1>
      </div>

      <div className='space-y-6'>
        <h2 className='text-2xl font-bold text-center mb-6'>
          Select Your Ingredients
        </h2>
        <p className='text-center text-gray-600 mb-6'>
          Choose ingredients you'd like to include in your recipe
        </p>

        {/* Custom Ingredient Input */}
        <div className='max-w-md mx-auto mb-8'>
          <form onSubmit={handleCustomIngredientSubmit} className='flex gap-2'>
            <input
              type='text'
              value={customIngredient}
              onChange={(e) => setCustomIngredient(e.target.value)}
              placeholder='Add a custom ingredient...'
              className='input input-bordered flex-1'
            />
            <button
              type='submit'
              className='btn bg-primary text-white normal-case'
            >
              Add
            </button>
          </form>
        </div>

        {/* Selected Ingredients Display */}
        {selectedIngredients.length > 0 && (
          <div className='mb-6'>
            <h3 className='text-lg font-semibold text-gray-700 mb-2'>
              Selected Ingredients:
            </h3>
            <div className='flex flex-wrap gap-2'>
              {selectedIngredients.map((ingredient) => (
                <div key={ingredient} className='badge badge-primary gap-2 p-4'>
                  {ingredient}
                  <button
                    onClick={() => handleIngredientSelect(ingredient)}
                    className='btn btn-ghost btn-xs'
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {Object.entries(ingredients).map(([category, items]) => (
          <div key={category} className='space-y-4'>
            <button
              onClick={() => toggleCategory(category)}
              className='w-full flex items-center justify-between px-4 rounded-lg max-w-fit'
            >
              <h3 className='text-lg font-semibold text-gray-700 mr-4'>
                {category}
              </h3>
              <span className='text-xl transition-transform duration-200 text-primary'>
                {expandedCategories[category] ? 'close' : 'open'}
              </span>
            </button>

            {expandedCategories[category] && (
              <div className='flex flex-wrap gap-3 px-4 bg-white rounded-lg shadow-sm'>
                {items.map((ingredient) => (
                  <button
                    key={ingredient.name}
                    onClick={() => handleIngredientSelect(ingredient.name)}
                    className={`btn ${
                      selectedIngredients.includes(ingredient.name)
                        ? 'bg-primary text-white'
                        : 'bg-secondary/20 border border-secondary/40 hover:border-secondary hover:bg-secondary/40 text-neutral'
                    } normal-case flex items-center justify-start gap-2 px-4 transition-all`}
                  >
                    <span className='text-xl'>{ingredient.icon}</span>
                    <span className='capitalize'>{ingredient.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        <div className='flex justify-center mt-8'>
          <button
            onClick={handleGenerateRecipe}
            disabled={selectedIngredients.length === 0 || isLoading}
            className='btn bg-primary text-white normal-case px-8'
          >
            {isLoading ? 'Generating...' : 'Generate Recipe'}
          </button>
        </div>
      </div>
    </div>
  );
}
