import React from 'react';
import Link from 'next/link';

const NavCta = () => {
  return (
    <div className='flex flex-col md:flex-row justify-center items-center bg-secondary py-4'>
      <p className='text-[#333333] mr-4'>Latest Post:</p>
      <Link
        href='/blog/chipotle-chicken-tinga-tostadas'
        className='text-center text-[#333333] hover:text-white/80'
      >
        Chipotle Chicken Tinga Tostadas Recipe →
      </Link>
    </div>
  );
};

export default NavCta;
