'use client';

import Link from 'next/link';
import Image from 'next/image';
import HowItWorks from '@/components/HowItWorks';
import { motion } from 'motion/react';
import NavCta from '@/components/NavCta';
import Logos from '@/components/Logos';
import { useUser } from '@clerk/nextjs';

export default function Home() {
  const { user } = useUser();
  const steps = [
    {
      title: 'Choose Your Ingredients',
      description:
        'Select from our diverse range of ingredients or input your own',
      gradient: 'from-purple-500 to-pink-400',
    },
    {
      title: 'AI Recipe Generation',
      description: 'Our AI creates a unique recipe tailored to your choice',
      gradient: 'from-purple-500 to-pink-400',
    },
    {
      title: 'Start Cooking',
      description: 'Follow detailed instructions to create amazing dishes',
      gradient: 'from-green-500 to-emerald-400',
    },
  ];

  const pricingPlans = [
    {
      name: 'Free Forever',
      credits: 20,
      price: 0,
      features: [
        '20 free credits monthly',
        'Save unlimited recipes',
        'Basic email support',
        'Access to all features',
      ],
      popular: false,
    },
  ];

  return (
    <>
      <NavCta />
      <div className=''>
        <div className='container mx-auto px-4 max-w-6xl z-20 flex md:flex-row flex-col items-center justify-center overflow-hidden gap-8'>
          <div className='w-full md:w-1/2 p-4'>
            <h1 className='text-2xl md:text-5xl font-bold mb-6 capitalize'>
              Smarter meals, fewer decisions, dinner on autopilot
            </h1>
            <h2 className='text-lg md:text-xl font-medium mb-4 max-w-5xl mx-auto'>
              Transform your kitchen adventures with AI-powered recipe magic!
              Create delicious meals from your available ingredients, making
              cooking fun and effortless.
            </h2>
            <motion.div
              className='origin-center inline-block'
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05, rotate: 2, origin: 'center' }}
            >
              <Link
                href='/recipe-generator'
                className='btn bg-secondary/20 border border-secondary/40 hover:border-secondary hover:bg-secondary/40 text-neutral normal-case flex items-center justify-start gap-2 px-4 transition-all mt-8'
              >
                Sign Up for Free →
              </Link>
            </motion.div>
          </div>
          <div className='w-full md:mb-0 md:w-1/2 max-h-[300px] md:max-h-[600px] order-first md:order-last overflow-hidden'>
            <Image
              src='/hero-image-two.jpg'
              alt='Hero Image'
              width={500}
              height={300}
              className='object-cover h-full w-full object-bottom'
            />
          </div>
        </div>
      </div>

      <Logos />

      <HowItWorks steps={steps} />

      {/* Split Authentication CTA Section */}
      <div className='grid grid-cols-1 md:grid-cols-2 min-h-[400px]'>
        {/* Register Block */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className='bg-primary p-12 flex flex-col items-center justify-center text-center relative overflow-hidden'
        >
          <div className='relative z-10'>
            <h2 className='text-2xl md:text-3xl font-bold text-white mb-4'>
              Start Your Journey Today
            </h2>
            <p className='text-white mb-6 max-w-sm mx-auto'>
              Create your free account and unlock:
            </p>
            <ul className='text-white mb-8 space-y-2'>
              <li>✓ Save unlimited favorite recipes</li>
              <li>✓ Join our cooking community</li>
              <li>✓ 20 free credits per month</li>
              <li>✓ 1 credit = 1 recipe</li>
              <li>✓ No credit card required</li>
            </ul>
            <motion.div
              className='origin-center inline-block'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05, rotate: 2, origin: 'center' }}
            >
              <Link
                href={user ? '/recipe-generator' : '/sign-up'}
                className='btn bg-white hover:bg-white/90 normal-case px-8 min-w-[200px]'
              >
                Sign Up for Free →
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Login Block */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className='bg-primary/60 p-12 flex flex-col items-center justify-center text-center relative overflow-hidden'
        >
          <div className='relative z-10'>
            <h2 className='text-2xl md:text-3xl font-bold text-white mb-4'>
              Welcome Back
            </h2>
            <p className='text-white mb-6 max-w-sm mx-auto'>
              Access your saved recipes and continue your culinary journey
            </p>
            <motion.div
              className='origin-center inline-block'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05, rotate: 2, origin: 'center' }}
            >
              <Link
                href={user ? '/recipe-generator' : '/sign-in'}
                className='btn bg-white hover:bg-white/90 normal-case px-8 min-w-[200px]'
              >
                Log In →
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className='w-full relative'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src='/full-width.jpg'
            alt='Fresh cooking ingredients laid out on a wooden surface'
            width={1920}
            height={400}
            className='w-full h-[400px] object-cover object-center'
            priority={false}
            loading='lazy'
            quality={100}
          />
        </motion.div>
      </div>

      {/* Recipe Book Section */}
      {/* <div className='bg-primary/60 py-20 text-white'>
        <div className='flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-6 gap-12'>
          <div className='flex-1'>
            <h2 className='text-3xl font-bold mb-4'>
              Your Digital Recipe Book
            </h2>
            <p className='text-white/70 leading-relaxed mb-6 max-w-lg'>
              Save your favorite AI-generated recipes in your personal digital
              recipe book. Organise and access your recipes anytime, anywhere.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className='origin-center inline-block'
              whileHover={{ scale: 1.05, rotate: 2, origin: 'center' }}
            >
              <Link
                href='/recipe-book'
                className='btn bg-white hover:bg-white/90 normal-case px-8 min-w-[200px]'
              >
                Open Recipe Book →
              </Link>
            </motion.div>
          </div>
          <div className='flex-1 row-auto rotate-1'>
            <div className='rounded-xl overflow-hidden shadow-xl'>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src='/recipe-book-screenshot.png'
                  alt='Digital Recipe Book Interface'
                  width={600}
                  height={400}
                  className='w-full h-auto'
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Reviews Section */}
      <div className='py-20 bg-base-100'>
        <div className='max-w-6xl mx-auto px-6'>
          <div className='text-center mb-12'>
            <span className='inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4'>
              What Our Users Say
            </span>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>
              Loved by Home Cooks
            </h2>
            <p className='text-base-content/70 leading-relaxed max-w-xl mx-auto'>
              Join our happy cooks who have transformed their kitchen experience
              with SmartRecipe AI.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {/* Review 1 */}
            <motion.div
              className='bg-white p-6 rounded-xl shadow-lg border border-primary/10'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -5 }}
            >
              <p className='text-gray-600 mb-4'>
                "This app has completely changed how I cook! The AI-generated
                recipes are creative and delicious. I've discovered so many new
                dishes I never would have tried otherwise."
              </p>
              <div className='flex items-center'>
                <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold mr-3'>
                  S
                </div>
                <div>
                  <p className='font-semibold'>Sarah M.</p>
                  <p className='text-sm text-gray-500'>Home Cook</p>
                </div>
              </div>
            </motion.div>

            {/* Review 2 */}
            <motion.div
              className='bg-white p-6 rounded-xl shadow-lg border border-primary/10'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <p className='text-gray-600 mb-4'>
                "As a busy parent, this app has been a lifesaver. I can quickly
                find recipes based on what's in my fridge, and the instructions
                are always clear and easy to follow."
              </p>
              <div className='flex items-center'>
                <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold mr-3'>
                  M
                </div>
                <div>
                  <p className='font-semibold'>Michael T.</p>
                  <p className='text-sm text-gray-500'>
                    Parent & Food Enthusiast
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Review 3 */}
            <motion.div
              className='bg-white p-6 rounded-xl shadow-lg border border-primary/10'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <p className='text-gray-600 mb-4'>
                "The recipe suggestions are incredibly creative! I love how it
                helps me use ingredients I already have and introduces me to new
                flavor combinations."
              </p>
              <div className='flex items-center'>
                <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold mr-3'>
                  L
                </div>
                <div>
                  <p className='font-semibold'>Lisa K.</p>
                  <p className='text-sm text-gray-500'>Culinary Explorer</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className='py-20 bg-gradient-to-b from-base-100 to-base-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <span className='inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4'>
              Simple Pricing
            </span>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>
              Start Cooking for Free
            </h2>
            <p className='text-base-content/70 leading-relaxed max-w-xl mx-auto'>
              Get started with 20 free credits every month. No credit card
              required.
            </p>
          </div>

          <div className='flex flex-wrap gap-8 max-w-7xl mx-auto justify-center'>
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
                    <span className='text-3xl font-bold'>
                      {plan.price === 0 ? 'Free' : plan.price}
                    </span>
                    {plan.price !== 0 && (
                      <span className='text-lg opacity-80'>/one-time</span>
                    )}
                  </div>
                  <div className='mb-6'>
                    <span className='text-2xl font-semibold'>
                      {plan.credits}
                    </span>
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
                  <Link
                    href={
                      plan.name === 'Buy Credits'
                        ? '/buy-credits'
                        : user
                        ? '/recipe-generator'
                        : '/sign-up'
                    }
                    className={`btn normal-case flex items-center justify-start gap-2 px-4 transition-all mt-8 ${
                      plan.popular
                        ? 'bg-secondary border border-secondary/40 hover:border-secondary hover:bg-secondary/40 text-neutral'
                        : 'bg-primary/20 border border-primary/40 hover:border-primary hover:bg-primary/40 text-neutral'
                    }`}
                  >
                    {plan.name === 'Buy Credits'
                      ? 'View Pricing'
                      : user
                      ? 'Sign Up for Free →'
                      : 'Sign Up for Free →'}
                  </Link>
                </div>
                <p className='text-sm text-gray-500 text-center mt-4'>
                  No credit card required
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      {/* <div className='flex flex-col items-center text-center max-w-3xl mx-auto my-20 px-6'>
        <h2 className='text-3xl font-bold mb-4'>
          Turn your ingredients into delicious recipes
        </h2>
        <p className='text-base-content/70 leading-relaxed'>
          Stuck for ideas? fridge looking a bit bare? Select your ingredients
          and let AI do the hard work and generate a recipe for you.
        </p>
        <motion.div
          className='origin-center inline-block'
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05, rotate: 2, origin: 'center' }}
        >
          <Link
            href='/recipe-generator'
            className='btn bg-secondary/20 border border-secondary/40 hover:border-secondary hover:bg-secondary/40 text-neutral normal-case flex items-center justify-start gap-2 px-4 transition-all mt-8'
          >
            Start Cooking Smarter →
          </Link>
        </motion.div>
      </div> */}
    </>
  );
}
