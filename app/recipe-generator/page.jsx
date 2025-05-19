import RecipeGenerator from '@/components/RecipeGenerator';

export const metadata = {
  title: 'Generate tasty and healthy recipes with AI | SmartRecipe AI',
  description:
    'Generate tasty and healthy recipes with AI. Choose your favorite cuisine and let AI generate recipes for you!',
};

const Selector = () => {
  return <RecipeGenerator />;
};

export default Selector;
