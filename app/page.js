'use client';

import Link from 'next/link';
import Image from 'next/image';
import HowItWorks from '@/components/HowItWorks';
import { motion } from 'motion/react';

export default function Home() {
  const steps = [
    {
      icon: '🎯',
      title: 'Choose Your Cuisine',
      description: 'Select from our diverse range of global cuisines',
      gradient: 'from-blue-500 to-cyan-400',
    },
    {
      icon: '🤖',
      title: 'AI Recipe Generation',
      description: 'Our AI creates unique recipes tailored to your choice',
      gradient: 'from-purple-500 to-pink-400',
    },
    {
      icon: '👩‍🍳',
      title: 'Start Cooking',
      description: 'Follow detailed instructions to create amazing dishes',
      gradient: 'from-green-500 to-emerald-400',
    },
  ];

  return (
    <section className='min-h-screen'>
      <div className='pb-40 pt-20 relative bg-cover bg-center bg-fixed'>
        <div className='absolute inset-0 bg-gradient-to-r from-[#1B3B6F] to-[#66CECF]'></div>
        <div className='container mx-auto relative px-4 max-w-4xl'>
          <h1 className='text-5xl md:text-7xl font-bold mb-8 text-white'>
            <span className='inline-block animate-slide-in-left'>Smart</span>
            <span className='inline-block animate-slide-in-left-delay-1'>
              Recipe
            </span>{' '}
            <span className='relative inline-block animate-slide-in-left-delay-2'>
              <span className='text-[#66CECF]'>AI</span>
            </span>{' '}
          </h1>
          <h2 className='text-2xl md:text-3xl font-medium mb-6 text-white/90'>
            Discover Authentic Recipes from Around the World
          </h2>
          <p className='text-lg text-white/80 max-w-2xl leading-relaxed'>
            Select a cuisine to discover authentic recipes and cooking
            inspiration, all in one place. Let AI be your personal chef!
          </p>
          <motion.div
            className='origin-center inline-block'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05, rotate: 2, origin: 'center' }}
          >
            <Link
              href='/selector'
              className='mt-8 btn bg-secondary/20 border border-secondary/40 hover:border-secondary hover:bg-secondary/40 normal-case flex items-center justify-start gap-2 px-8 transition-all w-fit text-white'
            >
              Select a cuisine to get started →
            </Link>
          </motion.div>
        </div>
      </div>
      <div className='container mx-auto px-4 -mt-24 relative z-10'>
        <motion.div
          className='rounded-2xl shadow-2xl overflow-hidden border border-base-200'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src='/smartrecipe-ai-screenshot.png'
            alt='SmartRecipe AI App Interface'
            width={1200}
            height={675}
            className='w-full h-auto'
            priority
          />
        </motion.div>
      </div>

      <HowItWorks steps={steps} />

      {/* Recipe Book Section */}
      <div className='bg-base-200 py-20'>
        <div className='flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-6 gap-12'>
          <div className='flex-1'>
            <h2 className='text-3xl font-bold mb-4'>
              Your Digital Recipe Book
            </h2>
            <p className='text-base-content/70 leading-relaxed mb-6 max-w-lg'>
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
                href='/recipebook'
                className='btn bg-primary hover:bg-primary/90 text-white normal-case'
              >
                Open Recipe Book →
              </Link>
            </motion.div>
          </div>
          <div className='flex-1'>
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
      <div className='pt-20 relative overflow-hidden'>
        <div className='absolute -right-16 -top-16 w-64 h-64 rounded-full bg-primary/10 blur-3xl'></div>
        <div className='absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-secondary/10 blur-3xl'></div>

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
                href='/featuredRecipes'
                className='btn bg-primary hover:bg-primary/90 text-white normal-case px-8'
              >
                Discover All Featured Recipes →
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      <div className='flex flex-col items-center text-center max-w-3xl mx-auto my-20 px-6'>
        <h2 className='text-3xl font-bold mb-4'>
          Explore Our Cuisine Categories
        </h2>
        <p className='text-base-content/70 leading-relaxed'>
          Browse through our diverse collection of cuisines from around the
          world. Whether you're craving Asian delicacies, European classics,
          American comfort food, or something unique, we've got you covered.
          Select a cuisine below to discover authentic recipes and cooking
          inspiration.
        </p>
        <motion.div
          className='origin-center inline-block'
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05, rotate: 2, origin: 'center' }}
        >
          <Link
            href='/selector'
            className='btn bg-secondary/20 border border-secondary/40 hover:border-secondary hover:bg-secondary/40 normal-case flex items-center justify-start gap-2 px-8 transition-all text-center mt-8'
          >
            Select a Cuisine to get started →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
