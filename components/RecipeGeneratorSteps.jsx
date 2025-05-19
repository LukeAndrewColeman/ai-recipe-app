'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { ingredients, cuisineCategories } from '@/lib/constants';

export default function RecipeGeneratorSteps() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCuisineSelect = (cuisine) => {
    setSelectedCuisine(cuisine);
  };

  const handleIngredientSelect = (ingredient) => {
    setSelectedIngredients((prev) => {
      if (prev.includes(ingredient)) {
        return prev.filter((i) => i !== ingredient);
      }
      return [...prev, ingredient];
    });
    setCurrentStep(2);
  };

  const handleGenerateRecipe = async () => {
    setIsLoading(true);
    try {
      // Update credits
      await fetch('/api/credits', {
        method: 'POST',
        body: '',
      });

      // Generate recipe
      const response = await fetch('/api/generate-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cuisine: selectedCuisine,
          ingredients: selectedIngredients,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/recipe/${data.recipeId}`);
      } else {
        throw new Error('Failed to generate recipe');
      }
    } catch (error) {
      console.error('Error generating recipe:', error);
      setIsLoading(false);
    }
  };

  const renderStepIndicator = () => (
    <div className='flex justify-center mb-8'>
      <div className='flex space-x-4'>
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            className={`flex items-center ${
              step <= currentStep ? 'text-primary' : 'text-gray-400'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step <= currentStep
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {step}
            </div>
            {step < 3 && (
              <div
                className={`w-16 h-1 ${
                  step < currentStep ? 'bg-primary' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className='space-y-6'>
            <h2 className='text-2xl font-bold text-center mb-6'>
              Select Your Ingredients
            </h2>
            <p className='text-center text-gray-600 mb-6'>
              Choose up to 5 ingredients you'd like to include in your recipe
            </p>
            {Object.entries(ingredients).map(([category, items]) => (
              <div key={category} className='space-y-4'>
                <h3 className='text-lg font-semibold text-gray-700'>
                  {category}
                </h3>
                <div className='flex flex-wrap gap-3'>
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
              </div>
            ))}
            <div className='flex justify-center mt-8'>
              <button
                onClick={() => setCurrentStep(3)}
                disabled={selectedIngredients.length === 0}
                className='btn bg-primary text-white normal-case px-8'
              >
                Continue
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className='space-y-6'>
            <h2 className='text-2xl font-bold text-center mb-6'>
              Choose Your Cuisine
            </h2>
            {Object.entries(cuisineCategories).map(([category, cuisines]) => (
              <div key={category} className='space-y-4'>
                <h3 className='text-lg font-semibold text-gray-700'>
                  {category}
                </h3>
                <div className='flex flex-wrap gap-3'>
                  {cuisines.map((cuisine) => (
                    <motion.div
                      key={cuisine.name}
                      whileHover={{ scale: 1.05, rotate: 2, origin: 'center' }}
                    >
                      <button
                        onClick={() => handleCuisineSelect(cuisine.name)}
                        className='btn bg-secondary/20 border border-secondary/40 hover:border-secondary hover:bg-secondary/40 text-neutral normal-case flex items-center justify-start gap-2 px-4 transition-all'
                      >
                        <span className='text-xl'>{cuisine.icon}</span>
                        <span className='capitalize'>{cuisine.name}</span>
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      case 3:
        return (
          <div className='space-y-6 text-center'>
            <h2 className='text-2xl font-bold mb-6'>
              Ready to Generate Your Recipe
            </h2>
            <div className='bg-gray-50 p-6 rounded-lg mb-6'>
              <p className='text-gray-600 mb-2'>Selected Cuisine:</p>
              <p className='text-xl font-semibold capitalize'>
                {selectedCuisine}
              </p>
              <p className='text-gray-600 mt-4 mb-2'>Selected Ingredients:</p>
              <div className='flex flex-wrap gap-2 justify-center'>
                {selectedIngredients.map((ingredient) => (
                  <span
                    key={ingredient}
                    className='bg-primary/10 text-primary px-4 py-2 rounded-full capitalize'
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={handleGenerateRecipe}
              disabled={isLoading}
              className='btn bg-primary text-white normal-case px-8'
            >
              {isLoading ? 'Generating...' : 'Generate Recipe'}
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='container mx-auto px-6 py-10'>
      {renderStepIndicator()}
      {renderStepContent()}
    </div>
  );
}
