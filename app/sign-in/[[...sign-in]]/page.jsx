import React from 'react';
import { SignIn } from '@clerk/nextjs';
import Image from 'next/image';

const SignInPage = () => {
  const features = [
    {
      title: 'Your Recipe Collection',
      description:
        'Access your saved recipes and continue your culinary journey',
    },
    {
      title: 'Generate New Recipes',
      description: 'Use your monthly credits to create new AI-powered recipes',
    },
    {
      title: 'Track Your Progress',
      description: 'View your cooking history and favorite recipes',
    },
    {
      title: 'Community Access',
      description:
        'Connect with other food enthusiasts and share your experiences',
    },
  ];

  return (
    <div className='min-h-screen'>
      <div className='grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh-4rem)]'>
        {/* Left side - Sign In Form */}
        <div className='flex items-center justify-center p-8 bg-base-100'>
          <div className='w-full max-w-md'>
            <SignIn
              signInFallbackRedirectUrl={'/dashboard'}
              signUpUrl='/sign-up'
            />
          </div>
        </div>

        {/* Right side - Features/Image */}
        <div className='hidden md:flex flex-col items-center justify-center p-8'>
          <div className='max-w-md space-y-8'>
            <h2 className='text-3xl font-bold text-primary mb-8 text-center'>
              Your SmartRecipe AI Dashboard
            </h2>
            <div className='space-y-6'>
              {features.map((feature, index) => (
                <div key={index} className='flex items-start space-x-4'>
                  <div className='flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center'>
                    <span className='text-secondary font-bold'>{index + 1}</span>
                  </div>
                  <div>
                    <h3 className='text-xl font-semibold text-neutral mb-2'>
                      {feature.title}
                    </h3>
                    <p className='text-neutral/70'>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
