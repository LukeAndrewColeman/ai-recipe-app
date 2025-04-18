import React from 'react';
import Image from 'next/image';
import googleLogo from '@/public/google.png';
import openaiLogo from '@/public/openai.png';

const Logos = () => {
  return (
    <div className='text-center py-12'>
      {/* Heading */}
      <h2 className='mb-8 text-gray-800'>Using the latest AI models</h2>

      {/* Logos Container */}
      <div className='flex justify-center items-center gap-12'>
        {/* OpenAI Logo */}
        <div className='relative w-32 h-12 transition-transform hover:scale-110'>
          <Image
            src={openaiLogo}
            alt='OpenAI Logo'
            fill
            className='object-contain'
          />
        </div>

        {/* Google Logo */}
        <div className='relative w-32 h-12 transition-transform hover:scale-110'>
          <Image
            src={googleLogo}
            alt='Google Logo'
            fill
            className='object-contain'
          />
        </div>
      </div>
      {/* Down Arrow */}
      <div className='flex justify-center mt-12'>
        <svg
          className='w-8 h-8 text-gray-400'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 14l-7 7m0 0l-7-7m7 7V3'
          />
        </svg>
      </div>
    </div>
  );
};

export default Logos;
