'use client';

import React from 'react';
import { SignUp } from '@clerk/nextjs';
import Image from 'next/image';
import { motion } from 'motion/react';

const SignUpPage = () => {
  const benefits = [
    {
      title: 'AI-Powered Recipes',
      description:
        'Get personalized recipe suggestions based on your ingredients and preferences',
    },
    {
      title: 'Save Your Favorites',
      description:
        'Build your digital recipe book with unlimited saved recipes',
    },
    {
      title: 'Free Credits Monthly',
      description:
        'Receive 20 free credits every month to generate new recipes',
    },
    {
      title: 'Join the Community',
      description:
        'Connect with other food enthusiasts and share your culinary journey',
    },
  ];

  return (
    <div className='min-h-screen'>
      <div className='grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh-4rem)]'>
        {/* Left side - Sign Up Form */}
        <div className='flex items-center justify-center p-4 bg-base-100 relative overflow-hidden'>
          {/* Background Logo Behind Form */}
          <motion.div
            className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-4 pointer-events-none'
            initial={{ opacity: 0, scale: 0.8, rotate: 15 }}
            animate={{ opacity: 0.04, scale: 1, rotate: 10 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <Image
              src='/ai-robot.png'
              alt='Smart Recipe AI Background'
              width={420}
              height={420}
              className='w-[350px] h-[350px] md:w-[420px] md:h-[420px] object-contain'
            />
          </motion.div>
          <div className='w-full max-w-md'>
            <SignUp
              signUpFallbackRedirectUrl={'/create-user'}
              signInUrl='/sign-in'
            />
          </div>
        </div>

        {/* Right side - Benefits/Image */}
        <div className='hidden md:flex flex-col items-center justify-center p-8'>
          <div className='max-w-md space-y-8'>
            <h2 className='text-3xl font-bold text-primary mb-8 text-center'>
              Why Join Smart Recipe AI?
            </h2>
            <div className='space-y-6'>
              {benefits.map((benefit, index) => (
                <div key={index} className='flex items-start space-x-4'>
                  <div className='flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center'>
                    <span className='text-secondary font-bold'>{index + 1}</span>
                  </div>
                  <div>
                    <h3 className='text-xl font-semibold text-neutral mb-2'>
                      {benefit.title}
                    </h3>
                    <p className='text-neutral/70'>{benefit.description}</p>
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

export default SignUpPage;
