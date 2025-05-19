import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='py-8 bg-primary text-white'>
      <div className='flex flex-col md:flex-row justify-between items-start container mx-auto px-4 gap-8'>
        {/* About Us section */}
        <div className='mb-4 md:mb-0 max-w-xs text-center md:text-left'>
          <p className='font-bold text-lg mb-1'>About Us</p>
          <p className='text-sm'>
            SmartRecipe AI helps busy parents and young professionals create
            healthy, delicious meals using AI-powered recipe generation. Save
            time, reduce food waste, and discover new favorites!
          </p>
        </div>

        {/* Quick Links section */}
        <div className='flex flex-col gap-2'>
          <p className='font-bold text-lg mb-1'>Quick Links</p>
          <Link
            href='/recipe-generator'
            className='hover:text-gray-300 transition-colors'
          >
            Recipe Generator
          </Link>
          <Link
            href='/recipe-book'
            className='hover:text-gray-300 transition-colors'
          >
            Recipe Book
          </Link>
        </div>

        {/* Legal Links section */}
        <div className='flex flex-col gap-2'>
          <p className='font-bold text-lg mb-1'>Legal</p>
          <Link
            href='/privacy-policy'
            className='hover:text-gray-300 transition-colors'
          >
            Privacy Policy
          </Link>
          <Link href='/terms' className='hover:text-gray-300 transition-colors'>
            Terms &amp; Conditions
          </Link>
        </div>

        {/* Contact section */}
        <div className='flex flex-col gap-2'>
          <p className='font-bold text-lg mb-1'>Contact</p>
          <a
            href='mailto:help@smartrecipeai.com'
            className='hover:text-gray-300 transition-colors'
          >
            Email Us
          </a>
          <Link
            href='/contact'
            className='hover:text-gray-300 transition-colors'
          >
            Contact Us
          </Link>
        </div>
      </div>

      <div className='text-center mt-8 text-xs text-white/70'>
        SmartRecipe AI - All rights reserved © {new Date().getFullYear()}
      </div>
    </footer>
  );
};

export default Footer;
