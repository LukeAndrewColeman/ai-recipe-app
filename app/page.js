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
      <div className='bg-primary/60 py-20 text-white'>
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
      </div>

      {/* Featured Recipes Section */}
      {/* <div className='pt-20 relative overflow-hidden'>
        <div className='max-w-6xl mx-auto px-6 relative'>
          <div className='text-center mb-10'>
            <span className='inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4'>
              Community Favorites
            </span>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>
              Featured Recipes
            </h2>
            <p className='text-base-content/70 leading-relaxed max-w-2xl mx-auto'>
              Explore our collection of popular AI-generated recipes. These
              featured dishes have been enjoyed by our community and showcase
              the diversity of cuisines our AI can create.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
            <motion.div
              className='p-6 rounded-xl bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-all duration-300'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className='text-4xl mb-3'>🍝</div>
              <h3 className='text-xl font-semibold mb-2'>Italian Classics</h3>
              <p className='text-base-content/70'>
                Authentic pasta dishes, creamy risottos, and traditional Italian
                desserts.
              </p>
            </motion.div>

            <motion.div
              className='p-6 rounded-xl bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-all duration-300'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className='text-4xl mb-3'>🌮</div>
              <h3 className='text-xl font-semibold mb-2'>Mexican Favorites</h3>
              <p className='text-base-content/70'>
                Spicy tacos, hearty enchiladas, and refreshing Mexican
                beverages.
              </p>
            </motion.div>

            <motion.div
              className='p-6 rounded-xl bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-all duration-300'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <div className='text-4xl mb-3'>🍜</div>
              <h3 className='text-xl font-semibold mb-2'>Asian Delights</h3>
              <p className='text-base-content/70'>
                Flavorful stir-fries, steaming noodle soups, and delicate dim
                sum.
              </p>
            </motion.div>
          </div>

          <div className='flex justify-center'>
            <motion.div
              className='origin-center inline-block'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05, rotate: 1.5, origin: 'center' }}
            >
              <Link
                href='/featured-recipes'
                className='btn bg-primary hover:bg-primary/90 text-white normal-case px-8'
              >
                Discover All Featured Recipes →
              </Link>
            </motion.div>
          </div>
        </div>
      </div> */}

      <div className='flex flex-col items-center text-center max-w-3xl mx-auto my-20 px-6'>
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
      </div>
    </>
  );
}
