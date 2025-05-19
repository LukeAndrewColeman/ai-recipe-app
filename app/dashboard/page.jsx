'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

const Dashboard = () => {
  const { user } = useUser();
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    const fetchCredits = async () => {
      const response = await fetch('/api/credits');
      const data = await response.json();
      setCredits(data.credits);
    };
    fetchCredits();
  }, []);

  return (
    <section>
      <div className='relative space-y-6 container mx-auto pb-20 pt-10 px-6'>
        <div className='mb-8'>
          <h1 className='text-4xl font-bold mb-3'>Credits</h1>
          <h2 className='text-neutral/70'>
            Welcome {user?.firstName}. Here you can how many credits you have
            left.
          </h2>
        </div>
        <div className='mt-4'>
          <Image
            src={user?.imageUrl}
            alt='User Profile'
            className='w-16 h-16 rounded-full'
            width={64}
            height={64}
          />
          <h2 className='font-bold text-xl mt-2'>{user?.fullName}</h2>
          <p className='text-neutral/70'>
            {user?.emailAddresses[0]?.emailAddress}
          </p>
        </div>
        <div className='mt-4'>
          <h2 className='font-bold text-xl'>Your Credits</h2>
          <p className='font-bold text-3xl'>{credits}</p>
        </div>
        {/* <Link href='/buy-credits' className='btn btn-primary text-white'>
          Buy more Credits
        </Link> */}
      </div>
    </section>
  );
};

export default Dashboard;
