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
              <span className='inline-block animate-slide-in-left'>
                Cuisine
              </span>
              <span className='inline-block animate-slide-in-left-delay-1'>
                Quest
              </span>{' '}
              <span className='relative inline-block animate-slide-in-left-delay-2'>
                <span className='text-[#66CECF]'>AI</span>
              </span>{' '}
              <span className='inline-block bg-gradient-to-r from-white to-white/80 text-transparent bg-clip-text animate-slide-in-left-delay-3'>
                Recipes
              </span>
            </h1>
            <h2 className='text-2xl md:text-3xl font-medium mb-6 text-white/90'>
              What cuisine would you like to explore today?
            </h2>
            <p className='text-lg text-white/80 max-w-2xl leading-relaxed'>
              Select a cuisine to discover authentic recipes and cooking
              inspiration, all in one place. Let AI be your personal chef!
            </p>
            <a
              href='/selector'
              className='mt-8 btn bg-secondary/20 border border-secondary/40 hover:border-secondary hover:bg-secondary/40 normal-case flex items-center justify-start gap-2 px-8 transition-all w-fit text-white'
            >
              Select a Cuisine to get started →
            </a>
          </div>
        </div>
        <div className='container mx-auto px-4 -mt-24 relative z-10'>
          <div className='rounded-2xl shadow-2xl overflow-hidden border border-base-200'>
            <img
              src='/cuisine-quest-ai-screenshot.png'
              alt='CuisineQuest AI App Interface'
              className='w-full h-auto'
              width={1200}
              height={675}
            />
          </div>
        </div>
        <div className='container mx-auto py-16'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold mb-4'>How It Works</h2>
            <p className='text-base-content/70 max-w-2xl mx-auto leading-relaxed'>
              CuisineQuest AI makes exploring new recipes simple and fun.
              Discover delicious dishes from around the world, powered by
              artificial intelligence.
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
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
        <div className='flex flex-col items-center text-center max-w-3xl mx-auto mb-20'>
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
          <a
            href='/selector'
            className='btn bg-secondary/20 border border-secondary/40 hover:border-secondary hover:bg-secondary/40 normal-case flex items-center justify-start gap-2 px-8 transition-all text-center mt-8'
          >
            Select a Cuisine to get started →
          </a>
        </div>
      </section>
    </div>
  );
}
