import DemoRecipeGenerator from '@/components/DemoRecipeGenerator';

/**
 * Demo Page
 *
 * This page allows visitors to try the recipe generator without signing up.
 * It's a great way to showcase the product and convert visitors into users.
 *
 * The demo is limited to a certain number of recipe generations,
 * after which users are prompted to sign up for the full experience.
 */

export const metadata = {
  title: 'Try Our AI Recipe Generator - Free Demo | Smart Recipe AI',
  description:
    'Try our AI recipe generator for free! Generate delicious recipes with your ingredients - no sign up required.',
};

export default function DemoPage() {
  return <DemoRecipeGenerator />;
}
