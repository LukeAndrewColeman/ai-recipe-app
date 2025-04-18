import React from 'react';
import Link from 'next/link';
const NavCta = () => {
  return (
    <div className='flex flex-col md:flex-row justify-center items-center bg-[#1B3B6F] py-4'>
      <p className='text-white mr-4'>Latest Recipe:</p>
      <Link
        href='/featured-recipes/chipotle-chicken-tinga-tostadas'
        className='text-center text-white hover:text-white/80'
      >
        Chipotle Chicken Tinga Tostadas Recipe →
      </Link>
    </div>
  );
};

export default NavCta;
