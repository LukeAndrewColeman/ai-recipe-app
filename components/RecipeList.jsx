import { useState } from 'react';
import RecipeModal from './RecipeModal';

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
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className='card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow'
            onClick={() => handleOpenModal(recipe)}
          >
            <div className='card-body'>
              <h2 className='card-title'>{recipe.title || recipe.name}</h2>
              <p className='mb-4'>{recipe.description}</p>
              <button className='btn bg-secondary/20 border border-secondary/40 hover:border-secondary hover:bg-secondary/40 text-neutral normal-case flex items-center justify-start gap-2 px-4 transition-all'>
                View Recipe
              </button>
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
