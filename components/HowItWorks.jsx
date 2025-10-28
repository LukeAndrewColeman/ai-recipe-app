import React from 'react';
import { motion } from 'framer-motion';

// Simple card component
const StepCard = ({ step, index }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className='relative bg-white p-6 rounded-lg shadow-sm'
  >
    {/* Simple numbered indicator */}
    <div className='flex items-center mb-4'>
      <span
        className='w-8 h-8 rounded-full bg-secondary/10 flex items-center
                     justify-center text-secondary font-semibold mr-3'
      >
        {index + 1}
      </span>
      <h3 className='text-lg font-semibold'>{step.title}</h3>
    </div>

    {/* Description */}
    <p className='text-gray-600 leading-relaxed'>{step.description}</p>
  </motion.div>
);

export default function HowItWorks({ steps }) {
  return (
    <section className='pb-20 pt-8 px-4'>
      {/* Simple header */}
      <div className='text-center max-w-2xl mx-auto mb-12'>
        <h2 className='text-3xl font-semibold mb-4'>How It Works</h2>
        <p className='text-gray-600'>
          Smart Recipe AI makes exploring new recipes simple and fun. Discover
          delicious dishes from around the world.
        </p>
      </div>

      {/* Clean grid layout */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto'>
        {steps.map((step, index) => (
          <StepCard key={index} step={step} index={index} />
        ))}
      </div>
    </section>
  );
}
