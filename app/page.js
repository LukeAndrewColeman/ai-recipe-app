import Link from 'next/link';
import Image from 'next/image';
import HowItWorks from '@/components/HowItWorks';

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
    <div className='min-h-screen'>
      <section className=''>
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
            <Link
              href='/selector'
              className='mt-8 btn bg-secondary/20 border border-secondary/40 hover:border-secondary hover:bg-secondary/40 normal-case flex items-center justify-start gap-2 px-8 transition-all w-fit text-white'
            >
              Select a cuisine to get started →
            </Link>
          </div>
        </div>
        <div className='container mx-auto px-4 -mt-24 relative z-10'>
          <div className='rounded-2xl shadow-2xl overflow-hidden border border-base-200'>
            <Image
              src='/smartrecipe-ai-screenshot.png'
              alt='SmartRecipe AI App Interface'
              width={1200}
              height={675}
              className='w-full h-auto'
              priority
            />
          </div>
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
              <Link
                href='/recipebook'
                className='btn bg-primary hover:bg-primary/90 text-white normal-case'
              >
                Open Recipe Book →
              </Link>
            </div>
            <div className='flex-1'>
              <div className='rounded-xl overflow-hidden shadow-xl'>
                <Image
                  src='/recipe-book-screenshot.png'
                  alt='Digital Recipe Book Interface'
                  width={600}
                  height={400}
                  className='w-full h-auto'
                />
              </div>
            </div>
          </div>
        </div>

        {/* Meal Planner Section */}
        {/* <div className='py-20'>
          <div className='flex flex-col md:flex-row-reverse items-center justify-between max-w-6xl mx-auto px-6 gap-12'>
            <div className='flex-1'>
              <h2 className='text-3xl font-bold mb-4'>Smart Meal Planner</h2>
              <p className='text-base-content/70 leading-relaxed mb-6 max-w-lg'>
                Plan your weekly meals with our intelligent meal planning
                system. Make meal prep easier and more organized than ever
                before.
              </p>
              <Link
                href='/planner'
                className='btn bg-secondary/20 border border-secondary/40 hover:border-secondary hover:bg-secondary/40 normal-case flex items-center justify-start gap-2 px-8 transition-all text-center mt-8 w-fit'
              >
                Start Planning →
              </Link>
            </div>
            <div className='flex-1'>
              <div className='rounded-xl overflow-hidden shadow-xl'>
                <Image
                  src='/planner-screenshot.png'
                  alt='Meal Planner Interface'
                  width={600}
                  height={400}
                  className='w-full h-auto'
                />
              </div>
            </div>
          </div>
        </div> */}

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
          <Link
            href='/selector'
            className='btn bg-secondary/20 border border-secondary/40 hover:border-secondary hover:bg-secondary/40 normal-case flex items-center justify-start gap-2 px-8 transition-all text-center mt-8'
          >
            Select a Cuisine to get started →
          </Link>
        </div>
      </section>
    </div>
  );
}
