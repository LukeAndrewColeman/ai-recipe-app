'use client';

import React from 'react';
import { useUser } from '@clerk/nextjs';

const pricingPlans = [
  {
    name: 'Starter',
    credits: 10,
    price: 2.99,
    priceId: 'price_1RMoXu2YBUfUu2BIFyMVeX7V',
    features: [
      '10 AI-generated recipes',
      'save unlimited recipes',
      'Email support',
    ],
    popular: false,
  },
  {
    name: 'Standard',
    credits: 30,
    price: 6.99,
    priceId: 'price_1RMocv2YBUfUu2BIrIdqLwI7',
    features: [
      '30 AI-generated recipes',
      'save unlimited recipes',
      'Priority email support',
    ],
    popular: true,
  },
  {
    name: 'Pro',
    credits: 60,
    price: 12.99,
    priceId: 'price_1RMoeA2YBUfUu2BIcHd42jvr',
    features: [
      '60 AI-generated recipes',
      'save unlimited recipes',
      '24/7 priority support',
      'Early access to new features',
    ],
    popular: false,
  },
];

const BuyCredits = () => {
  const { user } = useUser();

  const handleCheckout = async (priceId, credits) => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId, credits }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert('Error creating checkout session');
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-base-100 to-base-200 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Header Section */}
        <div className='mb-32'>
          <h1 className='text-4xl font-bold mb-3'>Buy More Recipe Credits</h1>
          <h2 className='text-neutral/70'>
            Get access to AI-generated recipes tailored to your preferences.
            Each credit generates 1 unique recipe.
          </h2>
        </div>

        {/* Pricing Cards */}
        <div className='flex flex-wrap gap-16 max-w-7xl mx-auto justify-center'>
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-xl p-8 min-w-[350px] ${
                plan.popular
                  ? 'bg-primary/90 text-white shadow-xl scale-105'
                  : 'bg-base-100 text-neutral shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
                  <span className='bg-secondary text-black px-6 py-3 rounded-full text-sm font-semibold uppercase shadow-lg'>
                    Most Popular
                  </span>
                </div>
              )}

              <div className='text-center'>
                <h2 className='text-2xl font-bold mb-2'>{plan.name}</h2>
                <div className='mb-6'>
                  <span className='text-4xl font-bold'>£{plan.price}</span>
                  <span className='text-lg opacity-80'>/one-time</span>
                </div>
                <div className='mb-6'>
                  <span className='text-2xl font-semibold'>{plan.credits}</span>
                  <span className='text-lg opacity-80'> credits</span>
                </div>
              </div>

              <ul className='space-y-4 mb-8'>
                {plan.features.map((feature) => (
                  <li key={feature} className='flex items-center'>
                    <svg
                      className={`h-5 w-5 mr-3 ${
                        plan.popular ? 'text-white' : 'text-primary'
                      }`}
                      fill='none'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path d='M5 13l4 4L19 7'></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className='flex justify-center'>
                <button
                  onClick={() => handleCheckout(plan.priceId, plan.credits)}
                  className={`btn normal-case flex items-center justify-start gap-2 px-4 transition-all mt-8 ${
                    plan.popular
                      ? 'bg-secondary border border-secondary/40 hover:border-secondary hover:bg-secondary/40 text-neutral'
                      : 'bg-primary/20 border border-primary/40 hover:border-primary hover:bg-primary/40 text-neutral'
                  }`}
                >
                  {user ? 'Get Started' : 'Sign Up Now'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className='mt-16 max-w-3xl mx-auto'>
          <h2 className='text-2xl font-bold text-center mb-8'>FAQs</h2>
          <div className='space-y-6'>
            <div className='bg-base-100 p-6 rounded-lg shadow'>
              <h3 className='font-semibold mb-2'>How do credits work?</h3>
              <p className='text-neutral/70'>
                Each credit generates 1 unique AI recipe. Credits are valid
                until you run out.
              </p>
            </div>
            <div className='bg-base-100 p-6 rounded-lg shadow'>
              <h3 className='font-semibold mb-2'>Can I get a refund?</h3>
              <p className='text-neutral/70'>
                We offer a 7-day money-back guarantee if you're not satisfied
                with our service.
              </p>
            </div>
            <div className='bg-base-100 p-6 rounded-lg shadow'>
              <h3 className='font-semibold mb-2'>Do credits expire?</h3>
              <p className='text-neutral/70'>
                No, credits do not expire, you can use them as long as you want.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyCredits;
