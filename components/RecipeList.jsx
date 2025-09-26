import { useState } from 'react';
import RecipeModal from '@/components/RecipeModal';
import { motion } from 'motion/react';

export default function RecipeList({ recipes }) {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  return (
    <>
      <div className='flex flex-wrap flex-row justify-center items-center gap-8 pt-8'>
        {recipes.map((recipe, index) => (
          <div
            key={`recipe-${index}`}
            className='card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow max-w-[400px]'
            onClick={() => handleOpenModal(recipe)}
          >
            <div className='card-body flex flex-col justify-between'>
              <h2 className='card-title'>{recipe.title || recipe.name}</h2>
              <motion.div
                className='origin-center w-fit'
                whileHover={{ scale: 1.05, rotate: 2, origin: 'center' }}
              >
                <button className='text-primary/90 hover:text-primary/70 font-bold'>
                  View Recipe →
                </button>
              </motion.div>
            </div>
          </div>
        ))}
      </div>

      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
