import React from 'react';
import getRecipes from '../actions/getRecipes';
import Link from 'next/link';

export const revalidate = 3600;

const FeaturedRecipes = async () => {
  const recipes = await getRecipes();

  return (
    <section>
      <div className='relative space-y-6 container mx-auto pb-20 pt-10 px-6'>
        <div className='mb-8'>
          <h1 className='text-4xl font-bold mb-3'>Featured Recipes</h1>
          <p className='text-neutral/70'>
            Select a cuisine to discover authentic recipes and cooking
            inspiration.
          </p>
        </div>
        <div className='flex flex-col gap-8'>
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {recipes.map((recipe, index) => (
              <div
                key={`recipe-${index}`}
                className='card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow'
              >
                <div className='card-body'>
                  <h2 className='card-title'>{recipe.title || recipe.name}</h2>
                  <div className='origin-center w-fit'>
                    <Link
                      href={`/featuredRecipes/${recipe.slug}`}
                      className='btn bg-secondary/20 border border-secondary/40 hover:border-secondary hover:bg-secondary/40 text-neutral normal-case flex items-center justify-start gap-2 px-4 transition-all mt-4'
                    >
                      View Recipe
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRecipes;
