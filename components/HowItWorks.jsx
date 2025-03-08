import React from 'react';

export default function HowItWorks({ steps }) {
  return (
    <div className='container mx-auto py-16'>
      <div className='text-center mb-16'>
        <h2 className='text-3xl font-bold mb-4'>How It Works</h2>
        <p className='text-base-content/70 max-w-2xl mx-auto leading-relaxed'>
          SmartRecipe AI makes exploring new recipes simple and fun. Discover
          delicious dishes from around the world, powered by artificial
          intelligence.
        </p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 px-6'>
        {steps.map((step, index) => (
          <div key={index} className='relative group'>
            <div
              className='h-full p-8 rounded-2xl bg-base-100 border border-base-200
                  shadow-lg transition-all duration-300
                  hover:shadow-2xl hover:-translate-y-1'
            >
              <div
                className={`
                    w-16 h-16 mb-6 rounded-xl
                    bg-gradient-to-br ${step.gradient}
                    flex items-center justify-center
                    transform transition-transform group-hover:scale-110
                    shadow-lg
                  `}
              >
                <span className='text-3xl'>{step.icon}</span>
              </div>

              <div
                className='absolute -top-4 -left-4 w-8 h-8
                    rounded-full bg-base-100 border-2 border-base-200
                    flex items-center justify-center font-bold text-sm'
              >
                {index + 1}
              </div>

              <h3 className='text-xl font-bold mb-3 text-base-content'>
                {step.title}
              </h3>
              <p className='text-base-content/70 leading-relaxed'>
                {step.description}
              </p>

              <div
                className={`
                    absolute bottom-0 right-0 w-24 h-24
                    opacity-10 rounded-br-2xl
                    bg-gradient-to-br ${step.gradient}
                    transition-opacity group-hover:opacity-20 rounded-2xl
                  `}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
