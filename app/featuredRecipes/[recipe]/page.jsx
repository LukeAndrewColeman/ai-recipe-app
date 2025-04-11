import React from 'react';
import getRecipe from '@/app/actions/getRecipe';
import { notFound } from 'next/navigation';
import Link from 'next/link';
// Generate dynamic metadata based on recipe data
export async function generateMetadata({ params }) {
  const { recipe } = params;

  try {
    const recipeData = await getRecipe(recipe);

    return {
      title: `${recipeData.title} Recipe | SmartRecipe Ai`,
      description: recipeData.description.replace(/<[^>]*>/g, '').slice(0, 160),
      openGraph: {
        title: recipeData.title,
        description: recipeData.description
          .replace(/<[^>]*>/g, '')
          .slice(0, 160),
        type: 'article',
        url: `https://smartrecipeai.com/featuredRecipes/${recipe}`,
      },

      // Add JSON-LD Schema
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Recipe',
        name: recipeData.title,
        description: recipeData.description.replace(/<[^>]*>/g, ''),
        cookTime: recipeData.cookTime,
        recipeYield: recipeData.servings,
        recipeIngredient: [], // You would populate this from your data
        author: {
          '@type': 'Person',
          name: 'SmartRecipe Ai', // Update with actual author
        },
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    // Return default metadata if we can't fetch the recipe
    return {
      title: 'Recipe | SmartRecipe Ai',
      description: 'Discover delicious recipes at SmartRecipe Ai',
    };
  }
}

export const revalidate = 86400;

const RecipePage = async ({ params }) => {
  const { recipe } = params;

  try {
    const recipePost = await getRecipe(recipe);

    return (
      <>
        <article>
          <header className='bg-gradient-to-r to-[#64CCCD] from-[#1B3C6F] text-center pt-12 pb-32'>
            <h1 className='text-5xl font-bold text-white px-4 py-8 rounded-lg uppercase'>
              {recipePost.title}
            </h1>
            <div
              className='rich-text-content text-white'
              dangerouslySetInnerHTML={{ __html: recipePost.description }}
            />
          </header>

          <div className='container mx-auto px-4 py-8'>
            <section className='recipe-details flex flex-row gap-4'>
              <p className='bg-primary/10 text-primary rounded-lg p-2'>
                {recipePost.difficulty}
              </p>
              <p className='bg-primary/10 text-primary rounded-lg p-2'>
                {recipePost.cookTime}
              </p>
              <p className='bg-primary/10 text-primary rounded-lg p-2'>
                <span className=''>Servings</span> {recipePost.servings}
              </p>
            </section>

            <section
              className='recipe-instructions rich-text-content max-w-5xl mt-8'
              dangerouslySetInnerHTML={{ __html: recipePost.copy }}
            />
          </div>
        </article>
        <div className='bg-base-200 py-12 mt-12 rounded-lg'>
          <div className='text-center'>
            <h2 className='text-2xl font-bold mb-4'>
              Want to Create Your Own Recipe?
            </h2>
            <p className='text-base-content/70 mb-6 max-w-xl mx-auto'>
              Try our AI-powered recipe generator to create unique dishes
              tailored to your preferences.
            </p>
            <Link
              href='/selector'
              className='btn bg-primary hover:bg-primary/90 text-white normal-case px-8'
            >
              Generate a Recipe →
            </Link>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error('Error fetching recipe:', error);
    // If recipe not found or error occurs, show 404 page
    notFound();
  }
};

export default RecipePage;
