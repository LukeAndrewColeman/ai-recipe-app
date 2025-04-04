'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import LoadingOverlay from './LoadingOverlay';
import { motion } from 'motion/react';
export default function CuisineSelector() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const cuisineCategories = {
    'Asian Cuisine': [
      { name: 'chinese', icon: '🥢' },
      { name: 'japanese', icon: '🍱' },
      { name: 'thai', icon: '🍜' },
      { name: 'korean', icon: '🍚' },
      { name: 'vietnamese', icon: '🍲' },
      { name: 'indian', icon: '🍛' },
      { name: 'malaysian', icon: '🍜' },
      { name: 'indonesian', icon: '🍚' },
      { name: 'filipino', icon: '🥘' },
      { name: 'mongolian', icon: '🍖' },
      { name: 'nepalese', icon: '🥘' },
      { name: 'sri-lankan', icon: '🍛' },
    ],
    'European Cuisine': [
      { name: 'italian', icon: '🍝' },
      { name: 'french', icon: '🥖' },
      { name: 'english', icon: '🍴' },
      { name: 'greek', icon: '🥙' },
      { name: 'spanish', icon: '🥘' },
      { name: 'german', icon: '🥨' },
      { name: 'portuguese', icon: '🐟' },
      { name: 'polish', icon: '🥟' },
      { name: 'hungarian', icon: '🍲' },
      { name: 'turkish', icon: '🥙' },
      { name: 'russian', icon: '🥘' },
      { name: 'scandinavian', icon: '🐟' },
    ],
    'American Cuisine': [
      { name: 'american', icon: '🍔' },
      { name: 'mexican', icon: '🌮' },
      { name: 'bbq', icon: '🍖' },
      { name: 'cajun', icon: '🦐' },
      { name: 'soul-food', icon: '🍗' },
      { name: 'brazilian', icon: '🥩' },
      { name: 'peruvian', icon: '🐟' },
      { name: 'argentinian', icon: '🥩' },
      { name: 'colombian', icon: '🫓' },
      { name: 'cuban', icon: '🥪' },
    ],
    'Regional Specialties': [
      { name: 'dim-sum', icon: '🥟' },
      { name: 'street-food', icon: '🥡' },
      { name: 'tapas', icon: '🍤' },
      { name: 'sushi', icon: '🍣' },
      { name: 'pizza', icon: '🍕' },
    ],
    'Other Cuisines': [
      { name: 'mediterranean', icon: '🫒' },
      { name: 'middle-eastern', icon: '🧆' },
      { name: 'caribbean', icon: '🍛' },
      { name: 'african', icon: '🥘' },
      { name: 'fusion', icon: '🍽️' },
      { name: 'vegetarian', icon: '🥗' },
      { name: 'seafood', icon: '🦞' },
      { name: 'desserts', icon: '🍰' },
    ],
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCuisineClick = async (cuisine) => {
    if (!cuisine) {
      console.error('Invalid cuisine selected');
      return;
    }

    try {
      setIsLoading(true);
      const formattedCuisine = cuisine.toLowerCase().trim();
      router.push(`/cuisines/${formattedCuisine}`);
    } catch (error) {
      console.error('Error navigating to cuisine page:', error);
      setIsLoading(false);
    }
  };

  const filteredCategories = searchTerm
    ? Object.fromEntries(
        Object.entries(cuisineCategories).map(([category, cuisines]) => [
          category,
          cuisines.filter((cuisine) =>
            cuisine.name.toLowerCase().includes(searchTerm.toLowerCase())
          ),
        ])
      )
    : cuisineCategories;

  if (!mounted) return null;

  return (
    <div className='relative space-y-6 container mx-auto pb-20 pt-10 px-6'>
      <div className='mb-8'>
        <h1 className='text-4xl font-bold mb-3'>Select a Cuisine</h1>
        <p className='text-neutral/70'>
          Select a cuisine to discover authentic recipes and cooking
          inspiration.
        </p>
      </div>
      {isLoading && <LoadingOverlay />}
      {/* Cuisine Categories */}
      {Object.entries(filteredCategories).map(
        ([category, cuisines]) =>
          cuisines.length > 0 && (
            <motion.div
              key={category}
              className='space-y-4'
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
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
                      key={cuisine.name}
                      onClick={() => handleCuisineClick(cuisine.name || '')}
                      disabled={isLoading || !cuisine.name}
                      className='btn bg-secondary/20 border border-secondary/40 hover:border-secondary hover:bg-secondary/40 text-neutral normal-case flex items-center justify-start gap-2 px-4 transition-all'
                    >
                      <span className='text-xl'>{cuisine.icon}</span>
                      <span className='capitalize'>{cuisine.name}</span>
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )
      )}
    </div>
  );
}
