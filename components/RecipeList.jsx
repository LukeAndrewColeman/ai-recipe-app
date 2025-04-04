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
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {recipes.map((recipe, index) => (
          <div
            key={`recipe-${index}`}
            className='card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow'
            onClick={() => handleOpenModal(recipe)}
          >
            <div className='card-body'>
              <h2 className='card-title'>{recipe.title || recipe.name}</h2>
              <p className='mb-4'>{recipe.description}</p>
              <motion.div
                className='origin-center w-fit'
                whileHover={{ scale: 1.05, rotate: 2, origin: 'center' }}
              >
                <button className='btn bg-secondary/20 border border-secondary/40 hover:border-secondary hover:bg-secondary/40 text-neutral normal-case flex items-center justify-start gap-2 px-4 transition-all'>
                  View Recipe
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
